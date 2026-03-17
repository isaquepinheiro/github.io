---
displayed_sidebar: injectContainerSidebar
title: Erros comuns
---

## `EServiceAlreadyRegistered`

**Causa**: tentar registrar a mesma classe/interface duas vezes.

**Correção**: registre uma única vez no bootstrap, ou remova antes de registrar novamente.

## `EServiceNotFound` (interfaces)

**Causa**: chamar `GetInterface<I>` sem ter registrado `SingletonInterface<I, T>`.

**Correção**: garanta que o GUID/Tag usado no registro é o mesmo usado no `GetInterface`.

## `Get<T>` retorna `nil`

**Causa**: a classe não está registrada.

**Correção**: verifique se você chamou `Singleton<T>`, `SingletonLazy<T>`, `Factory<T>` ou `AddInstance<T>` antes de resolver.

## Exceção ao auto-injetar `Create(...)`

**Causa**: dependência do construtor não registrada, ou tipo não suportado (ex.: tipos primitivos).

**Correção**: registre dependências do construtor e mantenha parâmetros de `Create(...)` limitados a `class` e `interface` (ou forneça `OnConstructorParams`).

---

## `EServiceAlreadyRegistered`

**Cause**: registering the same class/interface twice.

**Fix**: register once during bootstrap, or remove before re-registering.

## `EServiceNotFound` (interfaces)

**Cause**: calling `GetInterface<I>` without `SingletonInterface<I, T>`.

**Fix**: ensure you use the same GUID/tag for registration and resolution.

## `Get<T>` returns `nil`

**Cause**: the class is not registered.

**Fix**: ensure you called `Singleton<T>`, `SingletonLazy<T>`, `Factory<T>`, or `AddInstance<T>` before resolving.

## Exception during `Create(...)` auto-injection

**Cause**: missing registrations for constructor dependencies, or unsupported param types (e.g., primitives).

**Fix**: register constructor dependencies and keep `Create(...)` params to `class`/`interface` (or provide `OnConstructorParams`).

