---
displayed_sidebar: delphisenseIaSidebar
title: Introdução
---

O **DelphiSense-IA** é uma ferramenta de linha de comando (CLI) para desenvolvedores Delphi que precisam de busca de símbolos offline, análise assistida por IA e integração futura com o RAD Studio. Toda operação sensível passa por política de segurança graduada antes de ser executada.

## Público-alvo

| Perfil | O que o DelphiSense-IA oferece |
|--------|-------------------------------|
| **Desenvolvedor Delphi** | Busca rápida de símbolos, análise de código com agente IA, sem dependência de internet para indexação |
| **Integrador de ferramentas** | Bridge HTTP local (`127.0.0.1:7777`) para consultar o índice a partir de plugins, scripts ou IDEs externas |
| **Operador / CI** | CLI scriptável para indexar, validar e auditar projetos em pipelines automatizadas |

## Funcionalidades principais

### Indexação de símbolos local
Constrói um índice SQLite+FTS5 com todos os símbolos do projeto. A indexação é incremental: apenas arquivos modificados são reprocessados.

### Busca de símbolos offline
Consultas por nome, tipo ou fragmento sem nenhuma chamada de rede. Suporta saída em tabela ou JSON (`--json`).

### Agente IA com política de segurança graduada
Executa prompts de análise e automação com quatro modos de operação:

| Modo (Tier) | Comportamento |
|-------------|--------------|
| `readonly` | Somente leitura; nenhuma escrita ou rede |
| `assisted` | Solicita confirmação antes de escrever ou chamar APIs |
| `supervised` | Verifica limites do workspace automaticamente; confirma operações perigosas |
| `autonomous` | Aprova todas as operações automaticamente (use com cautela) |

### Diagnóstico de ambiente (`doctor`)
Valida em um único comando: acesso ao workspace, configuração, índice de símbolos, credenciais, journal e conectividade com o provider.

### Bridge HTTP local
Servidor HTTP em loopback que expõe o índice para ferramentas externas e futuras integrações com o RAD Studio via OTA.

### Journal de operações e rollback
Todas as escritas do agente são registradas em log auditável. Qualquer arquivo pode ser revertido ao estado anterior via `agent rollback undo <operation_id>`.

## Providers suportados

| Provider | Modo | Endpoint padrão | Modelo padrão |
|----------|------|-----------------|---------------|
| `ollama` | Local / offline | `http://127.0.0.1:11434` | `llama3.2` |
| `openai` | Nuvem | `https://api.openai.com` | `gpt-4o-mini` |
| `github` | Nuvem | `https://models.inference.ai.azure.com` | `gpt-4o-mini` |
| `none` | Offline total | — | — |

## Onde os dados ficam

| Caminho | Conteúdo |
|---------|---------|
| `.delphisense/` | Config, índice, journal e rollbacks do workspace atual |
| `~/.delphisense/` | Runtime global: versão, caches de prompt e catálogo de sessões |
