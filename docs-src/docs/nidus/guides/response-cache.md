---
displayed_sidebar: nidusSidebar
title: Cache de Resposta (Horse)
---

O cache de resposta é feito via middleware `Horse.ResponseCache` (server-side). Ele cacheia apenas `GET` e permite limitar por rotas.

## Exemplo: cachear só PDF/XML

```pascal
uses
  Horse,
  Horse.ResponseCache,
  Nidus.Driver.Horse,
  App.Module;

begin
  THorse.Use(ResponseCache([
    '/nfe/pdf',
    '/nfe/xml'
  ], 30, 5000, True));

  THorse.Use(Nidus_Horse(TAppModule.Create));
  THorse.Listen(9000);
end.
```

## Chave de cache

- `method + path + query`
- opcionalmente varia por `Authorization`


