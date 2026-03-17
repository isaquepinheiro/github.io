---
displayed_sidebar: nidusSidebar
title: Runtime Flow
---

## Flow (Horse → Nidus)

1. Horse recebe a request.
2. O middleware `Nidus_Horse(...)` cria um `IRouteRequest` e chama `GetNidus.LoadRouteModule(PathInfo, Request)`.
3. Nidus selects the route (`TRouteParse.SelectRoute`) and creates/resolves the target module (with optional cache).
4. Horse executa o handler registrado para a rota (ex.: `THorse.Get('/ping', ...)`).
5. No `finally`, o middleware chama `GetNidus.DisposeRouteModule(PathInfo)`.

## Lifecycle

- Without module cache: module instance is created/disposed per request.
- With module cache: selected modules can be reused (see `UseCache`).

:::tip
Nidus does not register HTTP endpoints by itself: it prepares route-scoped DI/lifecycle. Endpoint handlers are registered in Horse.
:::





