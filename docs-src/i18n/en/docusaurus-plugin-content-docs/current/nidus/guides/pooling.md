---
displayed_sidebar: nidusSidebar
title: Pooling (Recursos Pesados)
---

Pooling is recommended for expensive objects (HTTP/RPC, stateful components, streams). Nidus keeps a global pool registry.

## Registrar pools

```pascal
uses
  Nidus;

begin
  GetNidus.UsePools<TMemoryStream>(256);
end.
```

## Safe usage (automatic Acquire/Release)

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

For `TComponent`, the `UsePools` overload accepts `Owner` and `Reset`:

```pascal
GetNidus.UsePools<TACBrNFe>(32, nil,
  procedure (A: TACBrNFe)
  begin
    // reset
  end
);
```





