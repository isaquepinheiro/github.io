---
displayed_sidebar: nidusSidebar
title: Runtime Flow
---

## Flow (Horse → Nidus)

1. Horse receives the request.
2. The `Nidus_Horse(...)` middleware creates an `IRouteRequest` and calls `GetNidus.LoadRouteModule(PathInfo, Request)`.
3. Nidus selects the route (`TRouteParse.SelectRoute`) and creates/resolves the target module (with optional cache).
4. Horse executes the handler registered for the route (e.g., `THorse.Get('/ping', ...)`).
5. In `finally`, the middleware calls `GetNidus.DisposeRouteModule(PathInfo)`.

## Lifecycle

- Without module cache: module instance is created/disposed per request.
- With module cache: selected modules can be reused (see `UseCache`).

:::tip
Nidus does not register HTTP endpoints by itself: it prepares route-scoped DI/lifecycle. Endpoint handlers are registered in Horse.
:::





