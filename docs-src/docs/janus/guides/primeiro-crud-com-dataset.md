---
title: Guia — Primeiro CRUD com DataSet
displayed_sidebar: janusSidebar
---

Este guia mostra o fluxo mínimo para abrir dados, editar registros e persistir alterações usando o container DataSet do Janus.

## Quando usar este fluxo

- Tela de cadastro em VCL/FMX.
- Manutenção de tabelas com edição em grade.
- Cenários com integração direta em `TFDMemTable` ou `TClientDataSet`.

## Passo a passo

1. Configure a conexão com o banco via DataEngine.
2. Instancie o container DataSet tipado pela entidade.
3. Abra os dados com `Open`.
4. Edite ou inclua registros no DataSet.
5. Persista no banco com `ApplyUpdates(0)`.

```delphi
uses
  DataEngine.FactoryInterfaces,
  DataEngine.FactoryFireDac,
  Janus.Container.FDMemTable,
  Janus.Model.Client;

procedure TFormCliente.FormCreate(Sender: TObject);
begin
  FConn := TFactoryFireDAC.Create(FDConnection1, dnSQLite);
  FContainerClient := TContainerFDMemTable<Tclient>.Create(FConn, FDClient);
  FContainerClient.Open;
end;

procedure TFormCliente.BtnSalvarClick(Sender: TObject);
begin
  FContainerClient.ApplyUpdates(0);
end;
```

## Boas práticas operacionais

- Valide campos obrigatórios antes de chamar `ApplyUpdates(0)`.
- Mantenha o monitor de comandos SQL ativo em ambiente de homologação para diagnóstico.
- Trate exceções de persistência apresentando mensagem amigável para o usuário final.

## Resultado esperado

Os registros editados no DataSet são gravados no banco. O modelo permanece desacoplado de SQL manual para operações comuns.
