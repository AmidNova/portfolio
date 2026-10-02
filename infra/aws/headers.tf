# The security headers are not written here: they are read from public/_headers,
# the file Cloudflare Pages serves, so the three hosts can't drift apart.
locals {
  headers_file = file("${path.module}/../../public/_headers")
  # The "/*" block: from its first line to the first blank line.
  site_block = regex("(?ms)^/\\*\\n(.*?)\\n\\n", local.headers_file)[0]
  site_headers = {
    for m in regexall("(?m)^\\s+([A-Za-z-]+):\\s*(.+?)\\s*$", local.site_block) : m[0] => m[1]
  }

  hsts         = local.site_headers["Strict-Transport-Security"]
  hsts_max_age = tonumber(regex("max-age=(\\d+)", local.hsts)[0])

  # CloudFront has dedicated fields for these; everything else goes in custom headers.
  managed_headers = [
    "Content-Security-Policy",
    "Strict-Transport-Security",
    "X-Content-Type-Options",
    "Referrer-Policy",
  ]
  custom_headers = { for k, v in local.site_headers : k => v if !contains(local.managed_headers, k) }
}

resource "aws_cloudfront_response_headers_policy" "security" {
  name    = "portfolio-security-headers"
  comment = "Mirrors the /* block of public/_headers"

  security_headers_config {
    content_security_policy {
      content_security_policy = local.site_headers["Content-Security-Policy"]
      override                = true
    }
    strict_transport_security {
      access_control_max_age_sec = local.hsts_max_age
      include_subdomains         = strcontains(local.hsts, "includeSubDomains")
      preload                    = strcontains(local.hsts, "preload")
      override                   = true
    }
    content_type_options {
      override = true # always sends "nosniff"
    }
    referrer_policy {
      referrer_policy = local.site_headers["Referrer-Policy"]
      override        = true
    }
  }

  custom_headers_config {
    dynamic "items" {
      for_each = local.custom_headers
      content {
        header   = items.key
        value    = items.value
        override = true
      }
    }
  }
}
