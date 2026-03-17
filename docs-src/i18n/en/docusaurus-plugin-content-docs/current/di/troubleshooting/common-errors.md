---
displayed_sidebar: injectContainerSidebar
title: Common Errors
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
