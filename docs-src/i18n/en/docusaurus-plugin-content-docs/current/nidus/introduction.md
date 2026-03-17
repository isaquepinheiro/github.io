---
displayed_sidebar: nidusSidebar
title: Introduction
---

Nidus organizes Delphi applications by **scope**, not by layer (MVC). In practice, each feature (e.g., NFe, Auth, Products) gets its own module, and Nidus runtime resolves **dependencies** and **lifecycle** according to the route.

## Concepts

- **Module (`TModule`)**: composition unit. Declares routes and binds (dependency injection).
- **Route (`TRouteAbstract`)**: describes the path and the module responsible for that endpoint.
- **Binds/DI**: class/interface registration and resolution by tag.
- **Middlewares / Guards / Pipes**: extension points for validation, authorization, and transformations.

## Why use it

- Scope-based separation (less conflict across teams/features)
- Better testability (isolated modules)
- Architectural scalability (routes and DI do not become global state)





