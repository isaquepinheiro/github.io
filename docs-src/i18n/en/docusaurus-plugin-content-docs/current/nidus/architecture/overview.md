---
displayed_sidebar: nidusSidebar
title: Overview
---

## Contexto

Nidus is an architectural framework, not an HTTP server. It organizes modules, routes, and DI, while the HTTP server (e.g., Horse) receives the request and sends the response.

## Componentes principais

- `TNidus`: main API (bootstrap, module cache, pools).
- `TModule`: defines routes and binds.
- Providers: resolve instances and lifecycle (route-scoped modules, optional module cache).
- Drivers: integration with external runtime (Horse).

## Extensibilidade

- Route-scoped guards/pipes/middlewares
- Route handlers
- Pooling for expensive reusable resources





