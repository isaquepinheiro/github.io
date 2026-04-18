---
displayed_sidebar: erpAxialSidebar
title: Introdução
---

## Objetivo

O **ERP-Axial** é um host Flutter que consome o framework **Coreflow / Axial** (packages `coreflow_*` e `axial_*_module`) para entregar um ERP cross-platform multi-abas. Ele substitui rotinas do ERP Delphi legado por equivalentes modernos sem perder o padrão de navegação "workbench" (menu lateral + abas + taskbar) familiar ao usuário.

## Público-alvo

- **Operador de ERP** — quer abrir cadastros (produtos, clientes, fornecedores, NF) e executar CRUD padrão.
- **Analista fiscal** — quer emitir e consultar notas fiscais de entrada (E23) e saída (E29) com lookups consistentes.
- **Administrador de sistema** — quer controlar qual perfil de permissão cada operador vê.

## Conceitos principais

- **Rotina** — cada cadastro do ERP (NCM, MAR, TAM, COR, IPI, BCR, MVA, E06, TRB, R01 Clientes, P01 Fornecedores, E01 Produtos, E23 NF Entrada, E29 NF Saída). Cada rotina tem um `routineId`, vive em um package `axial_*_module` ou ainda em `lib/modules/` (quando sendo migrada) e é aberta pelo menu do Workbench.
- **Workbench Shell** — a janela principal com menu lateral, sistema de abas e taskbar. Cada rotina aberta vira uma aba; o usuário alterna entre abas sem perder estado.
- **Perfil de permissão** — conjunto de ações (`canView`, `canInsert`, `canEdit`, `canDelete`, `canPrint`, etc.) aplicado na rotina. Definido no start do app via `--dart-define=APP_PERMISSION_PROFILE=...`.
- **Backend REST (opcional)** — rotinas fiscais (E23 / E29) podem integrar com um backend real via `--dart-define=BACKEND_URL=...`. Sem essa variável, o app roda 100% em mock de memória.
- **Tenant / User ID** — identificadores propagados ao backend como headers `X-Tenant-Id` e `X-User-Id` (configuráveis via `--dart-define`).

## Rotinas disponíveis no menu

| Módulo | Rotinas |
|---|---|
| **Fiscal** | NCM, IPI, MVA, E06 (hierarquia), TRB (tributação), E23 (NF Entrada), E29 (NF Saída) |
| **Cadastros** | Marcas (MAR), Tamanhos (TAM), Cores (COR), Clientes (R01), Fornecedores (P01), Produtos (E01), BCR |

<!-- TODO: confirmar com o product owner a lista final de rotinas publicadas para usuário final; a tabela acima reflete o app_composition.dart deste release (v1.5.16). -->
