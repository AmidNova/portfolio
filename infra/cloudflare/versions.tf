terraform {
  # 1.10+ for S3-native state locking (use_lockfile), which R2 supports.
  required_version = ">= 1.10"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.26"
    }
  }

  # State lives in Cloudflare R2 (S3-compatible). The endpoint holds the account ID,
  # so it is passed at init: -backend-config="endpoints={s3=\"https://<account>.r2.cloudflarestorage.com\"}"
  # Credentials come from AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY, set to the R2 key.
  backend "s3" {
    bucket       = "portfolio-tfstate"
    key          = "cloudflare/terraform.tfstate"
    region       = "auto"
    use_lockfile = true

    # R2 is not AWS: skip the AWS-only checks and lookups.
    use_path_style              = true
    skip_credentials_validation = true
    skip_region_validation      = true
    skip_requesting_account_id  = true
    skip_metadata_api_check     = true
    skip_s3_checksum            = true
  }
}

# Authenticates with CLOUDFLARE_API_TOKEN from the environment.
provider "cloudflare" {}
