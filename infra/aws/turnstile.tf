# Cloudflare Turnstile: proves a human filled the contact form, without cookies.
# The site key is public (it ships in the page); the secret goes to the Lambda only.
# A domain also covers its subdomains: aws.amidousoro.me and every Pages preview.
resource "cloudflare_turnstile_widget" "contact" {
  account_id = var.cloudflare_account_id
  name       = "portfolio-contact"
  domains    = [local.domain, "portfolio-ci3.pages.dev"]
  mode       = "managed"
}
