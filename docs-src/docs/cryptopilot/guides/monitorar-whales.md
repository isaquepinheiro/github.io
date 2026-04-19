---
displayed_sidebar: cryptopilotSidebar
title: Monitorar Whales
---

# Monitorar Whales

**Audiência:** Traders  
**Pré-requisitos:** `WHALE_ALERT_API_KEY` configurada no `.env`; ambiente rodando  
**Resultado:** Eventos on-chain de grande volume visíveis no feed; espelhamento automático ativado (opcional)

---

## Como funciona

O CryptoPilot conecta ao Whale Alert via WebSocket e REST para receber eventos on-chain em tempo real. Quando uma transferência de alto valor é detectada:

1. O evento é classificado (`exchange_inflow`, `exchange_outflow`, `whale_transfer`, etc.).
2. Filtros de valor mínimo, ativo, blockchain e entidade são aplicados.
3. Se `auto_mirror_enabled = true`, o Risk Manager avalia e executa uma ordem espelho.
4. O evento e a ação tomada ficam registrados no feed de whales.

---

## Configurar o módulo de whales

Acesse **Whales → Configurações** na interface web ou use a API:

```bash
TOKEN="<seu_access_token>"

curl -X POST http://localhost/api/v1/whales/config \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "min_value_usd": 1000000,
    "monitored_assets": ["BTC", "ETH"],
    "monitored_blockchains": ["bitcoin", "ethereum"],
    "alert_types": ["exchange_inflow", "exchange_outflow"],
    "auto_mirror_enabled": false,
    "mirror_pct": 2.0,
    "max_mirror_per_day": 5,
    "execution_delay_seconds": 30,
    "ignore_entities": ["Binance", "Coinbase"]
  }'
```

### Parâmetros de configuração

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `min_value_usd` | inteiro | 500000 | Valor mínimo da transação para gerar alerta (mín. 1000 USD) |
| `monitored_assets` | lista | null (todos) | Ativos a monitorar (ex.: `["BTC", "ETH"]`) |
| `monitored_blockchains` | lista | null (todas) | Blockchains a monitorar |
| `alert_types` | lista | null (todos) | Tipos de alerta a processar |
| `auto_mirror_enabled` | boolean | false | Ativa espelhamento automático de movimentos whale |
| `mirror_pct` | decimal | 2.0 | % do capital alocado a usar no espelho (0.1–100) |
| `max_mirror_per_day` | inteiro | 5 | Limite diário de execuções de espelho |
| `execution_delay_seconds` | inteiro | 30 | Delay antes de executar o espelho (0–3600) |
| `ignore_entities` | lista | null | Exchanges/entidades conhecidas a ignorar (reduz ruído) |

---

## Tipos de alerta

| Tipo | Descrição |
|------|-----------|
| `exchange_inflow` | Transferência para exchange (possível venda) |
| `exchange_outflow` | Saída de exchange para carteira (possível acumulação) |
| `whale_transfer` | Transferência entre carteiras grandes |
| `stablecoin_mint` | Emissão de stablecoin (possível injeção de liquidez) |
| `stablecoin_burn` | Queima de stablecoin |
| `unknown` | Evento não classificado |

---

## Espelhamento automático

:::warning Ative o paper trading antes
Valide o comportamento do espelhamento em `PAPER_TRADING_MODE=true` antes de expor capital real.
:::

Com `auto_mirror_enabled = true`:
- O sistema aguarda `execution_delay_seconds` após o alerta.
- O Risk Manager verifica limites globais e de drawdown.
- A ordem é executada a mercado na exchange configurada no ativo vinculado.
- O trade é registrado com `trigger = whale_mirror`.

Para espelhar manualmente um alerta específico:

```bash
curl -X POST http://localhost/api/v1/whales/mirror \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"alert_id": "<UUID_do_alerta>"}'
```

---

## Ver o feed de whales

```bash
curl http://localhost/api/v1/whales/feed \
  -H "Authorization: Bearer $TOKEN"
```

Cada entrada inclui: `asset`, `amount_usd`, `from_entity`, `to_entity`, `alert_type`, `action_taken`.

---

## Troubleshooting

Se o feed estiver vazio, verifique se `WHALE_ALERT_API_KEY` está correta em `.env` e se `WHALE_ALERT_MIN_VALUE_USD` não está muito alto para o volume atual do mercado. Veja [Erros Comuns](../troubleshooting/common-errors.md).
