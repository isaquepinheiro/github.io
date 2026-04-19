---
displayed_sidebar: cryptopilotSidebar
title: Backtest de Estratégia
---

# Backtest de Estratégia

**Audiência:** Traders  
**Pré-requisitos:** Estratégia criada; ativo registrado com o símbolo a ser testado  
**Resultado:** Relatório de desempenho histórico da estratégia com curva de equidade, win rate e drawdown máximo

---

## O que é o backtester

O backtester simula a execução de uma estratégia contra dados históricos de preço (OHLCV) antes de ativar capital real. Ele calcula as mesmas métricas que o motor de execução ao vivo produziria, permitindo validar parâmetros de entrada, stop e take profit sem risco.

---

## Executar um backtest

**Via interface web:** Acesse **Estratégias → [sua estratégia] → Backtest** e preencha o formulário.

**Via API:**

```bash
TOKEN="<seu_access_token>"

curl -X POST http://localhost/api/v1/backtest/run \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "strategy_id": "<UUID_da_estrategia>",
    "symbol": "BTC/USDT",
    "timeframe": "1h",
    "start_date": "2024-01-01",
    "end_date": "2024-12-31"
  }'
```

### Parâmetros

| Campo | Obrigatório | Valores aceitos | Descrição |
|-------|-------------|-----------------|-----------|
| `strategy_id` | Sim | UUID | Estratégia a testar |
| `symbol` | Sim | Ex.: `BTC/USDT` | Par de trading |
| `timeframe` | Sim | `1h`, `4h`, `1d` | Timeframe das velas OHLCV |
| `start_date` | Sim | `YYYY-MM-DD` | Início do período histórico |
| `end_date` | Sim | `YYYY-MM-DD` | Fim do período histórico |

---

## Acompanhar o progresso

O backtest roda de forma assíncrona. A resposta inicial retorna `run_id` e `status = pending`.

```bash
RUN_ID="<run_id_retornado>"

curl http://localhost/api/v1/backtest/$RUN_ID \
  -H "Authorization: Bearer $TOKEN"
```

Estados possíveis: `pending` → `running` → `completed` | `failed`.

---

## Interpretar os resultados

Quando `status = completed`:

| Métrica | Descrição |
|---------|-----------|
| `net_profit` | Lucro líquido em USDT no período |
| `net_profit_pct` | Lucro líquido em % do capital inicial |
| `max_drawdown` | Maior queda do pico ao vale durante o período (%) |
| `win_rate` | % de trades lucrativos |
| `profit_factor` | Ganhos brutos ÷ perdas brutas (> 1 = lucrativo) |
| `trade_count` | Total de trades simulados |
| `sharpe_ratio` | Retorno ajustado ao risco (> 1 = bom) |
| `equity_curve` | Série temporal do saldo ao longo do período |
| `simulated_trades` | Lista detalhada de cada trade: entrada, saída, PnL |

---

## Boas práticas

1. **Teste pelo menos 6–12 meses** de dados para reduzir viés de overfitting.
2. **Compare múltiplos timeframes** — uma estratégia pode performar bem em `1d` mas mal em `1h`.
3. **`max_drawdown > 30%` é sinal de alerta** — mesmo que o `net_profit` seja positivo.
4. **`profit_factor < 1.2` indica margem fraca** — revise os parâmetros de stop e take profit.
5. **Valide em período out-of-sample** — não use os mesmos dados que usou para otimizar os parâmetros.

---

## Troubleshooting

Se o backtest falhar com `status = failed`, verifique o campo `error` na resposta. Causas comuns: símbolo não disponível no exchange configurado, período sem dados históricos ou estratégia sem parâmetros compatíveis com o backtester.
