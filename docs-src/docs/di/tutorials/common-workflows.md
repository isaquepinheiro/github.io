---
displayed_sidebar: injectContainerSidebar
title: Workflows comuns
---

## Auto-inject com parâmetros no construtor

O projeto tem um teste que demonstra auto-injeção de parâmetros (classes + interfaces): veja [`UTesteInject.pas`](file:///d:/Ecossistema-Delphi/InjectContainer/Test%20Delphi/UTesteInject.pas).

Padrão recomendado:

1. Registre dependências do construtor primeiro.
2. Registre a classe que depende delas.
3. Resolva a classe dependente com `Get<T>`.

---

## Auto-inject with constructor params

The project includes a test demonstrating constructor auto-injection (classes + interfaces): see [`UTesteInject.pas`](file:///d:/Ecossistema-Delphi/InjectContainer/Test%20Delphi/UTesteInject.pas).

Recommended pattern:

1. Register constructor dependencies first.
2. Register the class that depends on them.
3. Resolve the dependent class using `Get<T>`.

