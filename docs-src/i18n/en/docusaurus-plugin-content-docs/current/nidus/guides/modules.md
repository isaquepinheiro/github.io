---
displayed_sidebar: nidusSidebar
title: Modules (TModule)
---

Modules são a unidade de composição do Nidus. Um módulo encapsula:

- `Routes`: rotas/módulos filhos associados ao escopo
- `Binds`: injeção de dependency (registration de classes/services)
- `Imports`: importação de binds exportados por outros módulos
- `ExportedBinds`: binds expostos para outros módulos
- `RouteHandlers`: interceptação/integração com o driver

## Exemplo: ExportedBinds

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
`ExportedBinds` exporta apenas binds. Routes não são exportadas/importadas.
:::

## Exemplo: Imports

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



