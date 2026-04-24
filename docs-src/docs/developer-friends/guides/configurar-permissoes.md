---
displayed_sidebar: developerFriendsSidebar
title: Configurando Permissões
---

O Framework Axial oferece permissões granulares em 3 camadas (UI, ViewModel e Data). Este guia explica como configurar perfis de permissão, restringir ações e controlar visibilidade de campos.

## Perfis built-in

O framework vem com três perfis prontos:

| Perfil | Ações permitidas | Campos |
|--------|-----------------|--------|
| `admin` | Todas (`view`, `insert`, `edit`, `delete`, `print`, `options`, `reports`) | Todos visíveis e editáveis |
| `operator` | `view`, `insert`, `edit`, `delete`, `print` | Todos visíveis e editáveis |
| `viewer` | Apenas `view` | Todos visíveis, nenhum editável |

```dart
import 'package:coreflow_permissions/coreflow_permissions.dart';

RoutinePermissions.admin()    // acesso total
RoutinePermissions.operator() // operações padrão
RoutinePermissions.viewer()   // somente leitura
```

## Criando um perfil customizado

Para perfis com restrições específicas, crie uma instância de `RoutinePermissions` diretamente:

```dart
final permissoesGerente = RoutinePermissions(
  canView: true,
  canInsert: true,
  canEdit: true,
  canDelete: false,       // gerente não pode excluir
  canPrint: true,
  canAccessReports: true,
  canAccessOptions: false,
  hiddenFields: ['margem_lucro', 'custo_interno'],   // campos ocultos
  readOnlyFields: ['codigo'],                         // somente leitura
  insertDeniedFields: ['desconto_especial'],          // bloqueado na inserção
);
```

### Propriedades disponíveis

**Ações:**

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `canView` | `bool` | Permite abrir e visualizar a rotina |
| `canInsert` | `bool` | Permite inserir registros |
| `canEdit` | `bool` | Permite editar registros existentes |
| `canDelete` | `bool` | Permite excluir registros |
| `canPrint` | `bool` | Permite imprimir/exportar |
| `canAccessOptions` | `bool` | Acesso ao menu de opções da rotina |
| `canAccessReports` | `bool` | Acesso à tela de relatórios |
| `canUseShortcuts` | `bool` | Habilita atalhos de teclado |

**Granularidade de campos:**

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `hiddenFields` | `List<String>` | Campos não visíveis para o perfil |
| `readOnlyFields` | `List<String>` | Campos visíveis mas não editáveis |
| `insertDeniedFields` | `List<String>` | Campos bloqueados somente na inserção |

## Resolvendo permissões por perfil de usuário

O `RoutinePermissionsResolver` mapeia perfis de usuário para `RoutinePermissions` por contexto de rotina:

```dart
// Em app_composition.dart
final resolver = InMemoryPermissionsResolver({
  'clientes_permissions': {
    'admin': RoutinePermissions.admin(),
    'operator': RoutinePermissions.operator(),
    'viewer': RoutinePermissions.viewer(),
    'gerente': permissoesGerente,
  },
});

// Resolver as permissões para o usuário ativo
final permissions = resolver.resolve(
  permissionsContext: 'clientes_permissions',
  userProfile: 'gerente',
  tenantId: 'default',
  userId: 'user_001',
);
```

## Administração de permissões pela UI

O app oferece uma tela de administração de permissões acessível em `/permissions-admin` ou pelo botão no topo do WorkbenchShell.

Funcionalidades disponíveis:
- Editar matriz de permissões por perfil e contexto de rotina
- Configurar regras de campo (`not view`, `not edit`, `not insert`)
- Criar perfis com herança de perfil base
- Vincular usuário a um perfil

```powershell
# Acessar via rota direta
flutter run -d chrome --dart-define=APP_INITIAL_ROUTE=/permissions-admin
```

## Testando diferentes perfis

Use o `dart-define` para simular perfis sem alterar código:

```powershell
# Perfil administrador
flutter run --dart-define=APP_PERMISSION_PROFILE=admin

# Perfil operador
flutter run --dart-define=APP_PERMISSION_PROFILE=operator

# Perfil somente leitura
flutter run --dart-define=APP_PERMISSION_PROFILE=viewer

# Por tenant + usuário (sem perfil explícito — resolve via diretório)
flutter run -d edge `
  --dart-define=APP_TENANT_ID=default `
  --dart-define=APP_USER_ID=viewer_user `
  --dart-define=APP_RULESET_VERSION=v2
```

## Como o enforcement funciona nas 3 camadas

| Camada | Mecanismo | Comportamento quando negado |
|--------|-----------|----------------------------|
| **UI** | `permission_denied_ui` | Botão/campo bloqueado visualmente antes da ação |
| **ViewModel** | `permission_guard` | `PermissionDeniedException` + log em `AppTelemetry` |
| **Data** | `repository_guard` | Retorna falha HTTP 403/422 ou lança exceção |

Cada camada age de forma independente. Um usuário que bypasse a UI ainda será bloqueado na camada de dados.

## Verificando negações de permissão

O `AppTelemetry` registra todos os eventos de negação. Cada evento contém:

| Campo | Descrição |
|-------|-----------|
| `action` | Ação auditada: `view`, `insert`, `edit`, `delete`, `options`, `reports` |
| `source` | `permission_guard` (local) ou `repository_guard` (data) |
| `permission_denied_ui` | Bloqueio aplicado na interface |

Consulte os logs do `AppTelemetry` para diagnóstico de acessos negados inesperadamente.
