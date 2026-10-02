#!/usr/bin/env bash
# Local wrapper: AWS through the SSO profile, Cloudflare token for the DNS records,
# then terraform. Usage: ./tf.sh init | plan | apply
set -euo pipefail
cd "$(dirname "$0")"

# shellcheck source=/dev/null
source "${CLOUDFLARE_ENV_FILE:-$HOME/.config/cloudflare/portfolio.env}"
export CLOUDFLARE_API_TOKEN

# Static AWS keys in the environment would win over the profile: drop them.
unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN
export AWS_PROFILE="${AWS_PROFILE:-portfolio}"
aws sts get-caller-identity >/dev/null 2>&1 || aws sso login

TF_VAR_zone_id=$(curl -fsS -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  "https://api.cloudflare.com/client/v4/zones?name=amidousoro.me" | jq -r '.result[0].id')
export TF_VAR_zone_id

if [ "${1:-}" = "init" ]; then
  shift
  account=$(aws sts get-caller-identity --query Account --output text)
  exec terraform init -backend-config="bucket=portfolio-tfstate-${account}" "$@"
fi
exec terraform "$@"
