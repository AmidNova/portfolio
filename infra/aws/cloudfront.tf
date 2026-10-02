# AWS managed cache policy "CachingOptimized": honours the Cache-Control set at upload
# (immutable for /assets/*, no-cache for index.html), gzip and brotli on.
data "aws_cloudfront_cache_policy" "optimized" {
  name = "Managed-CachingOptimized"
}

resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "portfolio-site"
  description                       = "CloudFront signs its requests to the private site bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_function" "spa_router" {
  name    = "portfolio-spa-router"
  runtime = "cloudfront-js-2.0"
  comment = "Serves index.html for app routes"
  publish = true
  code    = file("${path.module}/spa-router.js")
}

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  comment             = "amidousoro.me on AWS (mirror for the Cloudflare comparison)"
  aliases             = [local.site_host]
  default_root_object = "index.html"
  http_version        = "http2and3"
  is_ipv6_enabled     = true
  # Every edge location, like Cloudflare: the latency comparison would be unfair otherwise.
  price_class = "PriceClass_All"

  origin {
    origin_id                = "s3-site"
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    target_origin_id           = "s3-site"
    viewer_protocol_policy     = "redirect-to-https"
    allowed_methods            = ["GET", "HEAD"]
    cached_methods             = ["GET", "HEAD"]
    compress                   = true
    cache_policy_id            = data.aws_cloudfront_cache_policy.optimized.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security.id

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.spa_router.arn
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.site.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021" # same floor as the Cloudflare zone
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
