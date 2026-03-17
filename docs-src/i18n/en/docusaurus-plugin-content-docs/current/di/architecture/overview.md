---
displayed_sidebar: injectContainerSidebar
title: Overview
---

## Main building blocks

- [`TInject`](file:///d:/Ecossistema-Delphi/InjectContainer/Source/Inject.pas): public API (register/get/remove, logging, cache, cycle detection).
- [`TInjectContainer`](file:///d:/Ecossistema-Delphi/InjectContainer/Source/Inject.Container.pas): base class with dictionaries and factory.
- [`TInjectFactory`](file:///d:/Ecossistema-Delphi/InjectContainer/Source/Inject.Factory.pas): builds service metadata (`TServiceData`).
- [`TServiceData`](file:///d:/Ecossistema-Delphi/InjectContainer/Source/Inject.Service.pas): stores lifetime and creates instances via RTTI.
- [`TInjectEvents`](file:///d:/Ecossistema-Delphi/InjectContainer/Source/Inject.Events.pas): lifecycle hooks and constructor param provider.

## Practical rules

- Register services during bootstrap (before multiple threads start resolving).
- For auto-inject, keep constructors simple and dependencies registered upfront.


