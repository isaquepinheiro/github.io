---
displayed_sidebar: nidusSidebar
title: Middlewares e Guards
---

In Nidus, middlewares are defined per route via `RouteModule('/path', TModule, [TMiddleware...])`.

![Guard/Middleware](/img/nidus/guard.png)

The contract is `IRouteMiddleware`:

- `Before(ARoute)`: runs before module resolution (can adjust route data)
- `Call(AReq)`: runs during the request (if it returns `False`, Nidus raises `EUnauthorizedException`)
- `After(ARoute)`: runs after flow completion (finalization hook)

## Example

```pascal
unit App.Module;

interface

uses
  Nidus.Module,
  Nidus.Route.Abstract,
  Nidus.Request,
  NFe.Module;

type
  TAuthGuard = class(TRouteMiddleware)
  public
    function Call(const AReq: IRouteRequest): Boolean; override;
  end;

  TAppModule = class(TModule)
  public
    function Routes: TRoutes; override;
  end;

implementation

function TAuthGuard.Call(const AReq: IRouteRequest): Boolean;
begin
  Result := (AReq.Username = 'user') and (AReq.Password = '123456');
end;

function TAppModule.Routes: TRoutes;
begin
  Result := [
    RouteModule('/nfe/:id', TNFeModule, [TAuthGuard])
  ];
end;

end.
```




