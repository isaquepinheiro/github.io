---
displayed_sidebar: injectContainerSidebar
title: Concepts
---

## Registry

The container keeps two main registries:

- **Classes**: key = `T.ClassName` (or a tag in specific cases); value = `TClass`.
- **Interfaces**: key = `GUIDToString(TypeInfo(I).Guid)` (or tag); value = (`TClass`, `TGUID`).

## Lifetimes

- **Singleton** (`Singleton<T>`): creates and reuses one instance.
- **Lazy singleton** (`SingletonLazy<T>`): registers, instantiates on first `Get<T>`.
- **Factory** (`Factory<T>`): new instance per `Get<T>`.

## Auto-inject (constructor)

When creating a service and no custom params are provided, it tries to resolve the `Create(...)` constructor via RTTI:

- `class` params: resolves via `Get<TObject>(TypeName)`.
- `interface` params: resolves via `GetInterface<IInterface>(GUID)`.

In practice, you must register the dependencies used by the constructor upfront.

## Hooks

On registration, you can provide callbacks for:

- `OnCreate`: runs after instantiation.
- `OnDestroy`: runs when removed.
- `OnConstructorParams`: supplies custom `Create(...)` params.
