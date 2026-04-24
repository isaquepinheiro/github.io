---
displayed_sidebar: developerFriendsSidebar
title: Referência de Configuração
---

Todas as variáveis `dart-define`, scripts PowerShell e opções de configuração do Framework Axial.

## Variáveis dart-define

Passadas em tempo de compilação via `--dart-define=NOME=valor`.

### Perfil e identidade

| Variável | Tipo | Padrão | Descrição |
|----------|------|--------|-----------|
| `APP_PERMISSION_PROFILE` | `string` | `''` (resolve por usuário) | Perfil de permissão ativo: `admin` \| `operator` \| `viewer` |
| `APP_USER_ID` | `string` | `'default_user'` | Identificador do usuário para resolução de perfil |
| `APP_TENANT_ID` | `string` | `'default'` | Identificador do tenant |
| `APP_RULESET_VERSION` | `string` | `'v1'` | Versão do ruleset de permissões |

Quando `APP_PERMISSION_PROFILE` é vazio, o app resolve o perfil pelo mapeamento `tenant + user` no `InMemoryUserProfileDirectory`. O fallback é `viewer`.

### Navegação

| Variável | Tipo | Padrão | Descrição |
|----------|------|--------|-----------|
| `APP_INITIAL_ROUTE` | `string` | `/` (workbench) | Rota aberta ao iniciar o app |

Rotas disponíveis:

| Rota | Descrição |
|------|-----------|
| `/` | WorkbenchShell (padrão) |
| `/base` | Rotina base (dados mock por padrão) |
| `/pilot` | Rotina piloto (requer `canView` para `pilot_permissions`) |
| `/permissions-admin` | Tela de administração de permissões |
| `/remote-sample` | Rotina com integração REST (requer `APP_REMOTE_SAMPLE_BASE_URL`) |

### Dados e modo de execução

| Variável | Tipo | Padrão | Descrição |
|----------|------|--------|-----------|
| `APP_BASE_DATA_MODE` | `string` | `'mock'` | Modo de dados da rotina base: `mock` \| `empty` |
| `APP_REMOTE_SAMPLE_BASE_URL` | `string` | `''` | URL base do backend para a rotina remota |
| `APP_REMOTE_SAMPLE_RESOURCE` | `string` | `'/remote-records'` | Endpoint de recursos da rotina remota |

## Scripts PowerShell

Execute todos os scripts a partir da **raiz do repositório**.

### `run-app.ps1`

Inicia o app com opções pré-configuradas por alvo e plataforma.

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run-app.ps1 `
  -Target <rotina> `
  -Platform <plataforma>
```

| Parâmetro | Valores | Descrição |
|-----------|---------|-----------|
| `-Target` | `base`, `pilot`, `remote` | Rotina inicial a abrir |
| `-Platform` | `web`, `windows` | Plataforma de destino |

Exemplos:

```powershell
# Base no Web com dados mock
.\scripts\run-app.ps1 -Target base -Platform web

# Pilot no Windows
.\scripts\run-app.ps1 -Target pilot -Platform windows

# Rotina remota no Web
.\scripts\run-app.ps1 -Target remote -Platform web
```

### `new-coreflow-routine.ps1`

Gera o esqueleto de uma nova rotina ERP.

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\new-coreflow-routine.ps1 `
  -Name "Nome da Rotina" `
  -Profile <perfil>
```

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `-Name` | `string` | Sim | Nome de exibição |
| `-Slug` | `string` | Não | Identificador `snake_case` |
| `-Profile` | `legacy` \| `generic` \| `remote` | Não (padrão: `legacy`) | Template de geração |
| `-Route` | `string` | Não | Rota inicial |
| `-Force` | `switch` | Não | Sobrescreve existentes |

### `run-remote-sample-backend.ps1`

Inicia o backend de exemplo Node.js/Express em `apps/remote_sample_backend/`.

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run-remote-sample-backend.ps1
```

O backend sobe na porta `3000` por padrão. Use junto com:

```powershell
flutter run -d chrome `
  --dart-define=APP_INITIAL_ROUTE=/remote-sample `
  --dart-define=APP_REMOTE_SAMPLE_BASE_URL=http://127.0.0.1:3000 `
  --dart-define=APP_REMOTE_SAMPLE_RESOURCE=/remote-records
```

## Opções de flutter run diretas

Para desenvolvimento sem os scripts:

```powershell
# Windows — melhor performance
cd apps/developer_friends_app
flutter run -d windows --no-pub

# Web (Chrome) — porta fixa para automação
cd apps/developer_friends_app
flutter run -d chrome --web-port 8098 --web-hostname localhost --no-pub --release

# Combinação com dart-defines
flutter run -d chrome `
  --dart-define=APP_INITIAL_ROUTE=/pilot `
  --dart-define=APP_PERMISSION_PROFILE=operator
```

## Configurações do workspace (melos.yaml)

O monorepo é gerenciado com [Melos](https://melos.invertase.dev/).

```bash
# Instalar Melos globalmente
dart pub global activate melos

# Sincronizar todos os packages
melos bootstrap

# Rodar todos os testes
melos test
```

## Requisitos mínimos

| Item | Versão |
|------|--------|
| Flutter SDK | >= 3.x |
| Dart SDK | >= 3.11.0 |
| Melos | Qualquer versão publicada |
| Windows | Windows 10+ (para target `windows`) |
| Chrome | Qualquer versão recente (para target `web`) |

## Plataformas suportadas

| Plataforma | Status | Resolução recomendada |
|------------|--------|-----------------------|
| Windows (nativo) | Suportada | 1024×768+ |
| Web (Chrome) | Suportada | 1024×768+ |
| Outras (Android, iOS, macOS, Linux) | Experimental | Não testado |
