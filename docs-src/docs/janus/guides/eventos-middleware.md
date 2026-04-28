---
title: Guia — Eventos Before e After
displayed_sidebar: janusSidebar
---

O sistema de eventos do Janus permite executar código antes ou depois de cada operação de persistência (INSERT, UPDATE, DELETE), sem modificar a entidade ou o container.

## Casos de uso típicos

- Registrar log de auditoria automaticamente.
- Preencher campos como `updated_at` antes do UPDATE.
- Validar regras de negócio antes de salvar.
- Cancelar uma operação quando uma condição não for atendida.

## Registrar um evento

```delphi
uses Janus.Register.Middleware;

TMiddlewareRegister.RegisterEvent(
  'client',
  TJanusEventType.onBeforeInsert,
  procedure(AEntity: TObject)
  var LClient: Tclient;
  begin
    LClient := AEntity as Tclient;
    LClient.created_at := Now;
  end
);

TMiddlewareRegister.RegisterEvent(
  'client',
  TJanusEventType.onAfterDelete,
  procedure(AEntity: TObject)
  begin
    LogAuditoria('client', 'DELETE', (AEntity as Tclient).client_id);
  end
);
```

## Cancelar uma operação

Use `IJanusHookContext` para abortar:

```delphi
TMiddlewareRegister.RegisterContextEvent(
  'pedido',
  TJanusEventType.onBeforeDelete,
  0,
  procedure(ACtx: IJanusHookContext)
  var LPedido: Tpedido;
  begin
    LPedido := ACtx.Entity as Tpedido;
    if LPedido.status = 'FATURADO' then
    begin
      ShowMessage('Pedido faturado não pode ser excluído.');
      ACtx.Abort;
    end;
  end
);
```

## Eventos disponíveis

| Evento | Momento |
|--------|---------|
| `onBeforeInsert` | Antes de executar INSERT |
| `onAfterInsert` | Após INSERT bem-sucedido |
| `onBeforeUpdate` | Antes de executar UPDATE |
| `onAfterUpdate` | Após UPDATE bem-sucedido |
| `onBeforeDelete` | Antes de executar DELETE |
| `onAfterDelete` | Após DELETE bem-sucedido |

## Onde registrar

Registre os eventos no `initialization` de uma unit de configuração ou no startup da aplicação, para garantir que estejam ativos antes de qualquer operação.
