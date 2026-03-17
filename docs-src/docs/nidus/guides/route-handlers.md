---
displayed_sidebar: nidusSidebar
title: Route Handlers
---

Route Handlers são uma forma de registrar rotas “diretas” no server (ex.: Horse) e centralizar o cadastro em classes.

No Nidus, o base é `TRouteHandler` e, para Horse, existe `TRouteHandlerHorse`.

## Exemplo (Horse)

```pascal
unit Pdf.RouteHandler;

interface

uses
  Horse,
  Horse.Callback,
  Nidus.Route.Handler.Horse;

type
  TPdfRouteHandler = class(TRouteHandlerHorse)
  protected
    procedure RegisterRoutes; override;
  public
    procedure Pdf(Req: THorseRequest; Res: THorseResponse; Next: TNextProc);
  end;

implementation

procedure TPdfRouteHandler.RegisterRoutes;
begin
  RouteGet('/nfe/pdf/:id', Pdf);
end;

procedure TPdfRouteHandler.Pdf(Req: THorseRequest; Res: THorseResponse; Next: TNextProc);
begin
  Res.Send('ok');
end;

end.
```

## Registrar no AppModule

```pascal
function TAppModule.RouteHandlers: TRouteHandlers;
begin
  Result := [TPdfRouteHandler];
end;
```


