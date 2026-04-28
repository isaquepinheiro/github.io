---
title: Configuration Reference
---

# Configuration Reference

All configuration parameters for the `suportia` operator CLI.

## Global CLI options

These options appear before any subcommand and apply to the entire invocation:

| Option | Env var | Description |
|--------|---------|-------------|
| `--config PATH` | `SUPORTIA_CONFIG` | Path to a TOML configuration file. |
| `--profile NAME` | `SUPORTIA_PROFILE` | Named profile to activate within the config file. |

## Resolution precedence

When the same key is set in multiple places, the highest-priority source wins:

1. CLI flag
2. Environment variable
3. Active named profile (`[suportia.profiles.<name>]`)
4. Root `[suportia]` table in the config file
5. Built-in default

## Environment variables

| Variable | Default | Used by | Description |
|----------|---------|---------|-------------|
| `SUPORTIA_BASE_URL` | `http://localhost:8000` | `chat ask`, `core reindex`, `smoke` | Base URL of the SuportIA-Core instance. |
| `SUPORTIA_TENANT` | — | `chat ask`, `core reindex` | Tenant slug. Required if not set in the config file. |
| `SUPORTIA_LOCALE` | `pt-BR` | `chat ask`, `core reindex` | Locale code. |
| `SUPORTIA_PANEL_BASE_URL` | `http://localhost:8001` | `publish screen`, `publish status` | Base URL of the SuportIA Panel instance. |
| `SUPORTIA_PANEL_TOKEN` | — | `publish screen`, `publish status` | Bearer token for the panel API. Omit to send requests without an `Authorization` header. |
| `SUPORTIA_CONFIG` | — | all | Path to the TOML config file. Equivalent to `--config`. |
| `SUPORTIA_PROFILE` | — | all | Active profile name. Equivalent to `--profile`. |

## TOML configuration file

### Legacy single-table format (v0.1.0+)

```toml
[suportia]
base_url = "http://localhost:8000"
panel_base_url = "http://localhost:8001"
tenant = "my-tenant"
locale = "pt-BR"
```

### Multi-profile format (v0.4.0+)

```toml
[suportia]
base_url = "http://localhost:8000"
panel_base_url = "http://localhost:8001"
tenant = "default"

[suportia.profiles.staging]
base_url = "https://staging-core.example.com"
panel_base_url = "https://staging-panel.example.com"
panel_token = "<YOUR_STAGING_TOKEN>"
tenant = "staging"

[suportia.profiles.prod]
base_url = "https://core.example.com"
panel_base_url = "https://panel.example.com"
panel_token = "<YOUR_PROD_TOKEN>"
tenant = "acme"
```

Keys absent from a profile fall back to the root `[suportia]` table. The legacy single-table format remains fully supported.

## Supported TOML keys

| Key | Type | Description |
|-----|------|-------------|
| `base_url` | string | SuportIA-Core base URL. |
| `panel_base_url` | string | SuportIA Panel base URL. |
| `panel_token` | string | Bearer token for the panel API. |
| `tenant` | string | Tenant slug. |
| `locale` | string | Locale code (e.g. `pt-BR`, `en`). |

## Command-specific options

### `suportia chat ask <question>`

| Option | Env var | Description |
|--------|---------|-------------|
| `--tenant TEXT` | `SUPORTIA_TENANT` | Tenant slug. Required. |
| `--locale TEXT` | `SUPORTIA_LOCALE` | Locale code. Defaults to `pt-BR`. |
| `--thread-id TEXT` | — | Thread ID to continue an existing conversation. |

### `suportia core reindex`

| Option | Env var | Description |
|--------|---------|-------------|
| `--tenant TEXT` | `SUPORTIA_TENANT` | Tenant slug. |
| `--locale TEXT` | `SUPORTIA_LOCALE` | Locale code. |
| `--module TEXT` | — | Module code. |
| `--screen TEXT` | — | Screen code. |

### `suportia publish screen <id>` and `suportia publish status <id>`

Credentials come from `SUPORTIA_PANEL_BASE_URL` / `SUPORTIA_PANEL_TOKEN` or the active profile's `panel_base_url` / `panel_token`.

No additional options beyond global `--config` / `--profile`.

### `suportia smoke`

| Option | Description |
|--------|-------------|
| `--core-dir PATH` | Path to SuportIA-Core root. Defaults to `_worktrees/SuportIA-Core` relative to CWD. |
