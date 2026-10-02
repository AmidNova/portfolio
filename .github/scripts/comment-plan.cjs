// Posts a Terraform plan on the PR, or updates the previous comment for the same
// stack, so each PR keeps one up-to-date plan per stack. Used by actions/github-script.
const fs = require("fs");

module.exports = async ({ github, context, stack, planFile, summary }) => {
  const plan = fs.readFileSync(planFile, "utf8");
  const marker = `<!-- terraform-plan:${stack} -->`;
  const body = [
    marker,
    `### Terraform plan — ${stack}`,
    `**${summary || "see details"}**`,
    "<details><summary>Full plan</summary>\n",
    "```",
    plan.length > 60000 ? plan.slice(-60000) : plan,
    "```",
    "</details>",
    "",
    "_Applied automatically when this PR is merged to `main`._",
  ].join("\n");

  const { owner, repo } = context.repo;
  const issue_number = context.issue.number;
  const comments = await github.paginate(github.rest.issues.listComments, { owner, repo, issue_number });
  const previous = comments.find((c) => c.body?.includes(marker));
  if (previous) await github.rest.issues.updateComment({ owner, repo, comment_id: previous.id, body });
  else await github.rest.issues.createComment({ owner, repo, issue_number, body });
};
