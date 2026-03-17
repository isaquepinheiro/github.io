---
displayed_sidebar: nidusSidebar
title: Injeção de Dependência (Binds)
---

O Nidus usa um container de injeção (baseado no InjectorBr) para resolver dependências dentro do contexto do módulo.

## Tipos de bind

Os binds são declarados no método `Binds` do módulo usando a sintaxe `Bind<T>` (atalho disponível em `Nidus.Module`).

- `Bind<T>.Singleton`: cria a instância quando o módulo inicia
- `Bind<T>.SingletonLazy`: cria a instância quando for solicitada pela primeira vez
- `Bind<T>.Factory`: cria sob demanda
- `Bind<T>.SingletonInterface<I>`: expõe uma interface resolvida via `GetInterface<I>`

## Exemplo

```pascal
unit NFe.Module;

interface

uses
  Nidus.Module;

type
  TNFeModule = class(TModule)
  public
    function Binds: TBinds; override;
  end;

implementation

uses
  NFe.Repository,
  NFe.Controller,
  NFe.Provider;

function TNFeModule.Binds: TBinds;
begin
  Result := [
    Bind<TRepositoryServer>.SingletonLazy,
    Bind<TControllerServer>.Singleton,
    Bind<TProviderORMBr>.Factory
  ];
end;

end.
```

:::caution
Para que um bind seja elegível a substituição/override, o tipo precisa estar declarado corretamente no `Bind<T>`.
:::


