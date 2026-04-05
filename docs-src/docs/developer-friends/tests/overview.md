---
displayed_sidebar: developerFriendsSidebar
title: Testes
---

## Estratégia

O projeto adota três níveis de teste:

- **Unitários:** validam lógica isolada (validadores BR, IDataSet, ViewModels)
- **Guardrail (Arquitetura):** impedem violações de contratos de camadas — **não podem ser desativados**
- **Integração:** validam fluxo completo entre repositório, ViewModel e UI

## Localização dos testes

| Diretório | O que testa |
|-----------|-------------|
| `apps/developer_friends_app/test/architecture/` | Guardrails arquiteturais do host app |
| `apps/developer_friends_app/test/core/services/` | Validadores BR (CPF, CNPJ, CEP, IE, placa, RENAVAM) |
| `apps/developer_friends_app/test/data/` | Repositórios e datasources |
| `apps/developer_friends_app/test/viewmodels/` | BaseViewModel, BaseListViewModel, BaseDetailViewModel |
| `packages/coreflow_form/test/` | FormStateController |
| `packages/coreflow_grid/test/` | GridController |
| `packages/coreflow_db/test/` | Contract tests do coreflow_db |
| `ERP-Axial/apps/erp_axial_app/test/architecture/` | Guardrails do axial_rest_client (ERP-Axial) |
| `ERP-Axial/packages/axial_rest_client/test/` | 9 testes unitários do cliente REST |

## Como rodar

```bash
# Todos os testes via Melos
melos test

# App host principal
cd apps/developer_friends_app && flutter test

# Package específico
cd packages/coreflow_form && flutter test

# axial_rest_client (ERP-Axial)
cd ERP-Axial/packages/axial_rest_client && dart test
```

## Guardrails obrigatórios

| Regra | Onde validado |
|-------|---------------|
| `workbench_shell` não importa `coreflow_*` | `developer_friends_app/test/architecture/` |
| `coreflow_flutter` não importa `coreflow_form` | `developer_friends_app/test/architecture/` |
| `axial_rest_client` não importa `coreflow_*` | `erp_axial_app/test/architecture/` |
| Host app importa apenas allowlist definido | `developer_friends_app/test/architecture/` |

Falha em qualquer guardrail = violação de contrato arquitetural.
