---
title: Guia — Operação Master-Detail
displayed_sidebar: janusSidebar
---

Este guia apresenta um fluxo de operação com `TManagerDataSet` para carregar dados mestre-detalhe e campos de lookup em uma única orquestração.

## Cenário típico

- Cadastro de pedidos com itens.
- Tela de movimentação com tabelas relacionadas.
- Formulários que precisam abrir múltiplos DataSets em ordem controlada.

## Passo a passo

1. Crie a conexão com o banco e defina o driver correto.
2. Instancie `TManagerDataSet`.
3. Registre adapters para a entidade mestre e entidades filhas.
4. Adicione lookups quando necessário.
5. Abra o contexto chamando `Open<TEntidadeMestre>`.

```delphi
procedure TFormPedido.FormCreate(Sender: TObject);
begin
  FConn := TFactoryFireDAC.Create(FDConnection1, dnMySQL);

  FManager := TManagerDataSet.Create(FConn);
  FConn.SetCommandMonitor(TCommandMonitor.GetInstance);
  FManager.AddAdapter<Tmaster>(FDMaster, 3)
          .AddAdapter<Tdetail, Tmaster>(FDDetail)
          .AddAdapter<Tclient, Tmaster>(FDClient)
          .AddAdapter<Tlookup>(FDLookup)
          .AddLookupField<Tdetail, Tlookup>('fieldname',
                                            'lookup_id',
                                            'lookup_id',
                                            'lookup_description',
                                            'Descricao Lookup');
  FManager.Open<Tmaster>;
end;
```

## Dicas para estabilidade

- Abra sempre a entidade mestre primeiro.
- Use o monitor SQL para identificar gargalos ou consultas inesperadas.
- Garanta consistência das chaves entre entidades relacionadas.

## Resultado esperado

Carregamento coordenado dos DataSets relacionados com navegação estável entre mestre, detalhe e lookups.
