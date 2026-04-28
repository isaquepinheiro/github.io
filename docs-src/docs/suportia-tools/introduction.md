---
title: Introduction
---

# Introduction

## What it is

SuportIA Tools is a monorepo workspace that hosts the components of the SuportIA system: a panel for authoring ERP support knowledge, a core runtime that retrieves and generates grounded answers via an LLM, a Flutter chat client for end users, and the `suportia` operator CLI.

The `suportia` CLI is the primary tool covered by this manual. It is an installable Python command-line tool that lets operators interact with a running SuportIA system from a terminal — without needing to open a browser or access internal APIs directly.

Since v0.4.0, `suportia` also wraps the panel publication endpoints, allowing operators to trigger screen publications and check publication status from the command line, using named configuration profiles to manage multiple environments.

## Who this manual is for

This manual is intended for:

- **Operators** — staff responsible for publishing ERP screen content and keeping the panel up to date. They use `suportia publish` to trigger publications and `suportia publish status` to confirm they succeeded.
- **Developers** — engineers working on the SuportIA system who need to test conversations, trigger reindexes, or run the live smoke suite against a local or staging instance.

## What problem it solves

Managing a multi-tenant ERP support assistant involves several recurring operational tasks: publishing updated screen content, verifying that publications landed correctly, triggering core reindexes after publication, and testing that a live instance answers questions correctly.

Without the CLI, all of these tasks require direct HTTP calls or panel UI actions, which are harder to automate and integrate into scripts or CI pipelines. The `suportia` CLI wraps these operations behind simple, scriptable commands with consistent authentication and environment management through TOML config profiles.
