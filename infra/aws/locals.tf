data "aws_caller_identity" "current" {}

locals {
  domain    = "amidousoro.me"
  site_host = "aws.${local.domain}"
  repo      = "AmidNova/portfolio"

  # Bucket names are global across AWS: the account ID makes this one ours.
  site_bucket = "portfolio-site-${data.aws_caller_identity.current.account_id}"
}
