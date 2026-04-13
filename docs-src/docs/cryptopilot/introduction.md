---
displayed_sidebar: cryptopilotSidebar
title: Introdução
---

# Introdução

## O que é

CryptoPilot é uma plataforma full-stack de automação de trading de criptomoedas. Ela centraliza sinais de múltiplas origens — estratégias internas, movimentos de whales, copy trading e alertas do TradingView — em um único pipeline com controles de risco consistentes e execução automática via APIs de exchanges.

A plataforma opera 24 horas por dia, 7 dias por semana, eliminando a necessidade de monitoramento manual e garantindo que todas as decisões de ordem passem pelos mesmos limites de drawdown, circuit breakers e regras de proteção de capital definidos pelo trader.

A versão v0.1.0 entrega a fundação da plataforma: ambiente Docker, autenticação JWT e o módulo de Estratégias completo (criação, edição, ativação, duplicação e exclusão com validação de configuração por tipo).

## Para quem é este manual

- **Traders** que querem configurar estratégias, gerenciar capital alocado e acompanhar o desempenho da automação.
- **Operadores/admins** que implantam e mantêm a infraestrutura da plataforma, configuram limites globais de risco e monitoram a saúde do sistema.

## Que problema resolve

Traders que operam de forma sistemática enfrentam três obstáculos principais:

1. Execução manual é lenta, emocional e propensa a erros às 3h da madrugada.
2. Sinais de mercado vindos de exchanges, movimentos de whales, copy trading e gráficos do TradingView existem em silos, sem uma camada de orquestração unificada.
3. Gestão de risco exige aplicação consistente em todos os tipos de sinal simultaneamente.

CryptoPilot elimina os três ao fornecer um único sistema que ingere sinais de múltiplas fontes, aplica controles de risco unificados e automatiza a execução de ordens sem intervenção manual.

## Conceitos principais

- **Estratégia:** configuração de trading reutilizável com parâmetros tipados (DCA, Grid, Momentum), configurações de risco e ciclo de vida ativo/inativo. Estratégias são vinculadas a ativos e dirigem a execução.
- **Ativo:** par de trading registrado pelo usuário com alocação explícita de capital, vinculado a uma estratégia e a uma exchange específica.
- **Fonte de sinal:** qualquer gatilho que gera uma decisão de trade — condições internas de estratégia, alertas Pine Script do TradingView, movimentos on-chain de whales ou atualizações de posição de copy trade.
- **Motor de risco:** camada que avalia cada ordem candidata contra limites por estratégia, por usuário, drawdown global e circuit breakers antes de qualquer ordem chegar à exchange.
- **Circuit breaker:** parada forçada que suspende toda execução quando as perdas acumuladas do dia excedem o limite configurado (`GLOBAL_CIRCUIT_BREAKER_DAILY_LOSS_PCT`).
- **Paper trading:** modo de simulação onde toda a lógica de execução roda contra um saldo virtual, sem gerar ordens reais.