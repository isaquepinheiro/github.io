---
displayed_sidebar: nidusSidebar
title: Modules (TModule)
---

Modules are Nidus composition units. A module encapsulates:

- `Routes`: child routes/modules bound to scope
- `Binds`: dependency injection (service/class registration)
- `Imports`: import binds exported by other modules
- `ExportedBinds`: binds exposed to other modules
- `RouteHandlers`: interception/integration with driver

## Example: ExportedBinds

```pascal
unit Export.Module;

interface

uses
  Nidus.Module;

type
  TExportModule = class(TModule)
  public
    function ExportedBinds: TExportedBinds; override;
  end;

implementation

uses
  NFe.Controller;

function TExportModule.ExportedBinds: TExportedBinds;
begin
  Result := [Bind<TControllerServer>.Singleton];
end;

end.
```

:::caution
`ExportedBinds` exports only binds. Routes are not exported/imported.
:::

## Example: Imports

```pascal
unit NFe.Module;

interface

uses
  Nidus.Module;

type
  TNFeModule = class(TModule)
  public
    function Binds: TBinds; override;
    function Imports: TImports; override;
  end;

implementation

uses
  Export.Module,
  NFe.Repository,
  NFe.Provider;

function TNFeModule.Binds: TBinds;
begin
  Result := [
    Bind<TRepositoryServer>.SingletonLazy,
    Bind<TProviderORMBr>.Factory
  ];
end;

function TNFeModule.Imports: TImports;
begin
  Result := [TExportModule];
end;

end.
```





