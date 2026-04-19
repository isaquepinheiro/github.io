---
displayed_sidebar: cryptopilotSidebar
title: Copy Trading
---

# Copy Trading

**Audiência:** Traders  
**Pré-requisitos:** Ambiente rodando; capital alocado planejado  
**Resultado:** Posições de um top trader sendo copiadas automaticamente com tamanho proporcional ou fixo

---

## Como funciona

O módulo de copy trading sincroniza perfis de traders da Binance Leaderboard ou Hyperliquid. Quando o trader-fonte abre ou fecha uma posição, o CryptoPilot reaplica o movimento proporcional (ou com valor fixo) na sua conta, sujeito às regras do Risk Manager.

---

## Adicionar um trader para copiar

1. Acesse **Copy Trading → Novo Trader** na interface web ou use a API:

```bash
TOKEN="<seu_access_token>"

curl -X POST http://localhost/api/v1/copytrading/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "source": "binance_leaderboard",
    "source_trader_id": "TRADER_ID_AQUI",
    "trader_name": "Top Trader BTC",
    "exchange": "binance",
    "copy_mode": "proportional",
    "capital_allocated": 500.0,
    "max_position_pct": 25.0,
    "win_rate": 68.5,
    "pnl_30d": 12.3,
    "allowed_symbols": ["BTC/USDT", "ETH/USDT"],
    "is_active": false
  }'
```

### Campos disponíveis

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| `source` | Sim | Fonte do trader: `binance_leaderboard`, `hyperliquid` ou `manual` |
| `source_trader_id` | Sim | ID do trader na fonte (ex.: ID público da Leaderboard) |
| `trader_name` | Sim | Nome de referência (livre) |
| `exchange` | Sim | Exchange onde o trader opera |
| `copy_mode` | Sim | `proportional` (proporcional ao capital) ou `fixed_amount` (valor fixo por trade) |
| `capital_allocated` | Sim | Capital reservado para as cópias deste trader (USDT) |
| `max_position_pct` | Não | % máximo do capital alocado em uma única posição (1–100, padrão: 25%) |
| `win_rate` | Não | Taxa de acerto histórica do trader (%) |
| `pnl_30d` | Não | PnL dos últimos 30 dias do trader (%) |
| `allowed_symbols` | Não | Filtro: apenas copiar estes pares |
| `blocked_symbols` | Não | Filtro: nunca copiar estes pares |
| `is_active` | Não | Ativar imediatamente (padrão: false) |

---

## Modos de cópia

| Modo | Comportamento |
|------|---------------|
| `proportional` | Posição calculada como % do capital alocado, proporcional ao tamanho do trader-fonte |
| `fixed_amount` | Cada trade usa um valor fixo em USDT independente do tamanho do trader-fonte |

---

## Ativar ou desativar

```bash
# Ativar
curl -X POST http://localhost/api/v1/copytrading/<ID>/activate \
  -H "Authorization: Bearer $TOKEN"

# Desativar
curl -X POST http://localhost/api/v1/copytrading/<ID>/deactivate \
  -H "Authorization: Bearer $TOKEN"
```

---

## Editar configuração

```bash
curl -X PATCH http://localhost/api/v1/copytrading/<ID> \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"max_position_pct": 15.0, "blocked_symbols": ["DOGE/USDT"]}'
```

---

## Excluir trader

```bash
curl -X DELETE http://localhost/api/v1/copytrading/<ID> \
  -H "Authorization: Bearer $TOKEN"
```

---

## Verificar traders ativos

```bash
curl http://localhost/api/v1/copytrading/ \
  -H "Authorization: Bearer $TOKEN"
```

O campo `last_synced_at` indica quando a última sincronização ocorreu.

---

## Boas práticas

1. **Comece com capital pequeno** para validar o comportamento antes de aumentar a alocação.
2. **Use `allowed_symbols`** para restringir cópias aos pares que você conhece.
3. **Defina `max_position_pct` ≤ 25%** para diversificar entre múltiplos traders.
4. **Revise `pnl_30d` e `win_rate`** periodicamente — desempenho passado não garante resultados futuros.

## Troubleshooting

Veja [Erros Comuns](../troubleshooting/common-errors.md) para erros de sincronização ou rejeição de ordens.
