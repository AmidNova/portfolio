# Roles for the Terraform pipeline of this stack (.github/workflows/terraform-aws.yml).
# Plan and apply are split: a PR can only read, only main can change anything.
locals {
  account_id  = data.aws_caller_identity.current.account_id
  state_arn   = "arn:aws:s3:::portfolio-tfstate-${local.account_id}"
  github_sub  = "token.actions.githubusercontent.com:sub"
  github_aud  = "token.actions.githubusercontent.com:aud"
  oidc_issuer = aws_iam_openid_connect_provider.github.arn
}

# --- Plan: read-only, for pull requests and manual drift checks -------------------

data "aws_iam_policy_document" "terraform_plan_trust" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    principals {
      type        = "Federated"
      identifiers = [local.oidc_issuer]
    }
    condition {
      test     = "StringEquals"
      variable = local.github_aud
      values   = ["sts.amazonaws.com"]
    }
    # A PR of this repo (forks get no OIDC token), or a manual run on main.
    condition {
      test     = "StringEquals"
      variable = local.github_sub
      values = [
        "repo:${local.repo}:pull_request",
        "repo:${local.repo}:ref:refs/heads/main",
      ]
    }
  }
}

resource "aws_iam_role" "terraform_plan" {
  name                 = "portfolio-terraform-plan"
  description          = "GitHub Actions: terraform plan of infra/aws (read only)"
  assume_role_policy   = data.aws_iam_policy_document.terraform_plan_trust.json
  max_session_duration = 3600
}

resource "aws_iam_role_policy_attachment" "terraform_plan_read" {
  role       = aws_iam_role.terraform_plan.name
  policy_arn = "arn:aws:iam::aws:policy/ReadOnlyAccess"
}

# The only write a plan does: its lock file next to the state.
data "aws_iam_policy_document" "terraform_plan_lock" {
  statement {
    actions   = ["s3:PutObject", "s3:DeleteObject"]
    resources = ["${local.state_arn}/aws/terraform.tfstate.tflock"]
  }
}

resource "aws_iam_role_policy" "terraform_plan_lock" {
  name   = "state-lock"
  role   = aws_iam_role.terraform_plan.id
  policy = data.aws_iam_policy_document.terraform_plan_lock.json
}

# --- Apply: changes this stack, only from main ------------------------------------

data "aws_iam_policy_document" "terraform_apply_trust" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    principals {
      type        = "Federated"
      identifiers = [local.oidc_issuer]
    }
    condition {
      test     = "StringEquals"
      variable = local.github_aud
      values   = ["sts.amazonaws.com"]
    }
    # The GitHub environment "infra" only accepts main.
    condition {
      test     = "StringEquals"
      variable = local.github_sub
      values   = ["repo:${local.repo}:environment:infra"]
    }
  }
}

resource "aws_iam_role" "terraform_apply" {
  name                 = "portfolio-terraform-apply"
  description          = "GitHub Actions: terraform apply of infra/aws (main only)"
  assume_role_policy   = data.aws_iam_policy_document.terraform_apply_trust.json
  max_session_duration = 3600
}

resource "aws_iam_role_policy_attachment" "terraform_apply_read" {
  role       = aws_iam_role.terraform_apply.name
  policy_arn = "arn:aws:iam::aws:policy/ReadOnlyAccess"
}

# Writes limited to what this stack owns: portfolio-* buckets and roles, GitHub's
# OIDC provider, the budget. CloudFront and ACM ARNs are unknown before creation.
data "aws_iam_policy_document" "terraform_apply" {
  statement {
    sid     = "State"
    actions = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]
    resources = [
      "${local.state_arn}/aws/terraform.tfstate",
      "${local.state_arn}/aws/terraform.tfstate.tflock",
    ]
  }
  statement {
    sid       = "SiteBucket"
    actions   = ["s3:*"]
    resources = ["arn:aws:s3:::portfolio-site-*", "arn:aws:s3:::portfolio-site-*/*"]
  }
  statement {
    sid       = "Cdn"
    actions   = ["cloudfront:*", "acm:*"]
    resources = ["*"]
  }
  statement {
    sid = "Roles"
    actions = [
      "iam:CreateRole", "iam:DeleteRole", "iam:UpdateRole", "iam:UpdateRoleDescription",
      "iam:UpdateAssumeRolePolicy", "iam:TagRole", "iam:UntagRole",
      "iam:PutRolePolicy", "iam:DeleteRolePolicy",
      "iam:AttachRolePolicy", "iam:DetachRolePolicy",
    ]
    resources = ["arn:aws:iam::${local.account_id}:role/portfolio-*"]
  }
  statement {
    sid = "GithubOidc"
    actions = [
      "iam:CreateOpenIDConnectProvider", "iam:DeleteOpenIDConnectProvider",
      "iam:UpdateOpenIDConnectProviderThumbprint", "iam:AddClientIDToOpenIDConnectProvider",
      "iam:RemoveClientIDFromOpenIDConnectProvider",
      "iam:TagOpenIDConnectProvider", "iam:UntagOpenIDConnectProvider",
    ]
    resources = ["arn:aws:iam::${local.account_id}:oidc-provider/token.actions.githubusercontent.com"]
  }
  statement {
    sid       = "Budget"
    actions   = ["budgets:*"]
    resources = ["arn:aws:budgets::${local.account_id}:budget/*"]
  }
}

resource "aws_iam_role_policy" "terraform_apply" {
  name   = "manage-portfolio-stack"
  role   = aws_iam_role.terraform_apply.id
  policy = data.aws_iam_policy_document.terraform_apply.json
}
