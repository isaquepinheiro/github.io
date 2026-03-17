---
displayed_sidebar: nidusSidebar
title: Module Cache
---

By default, Nidus creates/disposes module instances during the request lifecycle. In some scenarios (heavy modules, reusable resources), you can enable module cache.

## Default implementation

Nidus includes an in-memory implementation:

- `Nidus.Module.Cache` → `TModuleCacheManager`

## Enable for specific modules

```pascal
uses
  Nidus,
  Nidus.Module.Cache,
  NFe.Module;

begin
  GetNidus.UseCache(TModuleCacheManager.Create, [TNFeModule]);
end.
```

## Enable for all modules

```pascal
uses
  Nidus,
  Nidus.Module.Cache,
  Nidus.Module.Cache.Interfaces;

begin
  GetNidus.UseCache(TModuleCacheManager.Create, [TNidusCacheAll]);
end.
```

:::caution
Module cache changes lifecycle: module instances may survive multiple requests. Enable only when module state is safe for reuse.
:::





