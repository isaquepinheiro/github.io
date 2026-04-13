---
displayed_sidebar: cryptopilotSidebar
title: Configurar Risco
---

# Configurar Risco

**Audiência:** Traders e Operadores  
**Pré-requisitos:** Ambiente rodando com `.env` configurado  
**Resultado:** Limites de risco globais e por estratégia definidos antes de ativar qualquer execução

---

## Visão geral da proteção de capital

O CryptoPilot aplica controles de risco em duas camadas:

| Camada | Onde se configura | Aplica-se a |
|--------|-------------------|-------------|
| **Global** | `.env` | Todas as execuções de todos os usuários |
| **Por estratégia** | Criação/edição de estratégia | Execuções daquela estratégia específica |

Ambas as camadas precisam ser respeitadas para uma ordem chegar à exchange.

---

## Parâmetros globais de risco

Configure no arquivo `.env` antes de subir o ambiente:

```env
# Drawdown máximo acumulado (em %) antes de pausar todas as execuções
GLOBAL_MAX_DRAWDOWN_PCT=20

# Tamanho máximo de uma única operação (em % do saldo total)
GLOBAL_MAX_SINGLE_TRADE_PCT=5

# Perda diária acumulada que ativa o circuit breaker (em %)
GLOBAL_CIRCUIT_BREAKER_DAILY_LOSS_PCT=10

# Modo paper trading (true = sem ordens reais)
PAPER_TRADING_MODE=true
PAPER_TRADING_INITIAL_BALANCE=10000
```

:::warning Ative o paper trading primeiro
Antes de expor capital real, rode pelo menos uma sessão completa em `PAPER_TRADING_MODE=true` para validar o comportamento das suas estratégias.
:::

---

## Nível de risco por estratégia

Ao criar ou editar uma estratégia, o campo `risk_level` influencia o comportamento do motor de execução:

| Valor | Comportamento |
|-------|---------------|
| `LOW` | Tamanho de posição conservador; prioriza proteção de capital |
| `MEDIUM` | Equilíbrio entre retorno e risco |
| `HIGH` | Tamanho de posição agressivo; maior exposição por operação |

---

## Circuit breaker

Quando as perdas acumuladas no dia atingem `GLOBAL_CIRCUIT_BREAKER_DAILY_LOSS_PCT`, o circuit breaker é ativado automaticamente:

- **Todas** as novas execuções são suspensas, independentemente da fonte do sinal.
- Posições abertas **não** são fechadas automaticamente (o fechamento depende de confirmação manual ou de uma regra de stop-loss já definida na estratégia).
- O circuit breaker reseta no início do próximo dia (UTC 00:00) ou via comando manual de operador.

Para verificar o estado atual do circuit breaker:

```bash
# Endpoint planejado — disponível a partir do módulo Engine (ESP-003+)
# GET /api/v1/engine/status
```

<!-- TODO: confirmar endpoint exato quando o módulo Engine for entregue -->

---

## Boas práticas

1. **Comece com paper trading.** Valide a lógica das suas estratégias sem risco de capital.
2. **Defina `GLOBAL_MAX_SINGLE_TRADE_PCT` primeiro.** Um limite de 2–5% por operação previne perdas catastróficas em cenários de alta volatilidade.
3. **Use `risk_level: LOW` em novas estratégias.** Aumente depois de validar o comportamento em produção.
4. **Monitore o drawdown acumulado** antes de aumentar o capital alocado por ativo.
5. **Não desabilite o circuit breaker** — ele é a última linha de defesa contra perdas sistêmicas.

## Troubleshooting

Veja [Erros Comuns](../troubleshooting/common-errors.md) para situações como circuit breaker ativo ou rejeição de ordens por limite de risco.