---
displayed_sidebar: nidusSidebar
title: Quickstart
---

Este quickstart mostra o Nidus rodando em um projeto Horse com um `TAppModule` mínimo.

## 1) Criar um AppModule

```pascal
unit App.Module;

interface

uses
  Nidus.Module,
  Nidus.Route;

type
  TPingModule = class(TModule)
  public
    function Routes: TRoutes; override;
  end;

implementation

function TPingModule.Routes: TRoutes;
begin
  Result := [
    RouteModule('/ping', TPingModule)
  ];
end;

end.
```

## 2) Subir o Horse com o driver do Nidus

```pascal
uses
  Horse,
  Nidus.Driver.Horse,
  App.Module;

begin
  THorse.Use(Nidus_Horse(TPingModule.Create));
  THorse.Listen(9000);
end.
```

## Observações

- Em produção você vai ter módulos reais (ex.: `TNFeModule`) e um módulo raiz que agrega submódulos/rotas.
- O driver `Nidus_Horse` é o ponto de integração do Nidus com o pipeline do Horse.

