---
displayed_sidebar: developerFriendsSidebar
title: Developer Friends
---

Framework ERP Genérico Cross-Platform que transpõe os conceitos clássicos de produtividade do Delphi (TDataSet, FireDAC, DBComponents) para o ecossistema Flutter moderno, com interface Desktop multi-abas (WorkbenchShell) e automação por metadados.

## Onde começar

- [Introdução](introduction.md)
- [Quickstart](getting-started/quickstart.md)
- [Arquitetura](architecture/overview.md)
- [Referência da API](reference/api.md)
- [Testes](tests/overview.md)

## Projetos do ecossistema

| Projeto | Descrição |
|---------|-----------|
| **Framework Axial** | IDataSet, FieldMetadata, BasePages, RoutinePermissions, WorkbenchShell |
| **ERP-Axial** | App host Flutter para migração do ERP Delphi (v1.4.0 — SL-01) |
| **axial_rest_client** | Package Dart puro para integração REST desacoplada (v1.4.0 — SL-02) |

## Escopo

- **Cobre:** contratos de dados (IDataSet), metadados de campo (FieldMetadata), telas base genéricas, permissões granulares em 3 camadas, WorkbenchShell multi-abas, geração de rotinas por script
- **Não cobre:** lógica de negócio específica de domínio ERP, backends externos, autenticação OAuth, deploys em nuvem
