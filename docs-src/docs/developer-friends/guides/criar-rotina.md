---
displayed_sidebar: developerFriendsSidebar
title: Criando uma Nova Rotina ERP
---

Este guia mostra como adicionar uma nova rotina (tela de lista + formulário + permissões) ao Framework Axial usando o gerador de rotinas e o registro manual no host app.

## Usando o gerador de rotinas

O script `new-coreflow-routine.ps1` gera o esqueleto completo de uma nova rotina. Execute na raiz do repositório:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\new-coreflow-routine.ps1 `
  -Name "Cadastro de Clientes" `
  -Profile generic
```

### Parâmetros disponíveis

| Parâmetro | Obrigatório | Descrição |
|-----------|-------------|-----------|
| `-Name` | Sim | Nome de exibição da rotina |
| `-Slug` | Não | Identificador único em `snake_case` (derivado do nome se omitido) |
| `-Profile` | Não | `legacy` \| `generic` \| `remote` (padrão: `legacy`) |
| `-Route` | Não | Rota inicial da rotina (ex: `/clientes`) |
| `-Force` | Não | Sobrescreve arquivos existentes |

### Perfis de geração

| Perfil | Quando usar | Campos gerados |
|--------|-------------|----------------|
| `legacy` | Migração de rotina Delphi | `codigo`, `descricao`, `grupo` |
| `generic` | Nova rotina genérica com mock | `id`, `nome`, `categoria` |
| `remote` | Integração com API REST | `id`, `nome`, `email`, `categoria` |

### Arquivos gerados

```
apps/developer_friends_app/lib/
  sandbox/
    config/<slug>_routine_config.dart          ← metadados e FieldMetadata
    data/datasources/<slug>_records_mock_datasource.dart  ← mock de dados
architecture/generated/
  <slug>_routine_setup.md                      ← snippets de registro
```

O arquivo `.md` gerado contém os snippets prontos para os passos seguintes.

## Registrando a rotina manualmente

Se preferir criar uma rotina sem o gerador, siga os 4 passos abaixo.

### Passo 1 — Definir metadados

Crie o arquivo de configuração em `apps/developer_friends_app/lib/sandbox/config/`:

```dart
import 'package:coreflow/coreflow.dart';

final clientesConfig = BaseRoutineConfig(
  routineId: 'clientes',
  title: 'Cadastro de Clientes',
  fields: [
    FieldMetadata(name: 'nome', label: 'Nome', required: true, maxLength: 100),
    FieldMetadata(name: 'email', label: 'E-mail', maxLength: 150),
    FieldMetadata(name: 'ativo', label: 'Ativo', defaultValue: true),
  ],
);
```

### Passo 2 — Configurar o repositório

Para dados em memória (desenvolvimento/mock):

```dart
import 'package:coreflow_data/coreflow_data.dart';

final clientesRepository = InMemoryDataSetRepository(config: clientesConfig);
```

Para dados via API REST:

```dart
import 'package:coreflow_rest/coreflow_rest.dart';

final clientesRepository = RemoteDataSetRepository(
  config: clientesConfig,
  baseUrl: const String.fromEnvironment('APP_REMOTE_SAMPLE_BASE_URL'),
  resource: '/clientes',
);
```

### Passo 3 — Criar a página

```dart
import 'package:coreflow_flutter/coreflow_flutter.dart';
import 'package:coreflow_permissions/coreflow_permissions.dart';

class ClientesListPage extends StatelessWidget {
  final RoutinePermissions permissions;
  const ClientesListPage({super.key, required this.permissions});

  @override
  Widget build(BuildContext context) {
    return BaseListPage(
      config: clientesConfig,
      repository: clientesRepository,
      permissions: permissions,
    );
  }
}
```

### Passo 4 — Registrar no AppComposition

Abra `apps/developer_friends_app/lib/app_composition.dart` e adicione a rotina ao mapa de telas:

```dart
// Em AppComposition.getWorkbenchScreen
case 'clientes':
  return ClientesListPage(permissions: resolvedPermissions);
```

E ao mapa de menus para aparecer no WorkbenchShell:

```dart
// Em AppComposition.workbenchMenus
WorkbenchMenuItem(
  routineId: 'clientes',
  label: 'Clientes',
  icon: Icons.people_outline,
)
```

## Rodando a nova rotina

```powershell
# Abrir diretamente pela rota
flutter run -d chrome --dart-define=APP_INITIAL_ROUTE=/clientes

# Via script PowerShell
powershell -ExecutionPolicy Bypass -File .\scripts\run-app.ps1 -Target clientes -Platform web
```

## Verificando a rotina

1. Execute o app e abra a rotina no menu
2. Verifique se a lista carrega corretamente
3. Teste inserção, edição e exclusão de registros
4. Confirme que os campos obrigatórios são validados no `Post()`
5. Execute os testes guardrail: `cd apps/developer_friends_app && flutter test test/architecture/`
