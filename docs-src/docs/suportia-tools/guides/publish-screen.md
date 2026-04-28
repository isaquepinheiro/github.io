---
title: How to publish a screen
---

# How to publish a screen

**Audience:** Operators managing ERP screen content  
**Prerequisites:** `suportia` installed; panel running and accessible; bearer token available  
**Outcome:** The screen is published to the panel and its status is confirmed

## Steps

1. Set the panel credentials. You can use environment variables or a TOML config profile (see [Configure profiles](configure-profiles.md)).

   Using environment variables:

   ```bash
   export SUPORTIA_PANEL_BASE_URL=https://panel.example.com
   export SUPORTIA_PANEL_TOKEN=your-bearer-token
   ```

2. Publish the screen by its numeric ID:

   ```bash
   suportia publish screen 42
   ```

   The CLI issues `POST /api/v1/screens/42/publish` on the panel and prints the result:

   ```
   Published: {"id": 42, "status": "published", ...}
   ```

3. Confirm the publication status:

   ```bash
   suportia publish status 42
   ```

   The CLI issues `GET /api/v1/screens/42/publication-status` and prints the current status:

   ```
   Status: {"id": 42, "status": "published", "published_at": "2026-04-27T..."}
   ```

4. If you use a TOML config file with a named profile, pass `--config` and `--profile` as global options before the subcommand:

   ```bash
   suportia --config ./suportia.toml --profile prod publish screen 42
   suportia --config ./suportia.toml --profile prod publish status 42
   ```

## Exit codes

| Code | Meaning |
|------|---------|
| `0` | Request succeeded (HTTP 2xx) |
| `1` | HTTP error (4xx or 5xx) |

## Verification

After step 3, check that the printed status matches `"published"`. If the core must be updated, run:

```bash
suportia core reindex --tenant my-tenant --module MOD --screen SCR
```

## Troubleshooting

If you receive a 401 error, the CLI prints a hint to set `SUPORTIA_PANEL_TOKEN` or `panel_token` in your config file. See [Common errors](../troubleshooting/common-errors.md).
