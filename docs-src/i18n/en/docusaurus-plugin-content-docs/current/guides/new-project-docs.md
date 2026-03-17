---
title: Novo Projeto na Documentação
sidebar_position: 50
---

# Novo Projeto na Documentação

## Objetivo

Adicionar um novo projeto no portal mantendo o mesmo padrão visual, estrutural e de navegação.

## Estrutura recomendada

Use o template pronto em `docs-src/docs/_templates/project-base/` e copie para `docs-src/docs/<projeto>/`:

```text
docs-src/docs/<projeto>/
  index.md
  introduction.md
  getting-started/
  architecture/
  reference/
  tests/
  troubleshooting/
```

## Passos

1. Copie `docs-src/docs/_templates/project-base/` para `docs-src/docs/<projeto>/`
2. Adicione o bloco do projeto na home em `docs-src/docs/intro.md`
3. Registre o projeto na sidebar em `docs-src/sidebars.ts`
4. Mantenha os mesmos padrões de título e seções
5. Rode build e valide links

## Recursos reutilizáveis já prontos

- Header dinâmico em `docs-src/static/js/navbar-dynamic.js`
- Branding desktop em `docs-src/static/img/tecsis-logo.svg`
- Branding mobile em `docs-src/static/img/tecsis-logo-mobile.svg`
- Favicon em `docs-src/static/img/tecsis-favicon.svg`
- Estilos globais em `docs-src/src/css/custom.css`

## Publicação

```bash
npm -C docs-src run build
```

Depois faça commit/push de `docs-src/` e `docs/`.
