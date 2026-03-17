---
title: Add a New Project
sidebar_position: 50
---

# Add a New Project

## Goal

Add a new project to the portal while keeping the same visual, structural, and navigation standards.

## Recommended structure

Use the ready template in `docs-src/docs/_templates/project-base/` and copy it to `docs-src/docs/<project>/`:

```text
docs-src/docs/<project>/
  index.md
  introduction.md
  getting-started/
  architecture/
  reference/
  tests/
  troubleshooting/
```

## Steps

1. Copy `docs-src/docs/_templates/project-base/` to `docs-src/docs/<project>/`
2. Add the project card to the home page in `docs-src/docs/intro.md`
3. Register the project in the sidebar in `docs-src/sidebars.ts`
4. Keep the same title/section conventions
5. Run a build and validate links

## Reusable resources already available

- Dynamic header in `docs-src/static/js/navbar-dynamic.js`
- Desktop branding in `docs-src/static/img/tecsis-logo.svg`
- Mobile branding in `docs-src/static/img/tecsis-logo-mobile.svg`
- Favicon in `docs-src/static/img/tecsis-favicon.svg`
- Global styles in `docs-src/src/css/custom.css`

## Publishing

```bash
npm -C docs-src run build
```

Then commit/push changes in `docs-src/` and `docs/`.
