---
displayed_sidebar: erpAxialSidebar
title: Erros comuns
---

## 1 — App abre com tela vazia / aba cinza

- **Sintoma:** Workbench carrega mas nenhuma rotina aparece no menu lateral.
- **Causa provável:** `app_composition.dart` falhou em compor menus porque um package `axial_*_module` ou rotina legada em `lib/modules/` não resolveu dependência.
- **Ação:** rode `flutter pub get` em `ERP-Axial/apps/erp_axial_app` e em cada package listado em `pubspec.yaml` (path deps). Depois `flutter clean` seguido de `flutter run`.

## 2 — NF (E23/E29) retorna erro de rede mesmo sem backend

- **Sintoma:** Ao abrir NF Entrada ou Saída e clicar em Gravar, aparece erro de conexão.
- **Causa provável:** `--dart-define=BACKEND_URL=` foi passado com valor não-vazio apontando para um host inacessível.
- **Ação:** remover o `--dart-define=BACKEND_URL` (ou setar string vazia) — o app volta ao modo mock em memória. Confira que o valor inclui protocolo (`https://`).

## 3 — `flutter analyze` reporta 3000+ issues

- **Sintoma:** Após clonar o repo e rodar `flutter analyze`, milhares de erros aparecem.
- **Causa provável:** `flutter pub get` não foi executado em todos os packages do workspace. Sem `.dart_tool/` em cada package, os imports não resolvem.
- **Ação:** rode `flutter pub get` a partir da raiz do monorepo **e** em cada package citado no `pubspec.yaml` do host (ex.: `ERP-Axial/packages/axial_cor_module`, `ERP-Axial/packages/axial_mar_module`, etc.). O projeto usa **Melos** como workspace; `melos bootstrap` na raiz resolve todos de uma vez se você tiver o Melos instalado.

## 4 — Menu de Marcas abre com "Rotina em desenvolvimento"

- **Sintoma:** Ao clicar em **Cadastros → Marcas** o conteúdo mostra "Rotina em desenvolvimento".
- **Causa provável:** `app_composition.dart` não tem `case 'mar':` na função `getWorkbenchScreen`, ou o import do `axial_mar_module` foi removido.
- **Ação:** confira que `app_composition.dart` (a partir de **v1.5.16**) contém `import 'package:axial_mar_module/axial_mar_module.dart';` e o bloco `case 'mar': widget = MarListPage(api: MarRoutineApiImpl(repository: _marRepository));`.

## 5 — Sub-grids do Produto (E01) aparecem vazios após salvar

- **Sintoma:** Ao reabrir um produto depois de adicionar GTINs / Kits / ABC, as abas correspondentes parecem vazias.
- **Causa provável:** PK do produto (`E01_PRODUTO`) estava vazia ao gravar, ou o produto foi criado mas não persistido no mock antes de editar sub-grids (o mock exige o produto existir para vincular as listas filhas).
- **Ação:** grave o cabeçalho do produto primeiro na lista (Incluir → Aplicar) e só depois edite as abas **GTINs / Kits / ABC / Variações**.

## 6 — Erros de layout / scroll na resolução 800×600 ou menor

- **Sintoma:** Botões sobrepostos, grids cortados.
- **Causa provável:** o app é desenhado para **1024×768 ou maior**. Resoluções menores estão fora do contrato de UX.
- **Ação:** redimensione a janela ou suba a resolução do display. Em web, aumente o zoom do navegador (`Ctrl + -`) para compensar.

<!-- TODO: adicionar cenários específicos de E23/E29 (chave NF-e inválida, CFOP ausente) quando a equipa confirmar o contrato REST. -->
