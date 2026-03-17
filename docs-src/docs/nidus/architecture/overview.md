---
displayed_sidebar: nidusSidebar
title: Visão Geral
---

## Contexto

O Nidus é um framework de arquitetura, não um servidor HTTP. Ele organiza módulos, rotas e DI; o servidor HTTP (ex.: Horse) entrega a requisição e recebe a resposta.

## Componentes principais

- `TNidus`: API principal (bootstrap, cache de módulos, pools).
- `TModule`: define rotas e binds.
- Providers: resolvem instâncias e ciclo de vida (módulos por rota, cache de módulo quando habilitado).
- Drivers: integração com runtime externo (Horse).

## Extensibilidade

- Guards/pipes/middlewares por rota
- Route handlers
- Pool de objetos pesados para recursos reutilizáveis


