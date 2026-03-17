---
displayed_sidebar: injectContainerSidebar
title: Conceitos
---

## Registro (registry)

O container mantém dois repositórios principais:

- **Classes**: chave = `T.ClassName` (ou um tag, em casos específicos); valor = `TClass`.
- **Interfaces**: chave = `GUIDToString(TypeInfo(I).Guid)` (ou tag); valor = par (`TClass`, `TGUID`).

## Ciclo de vida

- **Singleton** (`Singleton<T>`): cria e reaproveita uma instância.
- **Singleton Lazy** (`SingletonLazy<T>`): registra, mas só instancia no primeiro `Get<T>`.
- **Factory** (`Factory<T>`): instância nova a cada `Get<T>`.

## Auto-inject (construtor)

Quando o serviço é instanciado e não há parâmetros customizados, o container tenta resolver o construtor `Create(...)` via RTTI:

- Parâmetros `class`: resolve usando `Get<TObject>(NomeDoTipo)`.
- Parâmetros `interface`: resolve usando `GetInterface<IInterface>(GUID)`.

Na prática, isso exige que você registre previamente as dependências que aparecem no construtor.

## Eventos (hooks)

No registro, você pode passar callbacks para:

- `OnCreate`: executa após instanciar.
- `OnDestroy`: executa quando o serviço é removido.
- `OnConstructorParams`: fornece parâmetros customizados para o `Create(...)`.

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

