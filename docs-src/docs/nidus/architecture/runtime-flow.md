---
displayed_sidebar: nidusSidebar
title: Runtime Flow
---

## Fluxo (Horse → Nidus)

1. Horse recebe a request.
2. O middleware `Nidus_Horse(...)` repassa o `PathInfo` para o Nidus.
3. O Nidus resolve o módulo/rota e executa o pipeline da rota.
4. A resposta é escrita no `THorseResponse`.

## Ciclo de vida

- Sem cache de módulo: o módulo é criado/descartado por request.
- Com cache de módulo: módulos selecionados podem ser reutilizados (ver `UseCache`).


