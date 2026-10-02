# Read by the deploy workflow (as GitHub variables) and for local checks.
output "site_bucket" {
  value = aws_s3_bucket.site.bucket
}

output "distribution_id" {
  value = aws_cloudfront_distribution.site.id
}

output "distribution_domain" {
  value = aws_cloudfront_distribution.site.domain_name
}

output "deploy_role_arn" {
  value = aws_iam_role.deploy.arn
}

output "site_url" {
  value = "https://${local.site_host}"
}
