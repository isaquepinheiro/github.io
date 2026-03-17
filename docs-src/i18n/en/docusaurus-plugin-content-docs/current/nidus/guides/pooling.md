---
displayed_sidebar: nidusSidebar
title: Pooling (Recursos Pesados)
---

Pooling é recomendado para objetos caros de criar (HTTP/RPC, componentes stateful, streams). O Nidus mantém um registry global de pools.

## Registrar pools

```pascal
uses
  Nidus;

begin
  GetNidus.UsePools<TMemoryStream>(256);
end.
```

## Uso seguro (Acquire/Release automático)

```pascal
GetNidus.WithPool<TMemoryStream>(
  procedure (S: TMemoryStream)
  begin
    S.Clear;
    // usar
  end
);
```

## Componentes (ex.: ACBr)

Para `TComponent`, o overload de `UsePools` aceita `Owner` e `Reset`:

```pascal
GetNidus.UsePools<TACBrNFe>(32, nil,
  procedure (A: TACBrNFe)
  begin
    // reset
  end
);
```



