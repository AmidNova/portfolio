locals {
  domain     = "amidousoro.me"
  pages_host = "portfolio-ci3.pages.dev"

  # Namecheap email forwarding: mail to @amidousoro.me reaches the personal inbox.
  # Removing or changing these stops that mail.
  mx_forwarders = {
    eforward1 = 10
    eforward2 = 10
    eforward3 = 10
    eforward4 = 15
    eforward5 = 20
  }
}

# Site: apex and www both point at the Pages project, proxied through Cloudflare.
resource "cloudflare_dns_record" "apex" {
  zone_id = var.zone_id
  name    = local.domain
  type    = "CNAME"
  content = local.pages_host
  proxied = true
  ttl     = 1 # 1 = automatic, required for proxied records
}

resource "cloudflare_dns_record" "www" {
  zone_id = var.zone_id
  name    = "www.${local.domain}"
  type    = "CNAME"
  content = local.pages_host
  proxied = true
  ttl     = 1
}

resource "cloudflare_dns_record" "mx" {
  for_each = local.mx_forwarders

  zone_id  = var.zone_id
  name     = local.domain
  type     = "MX"
  content  = "${each.key}.registrar-servers.com"
  priority = each.value
  ttl      = 1
}

# SPF: only the forwarder may send as @amidousoro.me (soft fail otherwise).
resource "cloudflare_dns_record" "spf" {
  zone_id = var.zone_id
  name    = local.domain
  type    = "TXT"
  content = "\"v=spf1 include:spf.efwd.registrar-servers.com ~all\""
  ttl     = 1
}
