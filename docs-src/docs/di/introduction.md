---
displayed_sidebar: injectContainerSidebar
title: Introdução
---

## O que é

O **InjectContainer** (código em `Source/`) expõe a classe [`TInject`](file:///d:/Ecossistema-Delphi/InjectContainer/Source/Inject.pas) como API principal.

Ele mantém um repositório de serviços registrados e resolve instâncias via RTTI, com suporte a:

- **Singleton**: uma instância por serviço.
- **Factory**: uma nova instância a cada resolução.
- **Lazy singleton**: instância criada no primeiro `Get`.
- **Interface mapping**: resolução de `IInterface` por GUID (com tag opcional).
- **Auto-inject**: parâmetros do construtor `Create(...)` são resolvidos automaticamente quando possível.

### Nomenclatura no repositório

Você verá referências históricas como **Injector4D** no código/README. A API atual está no unit `Inject` e o tipo central é `TInject`.

---

## What it is

**InjectContainer** (code under `Source/`) exposes [`TInject`](file:///d:/Ecossistema-Delphi/InjectContainer/Source/Inject.pas) as the main API.

It keeps a registry of services and resolves instances via RTTI, supporting:

- **Singleton**: one instance per service.
- **Factory**: a new instance on each resolution.
- **Lazy singleton**: instance created on first `Get`.
- **Interface mapping**: resolves `IInterface` by GUID (optional tag).
- **Auto-inject**: constructor `Create(...)` parameters are auto-resolved when possible.

### Naming in this repository

You may see legacy **Injector4D** references in code/README. The current API lives in the `Inject` unit and the core type is `TInject`.

