---
displayed_sidebar: injectContainerSidebar
title: Fluxo de resolução
---

## Resolução de classes (`Get<T>`)

1. Define a chave: `ATag` ou `T.ClassName`.
2. Verifica se a classe foi registrada.
3. Empilha a chave para detectar dependência circular.
4. Se for **lazy** e ainda não existe instância, cria o `TServiceData` e guarda.
5. Se necessário, tenta auto-resolver parâmetros do `Create(...)` via RTTI.
6. Instancia via `TServiceData.GetInstance<T>(...)`.

Observação: `Get<T>` retorna `nil` se não encontrar (não lança exceção).

## Resolução de interfaces (`GetInterface<I>`)

1. Define a chave: GUID da interface (ou `ATag`).
2. Verifica se a interface foi registrada.
3. Empilha a chave para detectar dependência circular.
4. Se ainda não existe instância, cria `TServiceData` para interface.
5. Se necessário, tenta auto-resolver parâmetros do `Create(...)`.
6. Retorna `I` ou lança `EServiceNotFound` se não encontrar.

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

