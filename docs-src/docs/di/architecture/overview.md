---
displayed_sidebar: injectContainerSidebar
title: Visão geral
---

## Componentes principais

- [`TInject`](file:///d:/Ecossistema-Delphi/InjectContainer/Source/Inject.pas): API pública (register/get/remove, logging, cache, detecção de ciclos).
- [`TInjectContainer`](file:///d:/Ecossistema-Delphi/InjectContainer/Source/Inject.Container.pas): base com dicionários e fábrica.
- [`TInjectFactory`](file:///d:/Ecossistema-Delphi/InjectContainer/Source/Inject.Factory.pas): cria metadados (`TServiceData`).
- [`TServiceData`](file:///d:/Ecossistema-Delphi/InjectContainer/Source/Inject.Service.pas): armazena classe, modo (singleton/factory) e cria instâncias via RTTI.
- [`TInjectEvents`](file:///d:/Ecossistema-Delphi/InjectContainer/Source/Inject.Events.pas): callbacks de lifecycle e parâmetros.

## Regras práticas

- Registre seus serviços durante o bootstrap (antes de múltiplas threads começarem a resolver).
- Para auto-inject, mantenha construtores simples e dependências previamente registradas.

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

