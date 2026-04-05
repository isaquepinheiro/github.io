---
displayed_sidebar: developerFriendsSidebar
title: Visão Geral da Arquitetura
---

## Contexto

O Framework Axial é um monorepo gerenciado pelo Melos com 11 packages locais e apps host. O framework fornece contratos de dados, UI e permissões que qualquer app ERP pode consumir sem reimplementar infraestrutura.

## Packages principais

| Package | Camada | Função |
|---------|--------|--------|
| `coreflow` | Core | `IDataSet`, `FieldMetadata`, adapters, queries, records |
| `coreflow_flutter` | UI Base | `BaseListPage`, `BaseFormPage`, `BaseDetailPage`, `BasePageScaffold` |
| `coreflow_form` | Formulários | Gestão de estado, validações, campos TField |
| `coreflow_permissions` | Permissões | `RoutinePermissions`, modelos de autorização |
| `coreflow_data` | Dados | `InMemoryDataSet`, adapters e mocks |
| `workbench_shell` | Shell | Desktop shell multi-abas (taskbar, menu, ViewModel) |

## Regra de layering

```
workbench_shell          ← desacoplado de todos os coreflow_*
coreflow_form → coreflow_flutter → coreflow
coreflow_data → coreflow
coreflow_permissions → coreflow
```

`coreflow_flutter` **não importa** `coreflow_form`. A integração entre `workbench_shell` e os contratos é feita exclusivamente via `app_composition.dart`.

## Sistema de permissões em 3 camadas

| Camada | Mecanismo | Efeito |
|--------|-----------|--------|
| UI | `permission_denied_ui` | Bloqueia visualmente antes da ação |
| ViewModel | `permission_guard` | Verifica permissão + registra telemetria |
| Data | `repository_guard` | Retorna HTTP 403/422 ou lança exceção |

## Extensibilidade

- **Novos repositórios:** implementar `IDataSet` para qualquer fonte (REST, SQLite, mock)
- **Novas rotinas:** definir `FieldMetadata` + herdar `BaseListPage`/`BaseFormPage`
- **Script de geração:** `scripts/new-coreflow-routine.ps1` com perfis `legacy`, `generic` ou `remote`
