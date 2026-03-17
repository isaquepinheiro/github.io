---
displayed_sidebar: nidusSidebar
title: Quickstart
---

Este quickstart mostra o Nidus rodando em um projeto Horse com:

- um módulo raiz (`TAppModule`) que declara rotas/módulos
- um módulo de feature (`TPingModule`) que registra binds
- um `TRouteHandlerHorse` que registra endpoints no Horse

## 1) Criar um módulo de feature

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

## 2) Criar o RouteHandler (Horse)

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

## 3) Criar o módulo raiz (rotas + route handlers)

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

## 4) Subir o Horse com o driver do Nidus

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

## Observações

- O `Nidus_Horse` não “processa” a rota: ele **carrega o módulo/DI** antes do handler do Horse rodar.
- `RouteHandlers` é um lugar prático para centralizar o cadastro de endpoints do servidor (Horse).

