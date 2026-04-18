---
displayed_sidebar: erpAxialSidebar
title: Quickstart
---

Esta página leva você do repositório limpo até o ERP-Axial rodando na sua máquina em **menos de 5 minutos**.

## Pré-requisitos

- **Flutter SDK** com canal estável (Dart `^3.11.0`).
- **Git** para clonar o monorepo.
- Sistema operacional: Windows 10/11 (nativo) ou Chrome recente (web).
- **Resolução-alvo:** 1024×768 ou maior — o layout é otimizado para desktop.

## Passo 1 — Clonar e instalar dependências

```bash
git clone https://github.com/isaquepinheiro/developer_friends.git
cd developer_friends/ERP-Axial/apps/erp_axial_app
flutter pub get
```

## Passo 2 — Rodar no Windows (recomendado para desenvolvimento)

```bash
flutter run -d windows --no-pub
```

## Passo 2 (alternativo) — Rodar no Chrome

```bash
flutter run -d chrome --web-port 8098 --web-hostname localhost --no-pub --release
```

A porta `8098` é a convenção do projeto para automação e RAG — pode trocar livremente.

## Passo 3 — Primeiro uso

Ao abrir, o app monta o **Workbench Shell** com menu lateral vazio de abas. Clique em **Cadastros → Marcas** para ver o CRUD mais simples — duas linhas pré-populadas (`001 Genérico`, `002 Importado`). Use o menu para testar outras rotinas.

## Próximos passos

- [Configuração](../reference/configuration.md) — perfis de permissão, backend REST, tenant/user ID
- [Erros comuns](../troubleshooting/common-errors.md) — o que fazer quando o app não abre
