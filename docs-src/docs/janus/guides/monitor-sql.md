---
title: Guia — Monitor SQL
displayed_sidebar: janusSidebar
---

O **Monitor SQL** é um formulário de diagnóstico que exibe em tempo real todos os comandos SQL executados pelo Janus, com seus parâmetros.

## Quando ativar

- Durante desenvolvimento e homologação para validar os SQLs gerados.
- Para identificar consultas lentas ou inesperadas.
- Para confirmar que o mapeamento está gerando o SQL correto.

## Ativar o monitor na conexão

```delphi
uses Janus.Form.Monitor;

procedure TFormMain.FormCreate(Sender: TObject);
begin
  FConn := TFactoryFireDAC.Create(FDConnection1, dnFirebird);
  FConn.SetCommandMonitor(TCommandMonitor.GetInstance);
end;
```

`TCommandMonitor.GetInstance` retorna o singleton do formulário monitor. Ele aparece automaticamente ao receber o primeiro comando SQL.

## O que o monitor exibe

- SQL completo (SELECT, INSERT, UPDATE, DELETE)
- Parâmetros e valores associados
- Ordem de execução dos comandos

## Desativar em produção

```delphi
{$IFDEF DEBUG}
  FConn.SetCommandMonitor(TCommandMonitor.GetInstance);
{$ENDIF}
```

O monitor **não deve ser ativado em produção**. Use diretiva de compilação para garantir que só apareça em builds de desenvolvimento.
