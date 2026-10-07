# Contact form backend: the Lambda (backend/contact/app.py) and where it keeps messages.
locals {
  api_host       = "api.${local.domain}"
  contact_sender = "Portfolio <contact@${local.domain}>"
  # Pages allowed to call the API: production, the AWS mirror, Cloudflare previews.
  contact_origins = "https://(amidousoro\\.me|aws\\.amidousoro\\.me|[a-z0-9-]+\\.portfolio-ci3\\.pages\\.dev)"
}

# Messages, kept 90 days (DynamoDB TTL on expires_at) in case an e-mail goes missing.
resource "aws_dynamodb_table" "contact" {
  name         = "portfolio-contact-messages"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  ttl {
    attribute_name = "expires_at"
    enabled        = true
  }

  server_side_encryption {
    enabled = true
  }
}

data "archive_file" "contact" {
  type        = "zip"
  source_dir  = "${path.module}/../../backend/contact"
  output_path = "${path.module}/.build/contact.zip"
  # Same zip bytes on any machine, so CI and local plans agree on the code hash.
  output_file_mode = "0644"
  excludes         = ["tests", "tests/__init__.py", "tests/test_app.py", "__pycache__", "tests/__pycache__"]
}

resource "aws_cloudwatch_log_group" "contact" {
  name              = "/aws/lambda/portfolio-contact"
  retention_in_days = 30
}

data "aws_iam_policy_document" "contact_trust" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "contact" {
  name               = "portfolio-contact-lambda"
  description        = "Contact form Lambda: write messages, send them by e-mail, log"
  assume_role_policy = data.aws_iam_policy_document.contact_trust.json
}

data "aws_iam_policy_document" "contact" {
  statement {
    sid       = "Logs"
    actions   = ["logs:CreateLogStream", "logs:PutLogEvents"]
    resources = ["${aws_cloudwatch_log_group.contact.arn}:*"]
  }
  statement {
    sid       = "StoreMessage"
    actions   = ["dynamodb:PutItem"]
    resources = [aws_dynamodb_table.contact.arn]
  }
  # Send only as contact@amidousoro.me. In the SES sandbox the recipient must be a
  # verified identity too, so both identities are listed.
  statement {
    sid       = "SendMessage"
    actions   = ["ses:SendEmail"]
    resources = [aws_sesv2_email_identity.domain.arn, aws_sesv2_email_identity.owner.arn]
    condition {
      test     = "StringEquals"
      variable = "ses:FromAddress"
      values   = ["contact@${local.domain}"]
    }
  }
}

resource "aws_iam_role_policy" "contact" {
  name   = "contact-form"
  role   = aws_iam_role.contact.id
  policy = data.aws_iam_policy_document.contact.json
}

resource "aws_lambda_function" "contact" {
  function_name    = "portfolio-contact"
  description      = "POST /contact: validate, check Turnstile, store, e-mail"
  role             = aws_iam_role.contact.arn
  runtime          = "python3.14"
  handler          = "app.handler"
  filename         = data.archive_file.contact.output_path
  source_code_hash = data.archive_file.contact.output_base64sha256
  architectures    = ["arm64"] # cheaper per ms than x86, no native deps to worry about
  memory_size      = 128
  timeout          = 10

  environment {
    variables = {
      TABLE_NAME       = aws_dynamodb_table.contact.name
      SENDER           = local.contact_sender
      RECIPIENT        = var.owner_email
      ALLOWED_ORIGINS  = local.contact_origins
      TURNSTILE_SECRET = cloudflare_turnstile_widget.contact.secret
    }
  }

  depends_on = [aws_cloudwatch_log_group.contact, aws_iam_role_policy.contact]
}
