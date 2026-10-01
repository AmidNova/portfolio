# TLS and HTTPS behaviour of the zone.
locals {
  zone_settings = {
    # Redirect every http:// request to https:// at the edge. HSTS alone only
    # protects from the second visit; this covers the first one too.
    always_use_https = "on"
    # TLS 1.0 and 1.1 are deprecated (RFC 8996); every current browser speaks 1.2+.
    min_tls_version = "1.2"
    # Full (strict): Cloudflare also validates the origin certificate (Pages serves
    # a valid one), so the edge-to-origin leg can't be intercepted either.
    ssl                      = "strict"
    tls_1_3                  = "on"
    automatic_https_rewrites = "on"
  }
}

resource "cloudflare_zone_setting" "this" {
  for_each = local.zone_settings

  zone_id    = var.zone_id
  setting_id = each.key
  value      = each.value
}
