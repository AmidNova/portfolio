# TLS and HTTPS behaviour of the zone. Values mirror the dashboard as imported;
# hardening changes come as separate, reviewed diffs.
locals {
  zone_settings = {
    always_use_https         = "off"
    min_tls_version          = "1.0"
    ssl                      = "full"
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
