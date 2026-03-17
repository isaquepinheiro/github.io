---
displayed_sidebar: nidusSidebar
title: Nidus
---

Framework modular para Delphi, inspirado em padrões do NestJS: **módulos por rota**, **injeção de dependency**, **guards/pipes/middlewares** e integração com servidores HTTP (ex.: Horse).

![Flow do Nidus](/img/nidus/flow.png)

## Getting Started

- [Introduction](introduction.md)
- [Installation](getting-started/installation.md)
- [Quickstart](getting-started/quickstart.md)
- [Architecture](architecture/overview.md)
- [Integração com Horse](guides/horse.md)
- [Cache de resposta (Horse)](guides/response-cache.md)
- [Pooling (recursos pesados)](guides/pooling.md)
- [API (referência)](reference/api.md)
- [Troubleshooting](troubleshooting/common-errors.md)

## Scope

- Covers: organização por módulos/rotas, DI e pipeline de request para aplicações Delphi.
- Does not cover: implementação de servidor HTTP (isso é do Horse/HTTP.sys/etc.); o Nidus pluga nesses ambientes via driver.


