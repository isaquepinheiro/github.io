---
displayed_sidebar: nidusSidebar
title: Integração com Horse
---

## Driver

O driver do Nidus para Horse é um middleware que você registra no `THorse.Use`:

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


