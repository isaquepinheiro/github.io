---
title: Guia — Lazy Loading (Carregamento Adiado)
displayed_sidebar: janusSidebar
---

Lazy Loading adia a carga de entidades relacionadas. O objeto relacionado só é buscado no banco no momento em que você acessar a propriedade pela primeira vez.

O Janus aplica esse comportamento com proxy transparente nos três fluxos suportados: **ObjectSet**, **DataSet** e **REST**.

## Quando usar

- Entidades com associações que nem sempre são necessárias.
- Evitar JOINs desnecessários em listagens.
- Melhorar desempenho de abertura inicial de dados.

## Mapeando uma propriedade lazy

```delphi
uses Janus.Types.Lazy, MetaDbDiff.Mapping.Attributes;

[Entity]
[Table('pedido', '')]
Tpedido = class
private
  Fpedido_id: Integer;
  Fclient: Lazy<Tclient>;
public
  [Column('pedido_id', ftInteger)]
  property pedido_id: Integer read Fpedido_id write Fpedido_id;

  [Lazy]
  [Association(atManyToOne, [caNone])]
  property client: Lazy<Tclient> read Fclient write Fclient;
end;
```

## Acessando o valor

```delphi
var LPedido: Tpedido;
begin
  LPedido := FContainer.Find(10);

  // Até aqui: nenhuma query para Tclient foi executada

  // Primeiro acesso → dispara SELECT automático no banco
  ShowMessage(LPedido.client.Value.client_name);

  // Segundo acesso → usa cache, sem nova query
  ShowMessage(LPedido.client.Value.client_id.ToString);
end;
```

## Onde o proxy transparente funciona

| Contexto | Comportamento |
|----------|--------------|
| ObjectSet | A propriedade lazy carrega no primeiro acesso em fluxos de sessão orientados a objeto |
| DataSet | A navegação do registro atual injeta o proxy automaticamente para a entidade materializada |
| REST | O manager REST injeta a factory lazy durante o preenchimento da associação |

## Compatibilidade com LoadLazy

Se você já tem código antigo usando `LoadLazy`, ele continua válido. O recurso transparente foi adicionado sem quebrar o caminho explícito.

```delphi
var LPedido: Tpedido;
begin
  LPedido := FContainer.Find(10);
  FContainer.LoadLazy<Tclient>(LPedido);
  ShowMessage(LPedido.client.Value.client_name);
end;
```

## Regra importante: sessão deve estar aberta

O lazy só consegue carregar dados enquanto a sessão/container estiver ativa.

```delphi
// CORRETO
LNome := LPedido.client.Value.client_name;  // container aberto
FContainer.Free;

// ERRADO — dispara ELazyLoadException
FContainer.Free;
LNome := LPedido.client.Value.client_name;  // container já fechado
```

## Reset automático ao navegar (DataSet)

Ao navegar para um novo registro (`Next`, `Prior`), o framework reseta os proxies do registro anterior automaticamente. Isso garante que o próximo acesso a uma propriedade lazy carregue os dados corretos do novo registro.

```delphi
LDataSet.First;
LPedido := LDataSet.Current as Tpedido;
var LClient1 := LPedido.client.Value;  // Carrega cliente do Pedido 10

LDataSet.Next;                          // Framework reseta proxies do Pedido 10
LPedido := LDataSet.Current as Tpedido;
var LClient2 := LPedido.client.Value;  // Carrega cliente do Pedido 20
```
