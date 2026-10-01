#!/usr/bin/env bash
# Local wrapper: loads the Cloudflare token and the R2 state key, looks up the
# account and zone IDs, then runs terraform. Usage: ./tf.sh init | plan | apply
set -euo pipefail
cd "$(dirname "$0")"

# shellcheck source=/dev/null
source "${CLOUDFLARE_ENV_FILE:-$HOME/.config/cloudflare/portfolio.env}"

api() { curl -fsS -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" "https://api.cloudflare.com/client/v4$1"; }
TF_VAR_account_id=$(api /accounts | jq -r '.result[0].id')
TF_VAR_zone_id=$(api "/zones?name=amidousoro.me" | jq -r '.result[0].id')
export TF_VAR_account_id TF_VAR_zone_id

# The S3 backend reads AWS_* variables; point them at the R2 key, for this process only.
export AWS_ACCESS_KEY_ID="$R2_ACCESS_KEY_ID" AWS_SECRET_ACCESS_KEY="$R2_SECRET_ACCESS_KEY"

if [ "${1:-}" = "init" ]; then
  shift
  exec terraform init -backend-config="endpoints={s3=\"https://${TF_VAR_account_id}.r2.cloudflarestorage.com\"}" "$@"
fi
exec terraform "$@"
