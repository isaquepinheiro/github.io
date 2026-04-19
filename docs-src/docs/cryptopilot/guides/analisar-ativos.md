---
displayed_sidebar: cryptopilotSidebar
title: Análise de IA por Ativo
---

# Análise de IA por Ativo

**Audiência:** Traders  
**Pré-requisitos:** Ativo registrado; `ANTHROPIC_API_KEY` ou Ollama local configurado  
**Resultado:** Análise técnica + whale summary + sugestão de entrada, stop e take profit para o ativo

---

## O que a análise entrega

Ao acionar a análise em um ativo, o CryptoPilot consulta o modelo de IA configurado (Claude via API Anthropic ou Ollama local) e retorna:

| Campo | Descrição |
|-------|-----------|
| `suggestion` | Ação sugerida (`buy`, `sell`, `hold`) |
| `confidence` | Confiança da sugestão (0–100) |
| `entry_price` | Preço de entrada sugerido |
| `stop_loss` | Stop loss sugerido |
| `take_profit` | Take profit sugerido |
| `reasoning` | Explicação técnica da sugestão |
| `whale_summary` | Resumo dos movimentos whale recentes para o ativo |
| `risk_assessment` | Avaliação de risco do cenário atual |

:::note Sugestão, não ordem
A análise é informativa. O CryptoPilot não executa ordens automaticamente com base nos resultados de IA — você decide se aplica os parâmetros sugeridos à estratégia.
:::

---

## Acionar a análise

**Via interface web:** Na página de ativos, clique em **Analisar** ao lado do ativo desejado.

**Via API:**

```bash
TOKEN="<seu_access_token>"
ASSET_ID="<UUID_do_ativo>"

curl -X POST http://localhost/api/v1/analysis/$ASSET_ID/trigger \
  -H "Authorization: Bearer $TOKEN"
```

A resposta imediata retorna o status `pending`. A análise é processada de forma assíncrona e fica disponível em seguida.

---

## Recuperar o resultado

```bash
curl http://localhost/api/v1/analysis/$ASSET_ID \
  -H "Authorization: Bearer $TOKEN"
```

Quando `status = completed`, os campos de análise estão preenchidos. Se `parse_error = true`, o modelo retornou uma resposta não estruturada — tente novamente.

---

## Listar análises de todos os ativos

```bash
curl http://localhost/api/v1/analysis/ \
  -H "Authorization: Bearer $TOKEN"
```

---

## Configurar o provedor de IA

### Claude (Anthropic)

No `.env`:

```env
ANTHROPIC_API_KEY=<sua_chave>
ANTHROPIC_MODEL=claude-sonnet-4-20250514
```

### Ollama (local)

Para usar um modelo local (sem custo de API), configure o Ollama e ajuste em `.env`:

```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3
```

A análise via Ollama roda localmente — sem envio de dados para a nuvem.

---

## Boas práticas

1. **Use a análise antes de configurar novos parâmetros de stop/take profit** em uma estratégia.
2. **Compare a sugestão com seus indicadores** — a IA usa dados técnicos e whale summary, mas não prevê o mercado com certeza.
3. **Revise `whale_summary`** — movimentos recentes de grandes players podem contradizer indicadores técnicos.
4. **Não substitua a análise por gestão de risco** — aplique sempre os limites de drawdown configurados.

## Troubleshooting

Se receber `500` ao acionar análise, verifique se `ANTHROPIC_API_KEY` é válida e se o modelo configurado existe. Para Ollama, confirme que o serviço está rodando em `OLLAMA_BASE_URL`.
