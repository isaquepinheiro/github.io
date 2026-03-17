---
displayed_sidebar: nidusSidebar
title: Rotas (RouteModule/RouteChild)
---

O Nidus organiza o roteamento por módulo. Um módulo raiz declara as rotas (submódulos) que respondem por cada path.

Essas rotas são usadas pelo Nidus para decidir **qual módulo carregar** quando o Horse receber a request.

## Definindo rotas no módulo raiz

```pascal
unit App.Module;

interface

uses
  Nidus.Module,
  NFe.Module;

type
  TAppModule = class(TModule)
  public
    function Routes: TRoutes; override;
  end;

implementation

function TAppModule.Routes: TRoutes;
begin
  Result := [
    RouteModule('/nfe/:id', TNFeModule)
  ];
end;

end.
```

## Rodando no Horse

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

:::tip
O `Nidus_Horse` chama internamente `GetNidus.LoadRouteModule(...)` e `GetNidus.DisposeRouteModule(...)`. Você não precisa fazer isso manualmente.
:::

:::caution
O handler HTTP continua sendo do Horse (ex.: `THorse.Get('/nfe/:id', ...)`). Sem um handler registrado, o Horse não chamará sua lógica.
:::


