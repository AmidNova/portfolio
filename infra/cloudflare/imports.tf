# One-off adoption of the resources created by hand in the dashboard.
# Once the import is applied these blocks are no-ops; they stay as a record.

import {
  to = cloudflare_pages_project.portfolio
  id = "${var.account_id}/portfolio"
}

import {
  to = cloudflare_dns_record.apex
  id = "${var.zone_id}/784fde016f679decd8f691d93ce0300f"
}
import {
  to = cloudflare_dns_record.www
  id = "${var.zone_id}/a510620fe96feebe34c5cbf7a710a584"
}
import {
  to = cloudflare_dns_record.mx["eforward1"]
  id = "${var.zone_id}/342db18c732846e2025bb06b79022497"
}
import {
  to = cloudflare_dns_record.mx["eforward2"]
  id = "${var.zone_id}/cbb1acf4231339dc0659574f27a86846"
}
import {
  to = cloudflare_dns_record.mx["eforward3"]
  id = "${var.zone_id}/44d937a5e881be440e5471a05c84c915"
}
import {
  to = cloudflare_dns_record.mx["eforward4"]
  id = "${var.zone_id}/6170a0d75921881898c4f26d35b03701"
}
import {
  to = cloudflare_dns_record.mx["eforward5"]
  id = "${var.zone_id}/b2921f3f55bf69ada216ada6c23026ac"
}
import {
  to = cloudflare_dns_record.spf
  id = "${var.zone_id}/73b07edfb56c77f18aa44c5523c29a77"
}

import {
  for_each = toset(["always_use_https", "min_tls_version", "ssl", "tls_1_3", "automatic_https_rewrites"])
  to       = cloudflare_zone_setting.this[each.key]
  id       = "${var.zone_id}/${each.key}"
}
