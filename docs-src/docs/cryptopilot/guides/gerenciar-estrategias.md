---
displayed_sidebar: cryptopilotSidebar
title: Gerenciar Estratégias
---

# Gerenciar Estratégias

**Audiência:** Traders  
**Pré-requisitos:** Conta criada e login realizado (token JWT disponível)  
**Resultado:** Estratégia criada, configurada e pronta para vincular a um ativo

---

## Criar uma estratégia

1. Acesse a página `/strategies` na interface web ou use a API diretamente.

2. Clique em **Nova Estratégia** e preencha o formulário:

   | Campo | Obrigatório | Descrição |
   |-------|-------------|-----------|
   | Nome | Sim | Identificador único por usuário |
   | Descrição | Não | Texto livre para referência |
   | Tipo | Sim | `DCA`, `GRID` ou `MOMENTUM` |
   | Nível de risco | Sim | `LOW`, `MEDIUM` ou `HIGH` |
   | Configuração do tipo | Sim | Campos específicos por tipo (ver abaixo) |

3. Via API:

   ```bash
   TOKEN="<seu_access_token>"

   # Exemplo: estratégia DCA
   curl -X POST http://localhost/api/v1/strategies/ \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "DCA BTC Diário",
       "strategy_type": "DCA",
       "risk_level": "MEDIUM",
       "type_config": {
         "interval_hours": 24,
         "amount_per_interval": 100.0,
         "max_orders": 30
       }
     }'
   ```

### Configurações por tipo de estratégia

**DCA (Dollar-Cost Averaging)**

| Campo | Tipo | Intervalo | Descrição |
|-------|------|-----------|-----------|
| `interval_hours` | inteiro | 1–168 | Frequência de compra em horas |
| `amount_per_interval` | decimal | > 0 | Valor em USDT por execução |
| `max_orders` | inteiro | 1–1000 | Número máximo de ordens abertas |

**GRID**

| Campo | Tipo | Intervalo | Descrição |
|-------|------|-----------|-----------|
| `upper_price` | decimal | > 0 | Preço superior da grade |
| `lower_price` | decimal | > 0 | Preço inferior da grade |
| `grid_levels` | inteiro | 2–100 | Número de níveis na grade |
| `amount_per_grid` | decimal | > 0 | Valor por nível em USDT |

**MOMENTUM**

| Campo | Tipo | Opções / Intervalo | Descrição |
|-------|------|--------------------|-----------|
| `indicator` | string | `EMA_CROSS`, `MACD`, `RSI` | Indicador técnico usado |
| `fast_period` | inteiro | 2–50 | Período rápido do indicador |
| `slow_period` | inteiro | 10–200 | Período lento do indicador |
| `rsi_period` | inteiro | 2–50 | Período do RSI |
| `rsi_overbought` | inteiro | 50–100 | Nível de sobrecompra |
| `rsi_oversold` | inteiro | 0–50 | Nível de sobrevenda |

---

## Ativar ou desativar uma estratégia

Uma estratégia precisa estar **ativa** para que o motor de execução a considere.

**Via interface web:** Na listagem de estratégias, clique no botão de toggle ao lado da estratégia desejada.

**Via API:**

```bash
# Ativar
curl -X POST http://localhost/api/v1/strategies/<ID>/activate \
  -H "Authorization: Bearer $TOKEN"

# Desativar
curl -X POST http://localhost/api/v1/strategies/<ID>/deactivate \
  -H "Authorization: Bearer $TOKEN"
```

:::note
Desativar uma estratégia com posições abertas vinculadas acionará o fechamento das posições via ordem a mercado (com confirmação `force_close`).
:::

---

## Duplicar uma estratégia

Útil para testar variações de parâmetros sem perder a configuração original.

**Via interface web:** Clique no menu de ações da estratégia e selecione **Duplicar**.

**Via API:**

```bash
curl -X POST http://localhost/api/v1/strategies/<ID>/duplicate \
  -H "Authorization: Bearer $TOKEN"
```

A cópia é criada com nome `"<nome original> (Copy)"` e sempre inativa.

---

## Editar uma estratégia

Todos os campos são opcionais na edição. Só o que for enviado será atualizado.

```bash
curl -X PATCH http://localhost/api/v1/strategies/<ID> \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "DCA BTC Semanal", "risk_level": "LOW"}'
```

:::warning
Alterar `strategy_type` sem enviar um novo `type_config` compatível pode deixar a configuração inconsistente. Sempre envie o `type_config` ao mudar o tipo.
:::

---

## Excluir uma estratégia

```bash
curl -X DELETE http://localhost/api/v1/strategies/<ID> \
  -H "Authorization: Bearer $TOKEN"
```

A exclusão é bloqueada (`409 Conflict`) se a estratégia tiver ativos ativos vinculados. Desvincule ou desative os ativos antes de excluir.

---

## Verificação

Confirme que a estratégia foi criada e está no estado correto:

```bash
curl http://localhost/api/v1/strategies/ \
  -H "Authorization: Bearer $TOKEN"
```

## Troubleshooting

Se receber `409 Conflict` na criação, já existe uma estratégia com o mesmo nome para o seu usuário. Se receber `400 Bad Request`, verifique os campos obrigatórios e os intervalos válidos para o tipo escolhido. Veja [Erros Comuns](../troubleshooting/common-errors.md) para mais detalhes.