---
displayed_sidebar: nidusSidebar
title: Route Handlers
---

Route Handlers are a way to register direct server routes (e.g., Horse) and centralize registration in classes.

In Nidus, the base class is `TRouteHandler`; for Horse, there is `TRouteHandlerHorse`.

## Example (Horse)

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





