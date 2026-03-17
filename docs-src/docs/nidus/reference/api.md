---
displayed_sidebar: nidusSidebar
title: API (Referência)
---

## Bootstrap

- `GetNidus.Start(AModule)`

## Cache de módulo

- `GetNidus.UseCache(ACache)`
- `GetNidus.UseCache(ACache, [TAlgumModulo, ...])`

Implementação padrão disponível em `Nidus.Module.Cache`.

## Pools

- `GetNidus.UsePools<T>(MaxSize)`
- `GetNidus.UsePools<T: TComponent>(MaxSize, Owner, Reset)`
- `GetNidus.WithPool<T>(Proc)`

## Driver Horse

- `THorse.Use(Nidus_Horse(TAppModule.Create))`
- `THorse.Use(ResponseCache([rotas], Ttl, Max, VaryAuth))`


