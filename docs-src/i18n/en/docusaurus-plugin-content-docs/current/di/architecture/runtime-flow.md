---
displayed_sidebar: injectContainerSidebar
title: Resolution Flow
---

## Class resolution (`Get<T>`)

1. Compute key: `ATag` or `T.ClassName`.
2. Check if registered.
3. Push key to detect circular dependencies.
4. If **lazy** and no instance exists, create/store `TServiceData`.
5. If needed, auto-resolve `Create(...)` params via RTTI.
6. Instantiate via `TServiceData.GetInstance<T>(...)`.

Note: `Get<T>` returns `nil` when missing (no exception).

## Interface resolution (`GetInterface<I>`)

1. Compute key: interface GUID (or `ATag`).
2. Check if registered.
3. Push key for circular detection.
4. If no instance exists, create `TServiceData` for interface.
5. If needed, auto-resolve `Create(...)` params.
6. Return `I` or throw `EServiceNotFound` when missing.
