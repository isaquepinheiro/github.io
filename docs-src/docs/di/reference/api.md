---
displayed_sidebar: injectContainerSidebar
title: API (referência)
---

Esta seção descreve a superfície pública observável em [`TInject`](file:///d:/Ecossistema-Delphi/InjectContainer/Source/Inject.pas).

---

This section describes the observable public surface from [`TInject`](file:///d:/Ecossistema-Delphi/InjectContainer/Source/Inject.pas).

## Registro

- `Singleton<T>(OnCreate, OnDestroy, OnConstructorParams)`
- `SingletonLazy<T>(OnCreate, OnDestroy, OnConstructorParams)`
- `Factory<T>(OnCreate, OnDestroy, OnConstructorParams)`
- `SingletonInterface<I, T>(Tag, OnCreate, OnDestroy, OnConstructorParams)`
- `AddInstance<T>(Instance)`
- `AddInject(Tag, ChildInjector)`

## Resolução

- `Get<T>(Tag): T`
- `GetInterface<I>(Tag): I`

## Remoção

- `Remove<T>(Tag)`

## Diagnóstico e performance

- `EnableLogging(LogCallback)` / `DisableLogging`
- `ClearCache`

## Exceções

- `EServiceAlreadyRegistered` (registro duplicado)
- `EServiceNotFound` (interface não encontrada)
- `ECircularDependency` (dependência circular durante a resolução)

---

## Registration

- `Singleton<T>(OnCreate, OnDestroy, OnConstructorParams)`
- `SingletonLazy<T>(OnCreate, OnDestroy, OnConstructorParams)`
- `Factory<T>(OnCreate, OnDestroy, OnConstructorParams)`
- `SingletonInterface<I, T>(Tag, OnCreate, OnDestroy, OnConstructorParams)`
- `AddInstance<T>(Instance)`
- `AddInject(Tag, ChildInjector)`

## Resolution

- `Get<T>(Tag): T`
- `GetInterface<I>(Tag): I`

## Removal

- `Remove<T>(Tag)`

## Diagnostics & performance

- `EnableLogging(LogCallback)` / `DisableLogging`
- `ClearCache`

## Exceptions

- `EServiceAlreadyRegistered` (duplicate registration)
- `EServiceNotFound` (missing interface)
- `ECircularDependency` (cycle detected during resolution)

