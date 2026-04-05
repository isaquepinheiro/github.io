---
displayed_sidebar: developerFriendsSidebar
title: Quickstart
---

## Pré-requisitos

- Flutter SDK >= 3.x / Dart SDK >= 3.x
- [Melos](https://melos.invertase.dev/) instalado globalmente: `dart pub global activate melos`
- Windows 10+ ou Chrome

## Bootstrap do workspace

```bash
git clone https://github.com/isaquepinheiro/developer_friends.git
cd developer_friends
melos bootstrap
```

## Rodando o app principal

```bash
# Windows (nativo) — melhor performance para desenvolvimento
cd apps/developer_friends_app
flutter run -d windows --no-pub

# Web (Chrome) — porta fixa
cd apps/developer_friends_app
flutter run -d chrome --web-port 8098 --web-hostname localhost --no-pub --release
```

Ou via script PowerShell na raiz:

```powershell
./scripts/run-app.ps1
```

## Exemplo mínimo — nova rotina ERP

O framework reduz a criação de uma rotina a 4 etapas:

**1. Metadados:**

```dart
final minhaConfig = BaseRoutineConfig(
  routineId: 'minha_rotina',
  title: 'Minha Rotina',
  fields: [
    FieldMetadata(name: 'nome', label: 'Nome', required: true, maxLength: 100),
    FieldMetadata(name: 'codigo', label: 'Código', maxLength: 20),
  ],
);
```

**2. Repositório:**

```dart
final meuRepository = InMemoryDataSetRepository(config: minhaConfig);
```

**3. Tela base:**

```dart
class MinhaRotinaPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BaseListPage(
      config: minhaConfig,
      repository: meuRepository,
      permissions: RoutinePermissions.admin(),
    );
  }
}
```

**4. Registro no AppComposition:**

```dart
// lib/app_composition.dart
final routineMap = {
  'minha_rotina': (context) => MinhaRotinaPage(),
};
```

## Perfis de permissão

```bash
flutter run --dart-define=APP_PERMISSION_PROFILE=admin     # acesso total
flutter run --dart-define=APP_PERMISSION_PROFILE=operator  # insert/edit/delete/print
flutter run --dart-define=APP_PERMISSION_PROFILE=viewer    # somente leitura
```

## Próximos passos

- [Arquitetura](../architecture/overview.md)
- [Referência da API](../reference/api.md)
