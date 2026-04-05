---
displayed_sidebar: developerFriendsSidebar
title: Erros Comuns
---

## Guardrail falha: "workbench_shell importa coreflow_*"

- **Sintoma:** Teste em `test/architecture/` falha com violação de import
- **Causa:** Arquivo em `workbench_shell` adicionou import de `coreflow_*`
- **Ação:** Remover o import. A integração com o framework é exclusivamente via `app_composition.dart`. Esta decisão é permanente.

## `coreflow_flutter` não reconhece tipos de `coreflow_form`

- **Sintoma:** Erro de compilação ao usar tipos de `coreflow_form` dentro de `coreflow_flutter`
- **Causa:** Violação do layering intencional — `coreflow_flutter` não pode importar `coreflow_form`
- **Ação:** Importar `coreflow_form` diretamente no app host, não via `coreflow_flutter`.

## `flutter run` falha com "package not found"

- **Sintoma:** Package local não encontrado ao rodar o app
- **Causa:** `melos bootstrap` não foi executado ou foi executado fora da raiz
- **Ação:** Executar `melos bootstrap` na raiz do repositório.

## `Post()` não avança — campos obrigatórios

- **Sintoma:** Chamada a `post()` não persiste; UI marca campos com erro
- **Causa:** Campo(s) com `required: true` estão vazios
- **Ação:** Preencher todos os campos obrigatórios. Verificar `FieldMetadata` da rotina.

## Permissão negada inesperada

- **Sintoma:** Ação bloqueada ou `PermissionDeniedException`
- **Causa:** Perfil ativo (`viewer`, `operator`) não inclui a ação solicitada
- **Ação:** Testar com `--dart-define=APP_PERMISSION_PROFILE=admin`. Revisar `RoutinePermissions` em `app_composition.dart`.

## WorkbenchShell não abre aba ao clicar no menu

- **Sintoma:** Click no menu não produz nova aba
- **Causa:** `routineId` não registrado em `app_composition.dart`
- **Ação:** Adicionar mapeamento `routineId → Widget` em `lib/app_composition.dart`.

## `melos test` falha no guardrail do ERP-Axial (caminho relativo)

- **Sintoma:** `axial_rest_client_guardrail_test.dart` falha via `melos test` do workspace raiz
- **Causa:** Caveat registrado em issue #157 — caminho relativo no guardrail test
- **Ação:** Rodar diretamente: `cd ERP-Axial/apps/erp_axial_app && flutter test test/architecture/`
