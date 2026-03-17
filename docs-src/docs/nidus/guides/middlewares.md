---
displayed_sidebar: nidusSidebar
title: Middlewares e Guards
---

No Nidus, middlewares são definidos por rota via `RouteModule('/path', TModule, [TMiddleware...])`.

![Guard/Middleware](/img/nidus/guard.png)

O contrato é `IRouteMiddleware`:

- `Before(ARoute)`: roda antes de resolver o módulo (pode ajustar a rota)
- `Call(AReq)`: roda durante o request (se retornar `False`, o Nidus lança `EUnauthorizedException`)
- `After(ARoute)`: roda após o fluxo (hook de finalização)

## Exemplo

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

