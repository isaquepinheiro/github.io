---
displayed_sidebar: cryptopilotSidebar
title: Integrar TradingView
---

**Audiência:** Traders com assinatura TradingView Pro ou superior  
**Pré-requisitos:** CryptoPilot rodando e acessível via URL pública (`APP_URL` configurada no `.env`); ativo e estratégia ativos  
**Resultado:** Alertas Pine Script do TradingView executam ordens no CryptoPilot automaticamente via webhook autenticado

## Como funciona

```text
TradingView Alert (Pine Script)
    ↓
POST /api/v1/webhooks/tv  (payload JSON com secret)
    ↓
Validação de secret (timing-safe)
    ↓
Verificação de rate-limit e cooldown
    ↓
Verificação de risco global
    ↓
Execução na exchange (se auto_execute = true)
    ou fila de confirmação manual (se require_confirmation = true)
    ↓
Registro de auditoria + notificação Telegram/Discord
```

---

## Pré-requisitos

- **TradingView Pro** ou superior (alertas com webhook requerem plano pago)
- URL pública do CryptoPilot com HTTPS (ex.: `https://seudominio.com`)
- Estratégia ativa vinculada ao símbolo que você quer operar

---

## Configurar o webhook no CryptoPilot

1. Acesse **Configurações → TradingView** na interface web.

2. Clique em **Gerar Secret** para obter um token de autenticação de 64 caracteres.

   :::warning Mantenha o secret seguro
   O secret autentica todos os sinais enviados pelo TradingView. Nunca compartilhe. Use **Rotacionar Secret** para invalidar o token atual e gerar um novo.
   :::

3. Configure as opções de execução:

   | Opção | Descrição |
   | ------- | ----------- |
   | `is_enabled` | Habilita/desabilita o recebimento de sinais |
   | `auto_execute` | Executa ordens automaticamente ao receber o sinal |
   | `require_confirmation` | Enfileira o sinal para aprovação manual antes de executar |
   | `max_signals_per_hour` | Limite de sinais aceitos por hora por usuário |
   | `cooldown_seconds` | Intervalo mínimo entre sinais para o mesmo ativo |

---

## Configurar o alerta no TradingView

1. No TradingView, abra o gráfico do ativo que deseja operar.

2. Crie um alerta com a condição da sua estratégia Pine Script.

3. Na aba **Notificações** do alerta, habilite **Webhook URL** e insira:

   ```text
   https://seudominio.com/api/v1/webhooks/tv
   ```

4. No campo **Mensagem**, insira o payload JSON:

   ```json
   {
     "secret": "<seu_secret_gerado_no_cryptopilot>",
     "action": "{{strategy.order.action}}",
     "symbol": "{{ticker}}",
     "price": "{{close}}",
     "timeframe": "{{interval}}",
     "strategy": "Nome da Sua Estratégia",
     "order_type": "market",
     "quantity_pct": "10"
   }
   ```

   Variáveis `{{...}}` são preenchidas automaticamente pelo TradingView no momento do disparo.

---

## Campos do payload

| Campo | Obrigatório | Tipo | Descrição |
|-------|-------------|------|-----------|
| `secret` | Sim | string | Token gerado no CryptoPilot |
| `action` | Sim | string | `buy` ou `sell` |
| `symbol` | Sim | string | Par de trading (ex.: `BTCUSDT`) |
| `price` | Não | string | Preço de referência do alerta |
| `timeframe` | Não | string | Timeframe do gráfico (ex.: `1H`) |
| `strategy` | Não | string | Nome da estratégia a vincular |
| `order_type` | Não | string | `market` ou `limit` |
| `quantity_pct` | Não | string | Percentual do capital alocado a usar |
| `stop_loss` | Não | string | Preço de stop-loss |
| `take_profit` | Não | string | Preço de take-profit |

:::note Preço de referência vs. preço de execução
O campo `price` é apenas referência. A execução usa o preço de mercado da exchange no momento da ordem. O CryptoPilot emite um alerta se a divergência entre o preço do sinal e o preço de mercado for superior a 2%.
:::

---

## Verificar sinais recebidos

Acesse **TradingView → Histórico de Sinais** na interface web para ver todos os sinais recebidos com status, payload e resultado da execução.

---

## Troubleshooting

Se sinais não estiverem sendo recebidos ou estiverem sendo rejeitados, veja [Erros Comuns](../troubleshooting/common-errors.md#sinal-tradingview-rejeitado-com-401).
