# Feast Planner Monitoring

This document explains the three automated GitHub Actions workflows that monitor the Feast Planner app at [https://cogwanzfot.com](https://cogwanzfot.com) and how to configure optional notifications.

---

## Workflows

### 1. Site Health Check (`health-check.yml`)

**Purpose:** Continuously monitors whether the app's key pages are reachable and fast.

**Runs:** Every 5 minutes (24/7) and on manual trigger.

**Pages checked:**
| Page | URL |
|------|-----|
| Home | https://cogwanzfot.com |
| Sign-in | https://cogwanzfot.com/auth/signin |
| Registration form | https://cogwanzfot.com/register |
| Sign-up | https://cogwanzfot.com/auth/signup |

**What happens on failure:**
- A GitHub Issue is opened titled `🚨 Health Check Failed: [page] is down — [timestamp]`
- The issue is labelled `health-check` and `bug`
- Duplicate issues are suppressed — only one open issue per page at a time
- If Slack/Discord webhook secrets are configured, a notification is sent there too

**What happens on recovery:**
- Any open `health-check` issue is automatically closed with a recovery comment

**Response time thresholds:**
- ⚠️ Warning: > 3 000 ms
- ❌ Failure: > 8 000 ms (or non-200 HTTP status)

---

### 2. Deployment Verification (`deployment-verify.yml`)

**Purpose:** Verifies that every push to `main` results in a healthy Vercel deployment.

**Runs:** After every push to `main` (waits 3 minutes for Vercel to deploy) and on manual trigger.

**What it checks:**
- All four pages return HTTP 200 within the time thresholds
- The home page returns valid HTML (contains `<html`)
- The sign-in page returns content with expected text

**What happens on success:**
- A ✅ commit status `Deployment healthy` is posted to the commit

**What happens on failure:**
- A ❌ commit status `Deployment verification failed` is posted to the commit
- A GitHub Issue is opened titled `🚨 Deployment Verification Failed — [commit SHA]`
  - Includes the failed checks, commit SHA + message, and a link to the workflow run
  - Tags `@reversesingularity`
  - Labelled `deployment` and `bug`

---

### 3. Weekly Status Report (`weekly-report.yml`)

**Purpose:** Produces a weekly summary of site health to keep the team informed.

**Runs:** Every Monday at 8:00 AM NZST (Sunday 20:00 UTC) and on manual trigger.

**Report includes:**
- ✅ Services checked this week
- 🚨 Number of incidents (health-check / deployment issues opened)
- 🔄 Number of deployments (pushes to `main`)
- 📋 Total open issues in the repository
- 📈 Estimated uptime percentage
- 💡 Recommendation if incidents were detected

A duplicate report for the same week is never opened — safe to trigger manually.

---

## Issue Labels

The workflows automatically create these labels if they don't exist:

| Label | Colour | Used by |
|-------|--------|---------|
| `health-check` | `#e11d48` (red) | Health check failures |
| `deployment` | `#7c3aed` (purple) | Deployment verification failures |
| `status-report` | `#0284c7` (blue) | Weekly status reports |
| `bug` | `#d73a4a` (GitHub default red) | Co-applied on health-check and deployment failures |

---

## Setting up Optional Notifications

### Slack

1. Create an [Incoming Webhook](https://api.slack.com/messaging/webhooks) in your Slack workspace.
2. Copy the webhook URL (starts with `https://hooks.slack.com/services/…`).
3. In your GitHub repository, go to **Settings → Secrets and variables → Actions**.
4. Click **New repository secret**.
5. Name: `SLACK_WEBHOOK_URL`, Value: your webhook URL.
6. Save. The health check workflow will now post to Slack on any failure.

If the secret is not set, the step is skipped silently — it will never cause the workflow to fail.

### Discord

1. In your Discord server, open a channel's settings → **Integrations → Webhooks → New Webhook**.
2. Copy the webhook URL.
3. In GitHub repository **Settings → Secrets and variables → Actions**, add:
   - Name: `DISCORD_WEBHOOK_URL`, Value: your webhook URL.
4. Save.

Same behaviour as Slack — silently skipped if not configured.

---

## Manually Triggering a Workflow

Any workflow can be run on demand without waiting for its schedule:

1. Go to the repository on GitHub.
2. Click the **Actions** tab.
3. In the left sidebar, select the workflow you want to run (e.g. *Site Health Check*).
4. Click the **Run workflow** button (top right of the run list).
5. Select the branch (`main`) and click **Run workflow**.

The run will appear in the list within a few seconds.

---

## Authentication Smoke Test (Future)

The current health checks only verify that pages return HTTP 200. A full auth smoke test — logging in with a test account and verifying that protected routes are accessible — is planned for after the AWS Cognito Identity Pool is correctly configured (see `FIX_MISSING_IDENTITY_POOL.md`).

When ready, add a step to `health-check.yml` that:
1. POSTs credentials to the Cognito token endpoint
2. Uses the returned JWT to make an authenticated request to a protected API route
3. Asserts a 200 response

Store test credentials as GitHub secrets (`SMOKE_TEST_EMAIL`, `SMOKE_TEST_PASSWORD`). Do **not** commit credentials to the repository.

---

## Architecture Notes

- All workflows use `ubuntu-latest` runners.
- GitHub API interactions use `actions/github-script@v7`.
- HTTP checks use `curl` with a 10-second max timeout.
- The `GITHUB_TOKEN` secret is provided automatically by GitHub — no manual setup required for basic monitoring.
- Notification steps always have `continue-on-error: true` so a failed Slack/Discord call never masks the real alert.
