---
displayed_sidebar: developerFriendsSidebar
title: Fluxo em Tempo de Execução
---

## Fluxo principal de dados

```
UI (BaseListPage / BaseFormPage)
  ↓
ViewModel (BaseListViewModel / BaseDetailViewModel)
  ↓
AuthorizingRecordsRepository
  ↓
DataSetAdapterRecords
  ↓
InMemoryDataSet / RemoteDataSet
```

## Ciclo de vida do IDataSet

1. **`Open()`** — carrega dados; dispara `BeforeOpen` → `AfterOpen`
2. **`Edit()`** — estado `Edit`; habilita edição de campos
3. **`Insert()`** — estado `Insert`; dispara `OnNewRecord` para valores padrão
4. **`Post()`** — valida campos obrigatórios; `BeforePost` → persiste deltas → `AfterPost`
5. **`Cancel()`** — descarta alterações; retorna para `Browse`
6. **`Delete()`** — remove registro; atualiza posição do cursor
7. **`Close()`** — libera recursos; estado `Closed`

## Navegação no WorkbenchShell

1. Usuário clica no menu → shell recebe `routineId`
2. Shell consulta `app_composition.dart` para resolver `routineId → Widget`
3. Widget instanciado como nova aba no `TabBar`
4. Aba permanece em memória enquanto aberta

## Pontos de falha

- **Campo obrigatório vazio:** `Post()` interrompido; campo marcado na UI
- **Permissão negada (UI):** botão bloqueado visualmente antes da ação
- **Permissão negada (ViewModel):** `PermissionDeniedException` + registro em `AppTelemetry`
- **Permissão negada (Data):** `AuthorizingRecordsRepository` retorna `Failure` HTTP 403/422
- **Erro de rede:** `RemoteDataSet` propaga `NetworkFailureException`
