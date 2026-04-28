---
title: SuportIA Tools
---

# SuportIA Tools

Operator CLI and monorepo workspace for the SuportIA system — a multi-tenant ERP support assistant powered by LLM retrieval.

## Where to start

- [Introduction](introduction.md)
- [Quickstart](getting-started/quickstart.md)
- [How to publish a screen](guides/publish-screen.md)
- [How to configure profiles](guides/configure-profiles.md)
- [Configuration reference](reference/configuration.md)
- [Troubleshooting](troubleshooting/common-errors.md)

## Scope

This manual covers:

- Installing and running the `suportia` operator CLI
- Sending questions to a live SuportIA-Core instance via `suportia chat ask`
- Publishing ERP screens to the panel via `suportia publish screen`
- Checking publication status via `suportia publish status`
- Triggering core reindex via `suportia core reindex`
- Running the live smoke test suite via `suportia smoke`
- Configuring the CLI using environment variables, TOML config files, and named profiles

Does not cover:

- Internal architecture of the panel, core, or chat client
- Deployment of the panel or core services
- Flutter chat client setup
