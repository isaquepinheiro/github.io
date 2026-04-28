---
title: Quickstart
---

# Quickstart

## Prerequisites

Before you begin, make sure you have:

| Item | Minimum version | Notes |
|------|-----------------|-------|
| Python | 3.11+ | Required to install and run `suportia` |
| pip | any recent | Comes with Python |
| A running SuportIA-Core instance | — | Required for `chat ask`, `core reindex`, `smoke` |
| A running SuportIA Panel instance | — | Required for `publish screen` / `publish status` |

## Installation

Install the CLI directly from the source tree:

```bash
cd tools/suportia
pip install -e .
```

Verify the installation:

```bash
suportia --help
```

Expected output:

```
Usage: suportia [OPTIONS] COMMAND [ARGS]...

  SuportIA operator CLI.

Options:
  --config PATH    Path to a TOML config file.
  --profile TEXT   Active config profile name.
  --help           Show this message and exit.

Commands:
  chat     Chat commands.
  core     Core commands.
  publish  Publish commands.
  smoke    Run the live-server smoke test suite.
```

## Configuration

The CLI reads credentials and endpoint URLs from environment variables or a TOML config file. The simplest setup uses environment variables:

```bash
export SUPORTIA_BASE_URL=http://localhost:8000       # Core URL
export SUPORTIA_TENANT=my-tenant                      # Tenant slug
export SUPORTIA_PANEL_BASE_URL=http://localhost:8001  # Panel URL
export SUPORTIA_PANEL_TOKEN=your-bearer-token          # Panel bearer token
```

For persistent configuration across sessions, create a TOML file and pass it with `--config`. See [How to configure profiles](../guides/configure-profiles.md) for the full TOML format.

## First command

With the core running and `SUPORTIA_BASE_URL` set, send a test question:

```bash
suportia chat ask "How do I register a new supplier?"
```

Expected output (abbreviated):

```
Answer: To register a new supplier, navigate to the Suppliers screen ...
Thread ID: <uuid>
```

## Next steps

- [How to publish a screen](../guides/publish-screen.md)
- [How to configure profiles](../guides/configure-profiles.md)
- [Configuration reference](../reference/configuration.md)
