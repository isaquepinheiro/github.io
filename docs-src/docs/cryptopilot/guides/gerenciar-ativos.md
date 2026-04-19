---
displayed_sidebar: cryptopilotSidebar
title: Gerenciar Ativos
---

# Gerenciar Ativos

**Audiência:** Traders  
**Pré-requisitos:** Conta criada, login realizado e pelo menos uma estratégia criada  
**Resultado:** Ativo registrado com capital alocado e vinculado a uma estratégia, pronto para execução

---

## O que é um ativo

Um ativo é um par de trading (ex.: `BTC/USDT`) registrado com um orçamento explícito de capital e vinculado a uma estratégia. O engine de execução usa o ativo para rastrear posição, calcular PnL e controlar o capital exposto.

---

## Registrar um ativo

1. Acesse a página `/assets` na interface web ou use a API diretamente.

2. Clique em **Novo Ativo** e preencha o formulário:

   | Campo | Obrigatório | Descrição |
   |-------|-------------|-----------|
   | `symbol` | Sim | Par no formato `BASE/QUOTE` (ex.: `BTC/USDT`, `ETH/USDT`) |
   | `exchange` | Sim | `coinex` (padrão) ou `binance` |
   | `capital_allocated` | Sim | Capital em USDT destinado a este ativo (mínimo 10 USDT) |
   | `capital_reserve_pct` | Não | % do capital mantido em reserva, não exposto (padrão: 10%, máx: 50%) |
   | `strategy_id` | Não | UUID da estratégia a vincular |
   | `status` | Não | `watching`, `active`, `paused` ou `stopped` (padrão: `watching`) |
   | `notes` | Não | Observações livres |

3. Via API:

   ```bash
   TOKEN="<seu_access_token>"

   curl -X POST http://localhost/api/v1/assets/ \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "symbol": "BTC/USDT",
       "exchange": "coinex",
       "capital_allocated": 500.0,
       "capital_reserve_pct": 10.0,
       "strategy_id": "<UUID_da_estrategia>",
       "status": "watching"
     }'
   ```

---

## Status do ativo

| Status | Significado |
|--------|-------------|
| `watching` | Monitorando o par sem execução ativa |
| `active` | Bot de execução rodando para este ativo |
| `paused` | Execução temporariamente suspensa; posição mantida |
| `stopped` | Ativo encerrado; posições fechadas |

Para alterar o status via API:

```bash
curl -X PATCH http://localhost/api/v1/assets/<ID> \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}'
```

---

## Editar um ativo

Todos os campos são opcionais na edição. Somente o que for enviado será atualizado.

```bash
curl -X PATCH http://localhost/api/v1/assets/<ID> \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"capital_allocated": 1000.0, "notes": "Aumentei capital após validação"}'
```

---

## Excluir um ativo

```bash
curl -X DELETE http://localhost/api/v1/assets/<ID> \
  -H "Authorization: Bearer $TOKEN"
```

A exclusão retorna `204 No Content` em caso de sucesso.

---

## Métricas disponíveis por ativo

Após o ativo ter trades registrados, a resposta inclui:

| Campo | Descrição |
|-------|-----------|
| `capital_used` | Capital atualmente em posição aberta (USDT) |
| `quantity` | Quantidade do ativo detida |
| `entry_price_avg` | Preço médio de entrada ponderado |
| `current_price` | Preço de mercado atual |
| `current_value_usd` | Valor atual da posição em USDT |
| `pnl_realized` | PnL realizado acumulado (USDT) |
| `pnl_unrealized` | PnL não realizado da posição aberta (USDT) |
| `pnl_total` | PnL total (realizado + não realizado) |
| `total_trades` | Total de trades executados |
| `winning_trades` / `losing_trades` | Breakdown de resultado |
| `largest_win` / `largest_loss` | Melhor e pior trade individual |

---

## Verificação

Liste seus ativos e confirme o estado:

```bash
curl http://localhost/api/v1/assets/ \
  -H "Authorization: Bearer $TOKEN"
```

## Próximos passos

- [Analisar o ativo com IA](analisar-ativos.md)
- [Fazer backtest da estratégia](backtest-estrategia.md)
- [Configurar parâmetros de risco](configurar-risco.md)
