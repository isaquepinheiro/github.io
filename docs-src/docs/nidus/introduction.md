---
displayed_sidebar: nidusSidebar
title: Introdução
---

O Nidus organiza aplicações Delphi por **escopo**, não por camada (MVC). Na prática, cada recurso (ex.: NFe, Auth, Produtos) ganha um módulo, e o runtime do Nidus resolve **dependências** e **ciclo de vida** conforme a rota.

## Conceitos

- **Módulo (`TModule`)**: unidade de composição. Declara rotas e binds (injeção de dependência).
- **Rota (`TRouteAbstract`)**: descreve o caminho e o módulo que responde aquele path.
- **Binds/DI**: registro e resolução de classes/interfaces por tag.
- **Middlewares / Guards / Pipes**: pontos de extensão para validação, autorização e transformações.

## Por que usar

- Separação por escopo (menos conflito entre times/funcionalidades)
- Testabilidade (módulos isolados)
- Escalabilidade de arquitetura (rotas e DI não viram globais)


