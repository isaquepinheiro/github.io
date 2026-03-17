---
displayed_sidebar: nidusSidebar
title: Routes (RouteModule/RouteChild)
---

Nidus organizes routing by module. A root module declares routes (submodules) responsible for each path.

Those routes are used by Nidus to decide **which module to load** when Horse receives a request.

## Defining routes in the root module

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

## Running with Horse

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
`Nidus_Horse` internally calls `GetNidus.LoadRouteModule(...)` and `GetNidus.DisposeRouteModule(...)`. You do not need to do this manually.
:::

:::caution
HTTP handling remains in Horse (e.g., `THorse.Get('/nfe/:id', ...)`). Without a registered handler, Horse will not invoke your logic.
:::





