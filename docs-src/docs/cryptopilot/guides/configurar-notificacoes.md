---
displayed_sidebar: cryptopilotSidebar
title: Configurar Notificações
---

# Configurar Notificações

**Audiência:** Traders e Operadores  
**Pré-requisitos:** Bot Telegram criado via BotFather e/ou Webhook Discord disponível  
**Resultado:** Alertas de trades, sinais e eventos enviados automaticamente ao Telegram e/ou Discord

---

## Eventos notificáveis

| Evento | Descrição |
|--------|-----------|
| `trade_opened` | Ordem de compra/venda executada na exchange |
| `trade_closed` | Posição encerrada com PnL realizado |
| `whale_mirrored` | Espelhamento de movimento whale executado |
| `tv_signal_executed` | Sinal TradingView processado e executado |
| `copy_trade_executed` | Trade de copy trading executado |
| `auto_slot_executed` | Slot de bot automático acionado |

---

## Configurar via API

```bash
TOKEN="<seu_access_token>"

curl -X PATCH http://localhost/api/v1/notifications/config \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "telegram_enabled": true,
    "telegram_bot_token": "<TOKEN_DO_BOT>",
    "telegram_chat_id": "<ID_DO_CHAT>",
    "discord_enabled": false,
    "discord_webhook_url": "",
    "enabled_events": [
      "trade_opened",
      "trade_closed",
      "whale_mirrored",
      "tv_signal_executed"
    ]
  }'
```

---

## Configurar o Telegram

### 1. Criar o bot

1. Abra o Telegram e inicie uma conversa com **@BotFather**.
2. Digite `/newbot` e siga as instruções para nomear o bot.
3. Copie o token gerado (formato: `123456789:AAH...`).

### 2. Obter o Chat ID

1. Inicie uma conversa com o bot criado (envie qualquer mensagem).
2. Acesse `https://api.telegram.org/bot<TOKEN>/getUpdates`.
3. Localize `"chat": {"id": <NÚMERO>}` na resposta — esse é seu `telegram_chat_id`.

:::tip Grupo ou canal
Para enviar notificações a um grupo, adicione o bot ao grupo e use o `chat_id` do grupo (geralmente um número negativo).
:::

### 3. Atualizar a configuração

```bash
curl -X PATCH http://localhost/api/v1/notifications/config \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "telegram_enabled": true,
    "telegram_bot_token": "123456789:AAH...",
    "telegram_chat_id": "-100123456789"
  }'
```

---

## Configurar o Discord

1. No servidor Discord, acesse **Configurações do Canal → Integrações → Webhooks**.
2. Clique em **Novo Webhook**, nomeie e copie a **URL do Webhook**.
3. Configure no CryptoPilot:

```bash
curl -X PATCH http://localhost/api/v1/notifications/config \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "discord_enabled": true,
    "discord_webhook_url": "https://discord.com/api/webhooks/..."
  }'
```

---

## Testar as notificações

Envie uma mensagem de teste a todos os canais habilitados:

```bash
curl -X POST http://localhost/api/v1/notifications/test \
  -H "Authorization: Bearer $TOKEN"
```

A resposta indica o resultado de cada canal:

```json
{
  "telegram": true,
  "discord": false
}
```

`false` indica falha no envio — verifique o token/URL e os logs.

---

## Ver o log de notificações

```bash
curl http://localhost/api/v1/notifications/logs \
  -H "Authorization: Bearer $TOKEN"
```

Cada entrada inclui `event_type`, `channel`, `success` e `error_message` em caso de falha.

---

## Variáveis de ambiente (alternativa ao config via API)

As notificações também podem ser pré-configuradas no `.env` para o estado inicial dos novos usuários:

```env
TELEGRAM_BOT_TOKEN=<seu_token>
TELEGRAM_CHAT_ID=<seu_chat_id>
DISCORD_WEBHOOK_URL=<sua_url>
```

Configurações feitas via API sobrescrevem os valores do `.env` por usuário.

---

## Troubleshooting

| Sintoma | Causa provável | Ação |
|---------|---------------|------|
| Telegram não recebe mensagens | Bot não foi iniciado pelo usuário | Envie `/start` para o bot no Telegram |
| `telegram: false` no teste | Token ou chat_id incorretos | Verifique os valores via `/getUpdates` |
| `discord: false` no teste | URL do webhook inválida ou canal deletado | Recrie o webhook no Discord |

Veja também [Erros Comuns](../troubleshooting/common-errors.md).
