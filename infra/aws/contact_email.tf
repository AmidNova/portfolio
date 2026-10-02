# SES sends the contact messages as contact@amidousoro.me.
# The domain is proven to SES with DKIM: three CNAMEs on Cloudflare. Mail sent this way
# is signed by amidousoro.me, which is what receiving servers check.
resource "aws_sesv2_email_identity" "domain" {
  email_identity = local.domain

  dkim_signing_attributes {
    next_signing_key_length = "RSA_2048_BIT"
  }
}

resource "cloudflare_dns_record" "ses_dkim" {
  count = 3 # SES Easy DKIM always issues three tokens

  zone_id = var.zone_id
  name    = "${aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens[count.index]}._domainkey.${local.domain}"
  type    = "CNAME"
  content = "${aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens[count.index]}.dkim.amazonses.com"
  proxied = false
  ttl     = 1
  comment = "SES DKIM for the contact form (infra/aws)"
}

# The account is in the SES sandbox: it may only send to verified addresses. The
# owner's address is the only recipient, so it is verified (SES e-mails a link once).
resource "aws_sesv2_email_identity" "owner" {
  email_identity = var.owner_email
}
