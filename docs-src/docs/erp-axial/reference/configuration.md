---
displayed_sidebar: erpAxialSidebar
title: Configuração
---

Todas as configurações do ERP-Axial no momento da execução são passadas via **`--dart-define`** (chaves de compilação do Flutter). Não há arquivo `.env` nem config em runtime.

## Variáveis `--dart-define`

| Variável | Default | Descrição |
|----------|---------|-----------|
| `BACKEND_URL` | *(vazio)* | URL base do backend REST. Com valor vazio, E23/E29 (notas fiscais) usam **apenas o mock em memória** — nenhuma chamada de rede acontece. Com valor preenchido, o app envia `POST` / `GET` ao backend informado. |
| `APP_TENANT_ID` | `default` | Enviado como header `X-Tenant-Id` em toda chamada REST de E23/E29. |
| `APP_USER_ID` | *(vazio)* | Enviado como header `X-User-Id` em toda chamada REST. Útil para auditoria server-side. |
| `APP_PERMISSION_PROFILE` | *(TODO: confirmar default)* | Perfil aplicado às rotinas do host. <!-- TODO: confirmar valores aceitos para erp_axial_app — developer_friends_app aceita admin/operator/viewer; não verifiquei se erp_axial_app usa o mesmo conjunto. --> |
| `APP_INITIAL_ROUTE` | *(vazio)* | Rota inicial aberta automaticamente no Workbench ao iniciar. |

## Exemplos de invocação

### Rodar em modo mock (sem backend)

```bash
cd ERP-Axial/apps/erp_axial_app
flutter run -d windows --no-pub
```

### Rodar apontando para backend REST

```bash
flutter run -d windows --no-pub \
  --dart-define=BACKEND_URL=https://seu-servidor.exemplo \
  --dart-define=APP_TENANT_ID=empresa-xyz \
  --dart-define=APP_USER_ID=operador-123
```

### Rodar web com rota inicial definida

```bash
flutter run -d chrome --web-port 8098 --no-pub \
  --dart-define=APP_INITIAL_ROUTE=/base
```

## Perfis de permissão

Cada rotina consome um conjunto de permissões do tipo `RoutinePermissions`:

| Permissão | Efeito na UI |
|-----------|--------------|
| `canView` | Abrir a rotina (sem isso, o menu bloqueia) |
| `canInsert` | Botão de novo registro habilitado |
| `canEdit` | Edição inline ou modal habilitada |
| `canDelete` | Ação de exclusão habilitada |
| `canPrint` | Relatórios/impressões habilitados |
| `canAccessOptions` | Menu "Opções" da rotina visível |
| `canAccessReports` | Menu "Relatórios" da rotina visível |
| `canUseShortcuts` | Atalhos de teclado F2/F11/F12 respondem |

Nos packages `axial_*_module` (ex.: `axial_cor_module`, `axial_mar_module`), a fachada `I<X>RoutineApi` retorna um `permissions` default totalmente liberado. Para aplicar restrições, o **host** injeta permissões customizadas via construtor da implementação.

## Backend REST — esquema esperado

Quando `BACKEND_URL` está definido, as rotinas E23 (NF Entrada) e E29 (NF Saída) passam a usar `HttpRestClient` do package `axial_rest_client`.

Caminhos esperados pelo cliente:

<!-- TODO: confirmar paths REST finais com o backend. O atual app_composition.dart deriva do IRestClient configurado com baseUrl + tenant + user. Documentar aqui quando o contrato estiver fechado. -->

## Rotinas e seus `routineId`

| `routineId` | Rotina | Módulo |
|---|---|---|
| `ncm` | NCM (Nomenclatura Comum do Mercosul) | Fiscal |
| `ipi` | IPI (alíquotas) | Fiscal |
| `mva` | MVA (27 UFs × 2 colunas) | Fiscal |
| `e06` | Hierarquia de classificação (6 níveis) | Fiscal |
| `trb` | Tributação | Fiscal |
| `e23` | NF Entrada | Fiscal |
| `e29` | NF Saída | Fiscal |
| `mar` | Marcas | Cadastros |
| `tam` | Tamanhos | Cadastros |
| `cor` | Cores | Cadastros |
| `bcr` | BCR (redução BC ICMS) | Cadastros |
| `r01` | Clientes | Cadastros |
| `p01` | Fornecedores | Cadastros |
| `e01` | Produtos (com sub-grids GTINs, Kits, ABC, Variações) | Cadastros |
