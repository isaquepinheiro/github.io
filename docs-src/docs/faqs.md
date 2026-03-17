---
title: FAQs
sidebar_position: 90
---

# FAQs

## Esta documentação afeta o site principal?

Não. A documentação é publicada em `/docs/` e o site principal permanece na raiz (`/`).

## Onde editar os conteúdos?

Edite os arquivos em `docs-src/docs/`.

## Como publicar atualizações?

Execute o build da documentação:

```bash
npm -C docs-src run build
```

Em seguida faça commit e push dos arquivos atualizados em `docs-src/` e `docs/`.

## Posso manter vários projetos no mesmo portal?

Sim. O recomendado é criar uma pasta por projeto dentro de `docs-src/docs/` e registrar na sidebar.

