---
displayed_sidebar: injectContainerSidebar
title: Quickstart
---

## 1) Create a container

You can use a local container or the global singleton via `GetInjector`.

```pascal
uses
  Inject;

var
  Injector: TInject;
begin
  Injector := TInject.Create;
  try
    // registrations and resolutions
  finally
    Injector.Free;
  end;
end;
```

## 2) Register services

```pascal
Injector.Singleton<TMyService>;
Injector.SingletonLazy<THeavyService>;
Injector.Factory<TTransientService>;
```

## 3) Resolve services

```pascal
var S1 := Injector.Get<TMyService>;
var S2 := Injector.Get<TMyService>;
```

## 4) Register and resolve interfaces

```pascal
type
  IMyService = interface
    ['{11111111-1111-1111-1111-111111111111}']
    procedure Execute;
  end;

  TMyService = class(TInterfacedObject, IMyService)
  public
    procedure Execute;
  end;

Injector.SingletonInterface<IMyService, TMyService>;

var Svc := Injector.GetInterface<IMyService>;
Svc.Execute;
```


