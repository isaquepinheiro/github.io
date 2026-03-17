---
displayed_sidebar: nidusSidebar
title: Runtime Flow
---

## Fluxo (Horse → Nidus)

1. Horse recebe a request.
2. O middleware `Nidus_Horse(...)` cria um `IRouteRequest` e chama `GetNidus.LoadRouteModule(PathInfo, Request)`.
3. O Nidus seleciona a rota (`TRouteParse.SelectRoute`) e cria/resolve o módulo alvo (com cache opcional).
4. Horse executa o handler registrado para a rota (ex.: `THorse.Get('/ping', ...)`).
5. No `finally`, o middleware chama `GetNidus.DisposeRouteModule(PathInfo)`.

## Ciclo de vida

- Sem cache de módulo: o módulo é criado/descartado por request.
- Com cache de módulo: módulos selecionados podem ser reutilizados (ver `UseCache`).

:::tip
O Nidus não registra endpoints HTTP sozinho: ele prepara DI e ciclo de vida por rota. O endpoint (handler) é do Horse.
:::


