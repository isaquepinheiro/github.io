---
displayed_sidebar: injectContainerSidebar
title: Introduction
---

## What it is

**InjectContainer** (code under `Source/`) exposes [`TInject`](file:///d:/Ecossistema-Delphi/InjectContainer/Source/Inject.pas) as the main API.

It keeps a service registry and resolves instances via RTTI, supporting:

- **Singleton**: one instance per service.
- **Factory**: a new instance on each resolution.
- **Lazy singleton**: instance created on first `Get`.
- **Interface mapping**: resolves `IInterface` by GUID (optional tag).
- **Auto-inject**: constructor `Create(...)` parameters are auto-resolved when possible.

### Naming in this repository

You may see legacy **Injector4D** references in code/README. The current API lives in the `Inject` unit and the core type is `TInject`.
