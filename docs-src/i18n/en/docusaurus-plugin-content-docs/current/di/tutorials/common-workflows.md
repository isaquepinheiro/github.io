---
displayed_sidebar: injectContainerSidebar
title: Common Workflows
---

## Auto-inject with constructor params

The project includes a test demonstrating constructor auto-injection (classes + interfaces): see [`UTesteInject.pas`](file:///d:/Ecossistema-Delphi/InjectContainer/Test%20Delphi/UTesteInject.pas).

Recommended pattern:

1. Register constructor dependencies first.
2. Register the class that depends on them.
3. Resolve the dependent class using `Get<T>`.


