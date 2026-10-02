variable "zone_id" {
  description = "Cloudflare zone ID of amidousoro.me, where the aws subdomain record lives."
  type        = string
}

variable "budget_alert_email" {
  description = "Address that receives the AWS budget alerts."
  type        = string
}
