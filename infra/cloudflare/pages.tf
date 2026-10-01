locals {
  # Same runtime for production and previews, so a preview is a faithful rehearsal.
  pages_runtime = {
    build_image_major_version            = 3
    compatibility_date                   = "2026-04-13"
    always_use_latest_compatibility_date = false
    fail_open                            = true
  }
}

# The site itself: built by Cloudflare from GitHub on every push.
# main deploys amidousoro.me; every other branch gets a preview URL and a PR comment.
resource "cloudflare_pages_project" "portfolio" {
  account_id        = var.account_id
  name              = "portfolio"
  production_branch = "main"

  build_config = {
    build_command   = "npm run build"
    destination_dir = "dist"
  }

  deployment_configs = {
    preview    = local.pages_runtime
    production = local.pages_runtime
  }

  source = {
    type = "github"
    config = {
      owner                          = "AmidNova"
      owner_id                       = "190102825"
      repo_name                      = "portfolio"
      repo_id                        = "1168596615"
      production_branch              = "main"
      production_deployments_enabled = true
      preview_deployment_setting     = "all"
      preview_branch_includes        = ["*"]
      path_includes                  = ["*"]
      pr_comments_enabled            = true
    }
  }
}
