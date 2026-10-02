# Public endpoint: POST https://api.amidousoro.me/contact (API Gateway HTTP API).
resource "aws_apigatewayv2_api" "contact" {
  name          = "portfolio-api"
  protocol_type = "HTTP"
  description   = "Contact form API"
  # Only the custom domain answers; the default execute-api URL is switched off.
  disable_execute_api_endpoint = true
}

resource "aws_apigatewayv2_integration" "contact" {
  api_id                 = aws_apigatewayv2_api.contact.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.contact.invoke_arn
  payload_format_version = "2.0"
}

# CORS is answered by the Lambda itself (it checks the Origin), preflight included.
resource "aws_apigatewayv2_route" "contact" {
  for_each = toset(["POST /contact", "OPTIONS /contact"])

  api_id    = aws_apigatewayv2_api.contact.id
  route_key = each.value
  target    = "integrations/${aws_apigatewayv2_integration.contact.id}"
}

resource "aws_apigatewayv2_stage" "contact" {
  api_id      = aws_apigatewayv2_api.contact.id
  name        = "$default"
  auto_deploy = true

  # A contact form needs a handful of requests a minute; this caps floods and cost.
  default_route_settings {
    throttling_burst_limit = 10
    throttling_rate_limit  = 2
  }
}

resource "aws_lambda_permission" "contact_api" {
  statement_id  = "AllowApiGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.contact.execution_arn}/*/*/contact"
}

# api.amidousoro.me: a regional certificate (API Gateway, unlike CloudFront, uses the
# API's own region), validated on Cloudflare like the site's.
resource "aws_acm_certificate" "api" {
  domain_name       = local.api_host
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "cloudflare_dns_record" "api_validation" {
  for_each = {
    for o in aws_acm_certificate.api.domain_validation_options : o.domain_name => o
  }

  zone_id = var.zone_id
  name    = trimsuffix(each.value.resource_record_name, ".")
  type    = each.value.resource_record_type
  content = trimsuffix(each.value.resource_record_value, ".")
  proxied = false
  ttl     = 1
  comment = "ACM validation for ${local.api_host} (infra/aws)"
}

resource "aws_acm_certificate_validation" "api" {
  certificate_arn         = aws_acm_certificate.api.arn
  validation_record_fqdns = [for r in cloudflare_dns_record.api_validation : r.name]
}

resource "aws_apigatewayv2_domain_name" "api" {
  domain_name = local.api_host

  domain_name_configuration {
    certificate_arn = aws_acm_certificate_validation.api.certificate_arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_apigatewayv2_api_mapping" "api" {
  api_id      = aws_apigatewayv2_api.contact.id
  domain_name = aws_apigatewayv2_domain_name.api.id
  stage       = aws_apigatewayv2_stage.contact.id
}

resource "cloudflare_dns_record" "api" {
  zone_id = var.zone_id
  name    = local.api_host
  type    = "CNAME"
  content = aws_apigatewayv2_domain_name.api.domain_name_configuration[0].target_domain_name
  proxied = false
  ttl     = 300
  comment = "API Gateway custom domain (infra/aws)"
}
