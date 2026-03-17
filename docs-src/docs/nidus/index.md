---
displayed_sidebar: nidusSidebar
title: Nidus
---

Framework modular para Delphi, inspirado em padrões do NestJS: **módulos por rota**, **injeção de dependência**, **guards/pipes/middlewares** e integração com servidores HTTP (ex.: Horse).

![Fluxo do Nidus](/img/nidus/flow.png)

## Onde começar

- [Introdução](introduction.md)
- [Quickstart](getting-started/quickstart.md)
- [Arquitetura](architecture/overview.md)
- [Integração com Horse](guides/horse.md)
- [Cache de resposta (Horse)](guides/response-cache.md)
- [Pooling (recursos pesados)](guides/pooling.md)
- [API (referência)](reference/api.md)
- [Troubleshooting](troubleshooting/common-errors.md)

## Escopo

- Cobre: organização por módulos/rotas, DI e pipeline de request para aplicações Delphi.
- Não cobre: implementação de servidor HTTP (isso é do Horse/HTTP.sys/etc.); o Nidus pluga nesses ambientes via driver.

