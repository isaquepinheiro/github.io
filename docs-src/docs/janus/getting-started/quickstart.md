---
title: Quickstart
displayed_sidebar: janusSidebar
---

## Pré-requisitos

- Delphi XE+
- Boss package manager
- Driver de banco configurado (por exemplo, FireDAC)

## Instalação

```bash
boss install "https://github.com/ModernDelphiWorks/Janus"
```

## Passo 1: Criar uma entidade mapeada

```delphi
uses MetaDbDiff.Mapping.Attributes;

[Entity]
[Table('client', '')]
[PrimaryKey('client_id', 'PK')]
Tclient = class
private
  Fclient_id: Integer;
  Fclient_name: String;
public
  [Column('client_id', ftInteger)]
  property client_id: Integer read Fclient_id write Fclient_id;

  [Column('client_name', ftString, 40)]
  property client_name: String read Fclient_name write Fclient_name;
end;
```

## Passo 2: Registrar a entidade

```delphi
initialization
  TRegisterClass.RegisterEntity(Tclient);
```

## Passo 3: Configurar conexão e container

```delphi
procedure TForm3.FormCreate(Sender: TObject);
begin
  FConn := TFactoryFireDAC.Create(FDConnection1, dnSQLite);
  FContainerClient := TContainerFDMemTable<Tclient>.Create(FConn, FDClient);
  FContainerClient.Open;
end;
```

Se o projeto usa propriedades marcadas com `[Lazy]`, inclua a unit do gerador DML correspondente no `uses` para que o dialeto SQL seja registrado corretamente:

```delphi
uses Janus.DML.Generator.SQLite;
```

## Passo 4: Persistir alterações

```delphi
procedure TForm3.ButtonSalvarClick(Sender: TObject);
begin
  FContainerClient.ApplyUpdates(0);
end;
```

## Checklist de validação rápida

1. Janus instalado via Boss sem erros.
2. A entidade está registrada no `initialization`.
3. O DataSet abre com `Open` sem exceção.
4. `ApplyUpdates(0)` executa e grava no banco.
5. Se houver propriedades lazy, o primeiro acesso a `.Value` resolve com a sessão ainda ativa.

## Próximos passos

- [Guia: Primeiro CRUD com DataSet](../guides/primeiro-crud-com-dataset)
- [Guia: Operação Master-Detail](../guides/operacao-master-detail)
- [Referência de Configuração](../reference/configuration)
