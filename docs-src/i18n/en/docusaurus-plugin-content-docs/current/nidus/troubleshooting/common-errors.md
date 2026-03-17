---
displayed_sidebar: nidusSidebar
title: Erros Comuns
---

## Cache de resposta não funciona

- Confirme que `ResponseCache(...)` está registrado antes do `Nidus_Horse`.
- Confirme que a rota está na lista de cache (`ResponseCache([rotas], ...)`) ou que `CacheAll` está habilitado.

## Pool não reutiliza

- Confirme que o pool foi registrado com `GetNidus.UsePools<T>`.
- Confirme que você está usando `GetNidus.WithPool<T>` (ou `Acquire/Release`) no mesmo processo.



