# TLS certificate for aws.amidousoro.me, validated by a DNS record on Cloudflare.
resource "aws_acm_certificate" "site" {
  provider          = aws.us_east_1
  domain_name       = local.site_host
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "cloudflare_dns_record" "acm_validation" {
  for_each = {
    for o in aws_acm_certificate.site.domain_validation_options : o.domain_name => o
  }

  zone_id = var.zone_id
  name    = trimsuffix(each.value.resource_record_name, ".")
  type    = each.value.resource_record_type
  content = trimsuffix(each.value.resource_record_value, ".")
  proxied = false
  ttl     = 1
  comment = "ACM validation for ${local.site_host} (infra/aws)"
}

resource "aws_acm_certificate_validation" "site" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.site.arn
  validation_record_fqdns = [for r in cloudflare_dns_record.acm_validation : r.name]
}

# DNS only, not proxied: visitors must reach CloudFront itself, or the comparison
# would measure Cloudflare twice.
resource "cloudflare_dns_record" "site" {
  zone_id = var.zone_id
  name    = local.site_host
  type    = "CNAME"
  content = aws_cloudfront_distribution.site.domain_name
  proxied = false
  ttl     = 300
  comment = "CloudFront distribution (infra/aws)"
}
