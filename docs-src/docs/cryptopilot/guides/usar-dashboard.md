---
displayed_sidebar: cryptopilotSidebar
title: Usar o Dashboard
---

# Usar o Dashboard

**Audiência:** Traders e operadores  
**Pré-requisitos:** Ambiente rodando; ao menos uma estratégia e um ativo configurados  
**Resultado:** Visão em tempo real do portfólio, bots ativos, PnL, feed de whales e sinais

---

## Visão geral

O Dashboard (disponível em `/`) é o painel central do CryptoPilot. A partir da v0.9.0 ele adota o layout **Bento Dense v2.0** — um conjunto de cartões compactos organizados em grade que exibe todas as métricas críticas em uma única tela, sem precisar rolar.

---

## Seções do painel

### Barra de status do sistema

No topo do painel, uma barra indica o estado geral da plataforma:

| Indicador | Significado |
|-----------|-------------|
| **System OK** (verde) | Todos os serviços operando normalmente |
| **Paper Mode** (amarelo) | `PAPER_TRADING_MODE=true` — nenhuma ordem real é enviada |
| **Circuit Breaker** (vermelho) | Execução suspensa por perda diária acima do limite |

---

### Cards de métricas

Cada card exibe uma dimensão do portfólio:

| Card | Dados exibidos |
|------|----------------|
| **PnL Total** | Lucro/perda acumulado (realizado + não realizado) |
| **Posições Abertas** | Número de trades abertos e exposição em USDT |
| **Bots Ativos** | Quantidade de bots em execução por tipo de estratégia |
| **Alocação** | % do capital total comprometido versus disponível |
| **Histórico de Sinais** | Últimos sinais recebidos (interno, TradingView, Whale, Copy) |
| **Feed de Whales** | Transações on-chain recentes acima do limite configurado |

---

### Gráficos TradingView embutidos

Cada card de ativo pode exibir o gráfico avançado do TradingView embutido diretamente, incluindo indicadores técnicos. Para ativar:

1. Abra o card do ativo desejado.
2. Clique no ícone de gráfico no canto superior direito do card.
3. O gráfico carrega com a configuração padrão do par (ex.: `BTCUSDT`) e os indicadores técnicos disponíveis.

---

### Seção Discovery

A seção Discovery mostra cartões de atividade de traders copiados (copy trading) com dicas visuais sobre a origem do sinal (fonte de cópia, whale, ou TradingView). Use esta seção para:

- Identificar quais traders-fonte estão mais ativos no momento.
- Ver os sinais pendentes de confirmação manual.
- Navegar rapidamente para o perfil de um trader copiado.

---

### Paleta de comandos

Pressione **Ctrl+K** (ou **⌘+K** no macOS) em qualquer tela para abrir a paleta de comandos. Com ela é possível:

- Navegar rapidamente entre seções sem usar o menu lateral.
- Buscar uma estratégia ou ativo pelo nome.
- Acessar ações rápidas: ativar/desativar bots, abrir configurações, criar estratégia.

---

## Modo Paper Trading

Quando `PAPER_TRADING_MODE=true`, o banner **Paper Mode** é exibido no topo do dashboard. Neste modo:

- Todas as métricas de PnL são calculadas sobre o saldo virtual (`PAPER_TRADING_INITIAL_BALANCE`).
- Nenhuma ordem real é enviada para a exchange.
- O fluxo de execução é idêntico ao modo live — use este modo para validar estratégias antes de ativar capital real.

---

## Atualização de dados

O dashboard atualiza os dados via polling e WebSocket:

| Dado | Frequência |
|------|-----------|
| PnL e posições | A cada 30 segundos |
| Feed de whales | Tempo real (WebSocket) |
| Histórico de sinais | A cada 60 segundos |
| Status dos bots | A cada 15 segundos |

---

## Próximos passos

- [Gerenciar Estratégias](gerenciar-estrategias.md)
- [Gerenciar Ativos](gerenciar-ativos.md)
- [Monitorar Whales](monitorar-whales.md)
- [Copy Trading](copy-trading.md)
