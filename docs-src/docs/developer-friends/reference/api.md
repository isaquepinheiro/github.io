---
displayed_sidebar: developerFriendsSidebar
title: Referência da API
---

## IDataSet

Interface central em `packages/coreflow/lib/src/contracts/`.

| Método / Propriedade | Tipo | Descrição |
|----------------------|------|-----------|
| `state` | `DataSetState` | Estado atual: `Browse`, `Edit`, `Insert`, `Saving`, `Closed` |
| `currentRecord` | `Map<String, dynamic>?` | Registro posicionado |
| `records` | `List<Map<String, dynamic>>` | Todos os registros carregados |
| `isFieldModified(field)` | `bool` | Detecta se campo foi alterado (delta) |
| `open()` | `Future<void>` | Carrega dados da fonte |
| `edit()` / `insert()` | `void` | Muda estado para Edit/Insert |
| `post()` | `Future<void>` | Valida e persiste registro |
| `cancel()` / `delete()` | `void / Future` | Descarta alterações / Remove registro |
| `first()`, `prior()`, `next()`, `last()` | `void` | Navegação entre registros |

## FieldMetadata

Em `packages/coreflow/lib/src/metadata/field_metadata.dart`.

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `name` | `String` | Nome interno (chave no Map de dados) |
| `label` | `String` | Rótulo exibido na UI |
| `required` | `bool` | Campo obrigatório |
| `maxLength` | `int?` | Tamanho máximo |
| `defaultValue` | `dynamic` | Valor padrão no `OnNewRecord` |
| `readOnly` | `bool` | Somente leitura |
| `mask` | `String?` | Máscara de formatação |
| `validators` | `List<FieldValidator>` | Validadores customizados |
| `lookup` | `LookupConfig?` | Configuração de seletor |

## RoutinePermissions

Em `packages/coreflow_permissions/`.

```dart
RoutinePermissions.admin()    // acesso total
RoutinePermissions.operator() // insert, edit, delete, print
RoutinePermissions.viewer()   // somente leitura
```

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `canView / canInsert / canEdit / canDelete / canPrint` | `bool` | Permissões de ação |
| `hiddenFields` | `List<String>` | Campos ocultos para o perfil |
| `readOnlyFields` | `List<String>` | Campos somente leitura |
| `insertDeniedFields` | `List<String>` | Campos bloqueados na inserção |

## axial_rest_client — IRestClient

Package Dart puro em `ERP-Axial/packages/axial_rest_client/`.

```dart
Future<RestResponse> get(String path, {Map<String, String>? queryParams, Map<String, String>? headers});
Future<RestResponse> post(String path, {required Map<String, dynamic> body, Map<String, String>? headers});
Future<RestResponse> put(String path, {required Map<String, dynamic> body, Map<String, String>? headers});
Future<RestResponse> delete(String path, {Map<String, String>? headers});
Future<RestResponse> patch(String path, {Map<String, dynamic>? body, Map<String, String>? headers});
```

**RestError (sealed):** `NetworkError` | `TimeoutError` | `HttpError` | `ParseError`

## Contratos arquiteturais

- `workbench_shell` não pode importar nenhum `coreflow_*` — integração exclusivamente via `app_composition.dart`
- `coreflow_flutter` não importa `coreflow_form` (layering unidirecional)
- `axial_rest_client` não pode importar `coreflow_*`, `workbench_shell` ou Flutter SDK
- Guardrail tests em `test/architecture/` validam essas regras automaticamente a cada CI
