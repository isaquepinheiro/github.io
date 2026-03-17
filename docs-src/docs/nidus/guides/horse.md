---
displayed_sidebar: nidusSidebar
title: Integração com Horse
---

## Driver

O driver do Nidus para Horse é um middleware que você registra no `THorse.Use`.

Ele faz duas coisas:

- No startup: chama `GetNidus.Start(TAppModule.Create)` para registrar rotas/binds do módulo raiz.
- Em cada request: chama `GetNidus.LoadRouteModule(PathInfo, Request)` antes do handler do Horse rodar e, no `finally`, `GetNidus.DisposeRouteModule(PathInfo)`.

```pascal
uses
  Horse,
  Nidus.Driver.Horse,
  App.Module;

begin
  THorse.Use(Nidus_Horse(TAppModule.Create));
  THorse.Listen(9000);
end.
```

## Ordem de middlewares

- Autenticação/autorizações (se você tiver) normalmente devem vir antes.
- `ResponseCache` (se usar) normalmente deve vir antes do `Nidus_Horse`.

## Importante: quem atende a rota é o Horse

O Nidus não cria endpoints HTTP sozinho. Você registra rotas no Horse (direto via `THorse.Get/Post/...` ou via `TRouteHandlerHorse`). O Nidus entra como camada de **DI/ciclo de vida por rota**.


