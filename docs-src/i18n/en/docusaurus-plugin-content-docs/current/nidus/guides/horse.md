---
displayed_sidebar: nidusSidebar
title: Horse Integration
---

## Driver

Nidus Horse driver is a middleware that you register in `THorse.Use`.

Ele faz duas coisas:

- At startup: call `GetNidus.Start(TAppModule.Create)` to register root module routes/binds.
- On each request: call `GetNidus.LoadRouteModule(PathInfo, Request)` before Horse handler execution and `GetNidus.DisposeRouteModule(PathInfo)` in `finally`.

```pascal
uses
  Horse,
  Nidus.Driver.Horse,
  App.Module;

begin
  THorse.Use(Nidus_Horse(TAppModule.Create));
  THorse.Listen(9000);
end.
```

## Middleware ordering

- Authentication/authorization middlewares (if any) should usually run first.
- `ResponseCache` (if used) usually should run before `Nidus_Horse`.

## Important: Horse handles the HTTP route

Nidus does not create HTTP endpoints by itself. You register routes in Horse (directly via `THorse.Get/Post/...` or `TRouteHandlerHorse`). Nidus acts as a **route-scoped DI/lifecycle layer**.





