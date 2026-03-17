---
displayed_sidebar: injectContainerSidebar
title: Quickstart
---

## 1) Criar um container

Você pode usar um container local, ou o singleton global via `GetInjector`.

```pascal
uses
  Inject;

var
  Injector: TInject;
begin
  Injector := TInject.Create;
  try
    // Registros e resoluções aqui
  finally
    Injector.Free;
  end;
end;
```

## 2) Registrar services

```pascal
Injector.Singleton<TMinhaClasse>;
Injector.SingletonLazy<TMinhaClassePesada>;
Injector.Factory<TMinhaClasseTransient>;
```

## 3) Resolver services

```pascal
var S1 := Injector.Get<TMinhaClasse>;
var S2 := Injector.Get<TMinhaClasse>;
```

## 4) Registrar e resolver interfaces

```pascal
type
  IMeuServico = interface
    ['{11111111-1111-1111-1111-111111111111}']
    procedure Execute;
  end;

  TMeuServico = class(TInterfacedObject, IMeuServico)
  public
    procedure Execute;
  end;

Injector.SingletonInterface<IMeuServico, TMeuServico>;

var Svc := Injector.GetInterface<IMeuServico>;
Svc.Execute;
```

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


