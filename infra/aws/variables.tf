variable "zone_id" {
  description = "Cloudflare zone ID of amidousoro.me, where the aws and api subdomain records live."
  type        = string
}

variable "cloudflare_account_id" {
  description = "Cloudflare account that owns the Turnstile widget."
  type        = string
}

variable "owner_email" {
  description = "The site owner's address: budget alerts, and where contact form messages are sent."
  type        = string
}
