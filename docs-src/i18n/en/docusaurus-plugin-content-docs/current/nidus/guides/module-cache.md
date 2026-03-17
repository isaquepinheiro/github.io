---
displayed_sidebar: nidusSidebar
title: Cache de Módulo
---

Por padrão, o Nidus cria e descarta instâncias de módulo durante o ciclo do request. Em alguns cenários (módulos pesados, recursos reutilizáveis), você pode habilitar cache de módulo.

## Implementação padrão

O Nidus inclui uma implementação in-memory:

- `Nidus.Module.Cache` → `TModuleCacheManager`

## Habilitar para módulos específicos

```pascal
uses
  Nidus,
  Nidus.Module.Cache,
  NFe.Module;

begin
  GetNidus.UseCache(TModuleCacheManager.Create, [TNFeModule]);
end.
```

## Habilitar para todos

```pascal
uses
  Nidus,
  Nidus.Module.Cache,
  Nidus.Module.Cache.Interfaces;

begin
  GetNidus.UseCache(TModuleCacheManager.Create, [TNidusCacheAll]);
end.
```

:::caution
Cache de módulo muda o lifecycle: o módulo passa a sobreviver a múltiplas requests. Só habilite se o módulo for seguro para reuso.
:::



