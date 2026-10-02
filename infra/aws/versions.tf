terraform {
  # 1.10+ for S3-native state locking (use_lockfile).
  required_version = ">= 1.10"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.67"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.26"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.8"
    }
  }

  # State in a private S3 bucket of this account, created once by bootstrap.sh.
  # The bucket name holds the account ID, so it is passed at init:
  # -backend-config="bucket=portfolio-tfstate-<account-id>"
  backend "s3" {
    key          = "aws/terraform.tfstate"
    region       = "eu-west-3"
    use_lockfile = true
    encrypt      = true
  }
}

# Credentials: the SSO profile locally (AWS_PROFILE=portfolio), an OIDC role in CI.
provider "aws" {
  region = "eu-west-3"

  default_tags {
    tags = {
      Project   = "portfolio"
      ManagedBy = "terraform"
      Repo      = "AmidNova/portfolio"
    }
  }
}

# CloudFront only accepts certificates from us-east-1.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = {
      Project   = "portfolio"
      ManagedBy = "terraform"
      Repo      = "AmidNova/portfolio"
    }
  }
}

# DNS stays on Cloudflare. Authenticates with CLOUDFLARE_API_TOKEN from the environment.
provider "cloudflare" {}
