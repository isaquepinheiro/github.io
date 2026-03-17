---
displayed_sidebar: nidusSidebar
title: Quickstart
---

This quickstart shows Nidus running in a Horse project with:

- a root module (`TAppModule`) that declares routes/modules
- a feature module (`TPingModule`) that registers binds
- a `TRouteHandlerHorse` that registers endpoints in Horse

## 1) Create a feature module

```pascal
unit App.Module;

interface

uses
  Nidus.Module,
  Nidus.Bind;

type
  TPingService = class
  public
    function Pong: string;
  end;

  TPingModule = class(TModule)
  public
    function Binds: TBinds; override;
  end;

implementation

function TPingModule.Binds: TBinds;
begin
  Result := [Bind<TPingService>.Singleton];
end;

function TPingService.Pong: string;
begin
  Result := 'pong';
end;

end.
```

## 2) Create the RouteHandler (Horse)

```pascal
unit Ping.RouteHandler;

interface

uses
  Horse,
  Horse.Callback,
  Nidus,
  Nidus.Route.Handler.Horse;

type
  TPingRouteHandler = class(TRouteHandlerHorse)
  protected
    procedure RegisterRoutes; override;
  public
    procedure Ping(Req: THorseRequest; Res: THorseResponse; Next: TNextProc);
  end;

implementation

procedure TPingRouteHandler.RegisterRoutes;
begin
  RouteGet('/ping', Ping);
end;

procedure TPingRouteHandler.Ping(Req: THorseRequest; Res: THorseResponse; Next: TNextProc);
begin
  Res.Send(GetNidus.Get<TPingService>.Pong).Status(200);
end;

end.
```

## 3) Create the root module (routes + route handlers)

```pascal
unit App.Module;

interface

uses
  Nidus.Module,
  Nidus.Route.Abstract,
  Ping.Module,
  Ping.RouteHandler;

type
  TAppModule = class(TModule)
  public
    function Routes: TRoutes; override;
    function RouteHandlers: TRouteHandlers; override;
  end;

implementation

function TAppModule.Routes: TRoutes;
begin
  Result := [RouteModule('/ping', TPingModule, [])];
end;

function TAppModule.RouteHandlers: TRouteHandlers;
begin
  Result := [TPingRouteHandler];
end;

end.
```

## 4) Start Horse with the Nidus driver

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

## Notes

- `Nidus_Horse` does not process the route itself: it **loads module/DI** before the Horse handler runs.
- `RouteHandlers` is a practical place to centralize server endpoint registration (Horse).




