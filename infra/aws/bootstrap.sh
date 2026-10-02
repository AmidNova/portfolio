#!/usr/bin/env bash
# One-off: creates the private, versioned S3 bucket that holds this stack's state.
# Terraform can't create the bucket its own state lives in, so this runs first.
# Safe to re-run. Usage: AWS_PROFILE=portfolio ./bootstrap.sh
set -euo pipefail

region=eu-west-3
account=$(aws sts get-caller-identity --query Account --output text)
bucket="portfolio-tfstate-${account}"

if aws s3api head-bucket --bucket "$bucket" 2>/dev/null; then
  echo "bucket $bucket exists"
else
  aws s3api create-bucket --bucket "$bucket" --region "$region" \
    --create-bucket-configuration LocationConstraint="$region"
fi

aws s3api put-public-access-block --bucket "$bucket" --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
# Versioning: a bad apply that corrupts the state can be rolled back to the previous version.
aws s3api put-bucket-versioning --bucket "$bucket" --versioning-configuration Status=Enabled
aws s3api put-bucket-encryption --bucket "$bucket" --server-side-encryption-configuration \
  '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"},"BucketKeyEnabled":true}]}'

echo "state bucket ready: $bucket"
