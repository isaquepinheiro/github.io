---
title: How to configure profiles
---

# How to configure profiles

**Audience:** Operators and developers managing multiple environments (local, staging, production)  
**Prerequisites:** `suportia` installed  
**Outcome:** A TOML config file with named profiles that the CLI selects at runtime without requiring environment variables on every call

## Why use profiles

When you work with more than one environment — for example a local development instance and a production panel — switching between them via environment variables is error-prone. Named profiles let you store all environment credentials in a single file and select the active profile with a flag or an environment variable.

## Create the config file

Create `suportia.toml` in a directory of your choice (for example, the project root):

```toml
# suportia.toml

[suportia]
base_url = "http://localhost:8000"
panel_base_url = "http://localhost:8001"
tenant = "default-tenant"

[suportia.profiles.staging]
base_url = "https://staging-core.example.com"
panel_base_url = "https://staging-panel.example.com"
panel_token = "<YOUR_STAGING_TOKEN>"
tenant = "staging-tenant"

[suportia.profiles.prod]
base_url = "https://core.example.com"
panel_base_url = "https://panel.example.com"
panel_token = "<YOUR_PROD_TOKEN>"
tenant = "acme"
```

Keys missing from a profile automatically fall back to the `[suportia]` root table. You only need to list the values that differ per environment.

## Use a profile

Pass `--config` and `--profile` as global options before any subcommand:

```bash
suportia --config ./suportia.toml --profile prod publish screen 42
suportia --config ./suportia.toml --profile staging chat ask "How do I register a supplier?"
```

## Set the active profile via environment variable

If you always work in the same environment for a session, set `SUPORTIA_PROFILE` to avoid repeating `--profile`:

```bash
export SUPORTIA_CONFIG=./suportia.toml
export SUPORTIA_PROFILE=prod
suportia publish screen 42
suportia publish status 42
```

## Resolution precedence

When the same key is defined in multiple places, the CLI applies this order (highest priority wins):

1. `--config` / `--profile` CLI flags
2. `SUPORTIA_CONFIG` / `SUPORTIA_PROFILE` environment variables
3. The selected named profile (`[suportia.profiles.<name>]`)
4. The root `[suportia]` table
5. Built-in defaults

## Steps

1. Create `suportia.toml` with a `[suportia]` root section and one `[suportia.profiles.<name>]` section per environment.
2. Add the token for each environment under `panel_token`. Keep this file out of version control (add it to `.gitignore`).
3. Run any command with `--config ./suportia.toml --profile <name>`.
4. Optionally export `SUPORTIA_CONFIG` and `SUPORTIA_PROFILE` in your shell profile to avoid repeating the flags.

## Verification

Run `suportia --config ./suportia.toml --profile prod publish status 42` and confirm the response comes from the production panel URL (the domain visible in any error message will match the profile's `panel_base_url`).

## Troubleshooting

If the CLI ignores your profile settings, see [Common errors](../troubleshooting/common-errors.md#profile-values-are-not-applied).
