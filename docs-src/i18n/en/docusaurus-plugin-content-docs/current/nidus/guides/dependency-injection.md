---
displayed_sidebar: nidusSidebar
title: Dependency Injection (Binds)
---

Nidus uses a DI container (based on InjectorBr) to resolve dependencies within module scope.

## Bind types

Binds are declared in a module `Binds` method using `Bind<T>` syntax (shortcut available in `Nidus.Module`).

- `Bind<T>.Singleton`: creates instance when module starts
- `Bind<T>.SingletonLazy`: creates the instance on first request
- `Bind<T>.Factory`: creates on demand
- `Bind<T>.SingletonInterface<I>`: exposes an interface resolved via `GetInterface<I>`

## Example

```pascal
unit NFe.Module;

interface

uses
  Nidus.Module;

type
  TNFeModule = class(TModule)
  public
    function Binds: TBinds; override;
  end;

implementation

uses
  NFe.Repository,
  NFe.Controller,
  NFe.Provider;

function TNFeModule.Binds: TBinds;
begin
  Result := [
    Bind<TRepositoryServer>.SingletonLazy,
    Bind<TControllerServer>.Singleton,
    Bind<TProviderORMBr>.Factory
  ];
end;

end.
```

:::caution
For a bind to be eligible for replacement/override, the target type must be declared correctly in `Bind<T>`.
:::





