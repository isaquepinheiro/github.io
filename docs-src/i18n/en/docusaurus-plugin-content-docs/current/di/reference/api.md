---
displayed_sidebar: injectContainerSidebar
title: API (Reference)
---

This page describes the observable public surface from [`TInject`](file:///d:/Ecossistema-Delphi/InjectContainer/Source/Inject.pas).

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


