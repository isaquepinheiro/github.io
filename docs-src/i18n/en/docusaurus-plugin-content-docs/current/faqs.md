---
title: FAQs
sidebar_position: 90
---

# FAQs

## Does this documentation affect the main site?

No. Documentation is published under `/docs/` and the main site remains at the root (`/`).

## Where should I edit content?

Edit files under `docs-src/docs/`.

## How do I publish updates?

Run the documentation build:

```bash
npm -C docs-src run build
```

Then commit and push the updated files under `docs-src/` and `docs/`.

## Can I keep multiple projects in the same portal?

Yes. The recommended approach is one folder per project under `docs-src/docs/` and registering it in the sidebar.
