---
displayed_sidebar: nidusSidebar
title: Response Cache (Horse)
---

Response caching is done through `Horse.ResponseCache` middleware (server-side). It caches only `GET` and allows route-scoped limits.

## Example: cache only PDF/XML

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

## Cache key

- `method + path + query`
- optionally vary by `Authorization`





