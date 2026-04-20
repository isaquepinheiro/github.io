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

### Bridge IPC local (HTTP + Named-Pipe)
Servidor de integração que expõe o índice e o agente via HTTP loopback (`127.0.0.1:7777`) e, no Windows, via named-pipe JSON-RPC 2.0 (`\\.\pipe\delphisense-*`). O transporte named-pipe é o canal primário do plugin OTA para RAD Studio.

### Journal de operações e rollback
Todas as escritas do agente são registradas em log auditável. Qualquer arquivo pode ser revertido ao estado anterior via `agent rollback undo <operation_id>`.

## Plugin OTA para RAD Studio

A partir da v0.19.0, o plugin OTA para RAD Studio está funcional com as seguintes capacidades:

| Atalho | Função |
|--------|--------|
| `Ctrl+Alt+F12` | Busca símbolo sob o cursor e navega para o resultado |
| `Ctrl+Alt+F10` | Envia seleção do editor para o agente IA e exibe achados |
| `Ctrl+Alt+F9` | Valida status das credenciais de todos os providers |
| `Ctrl+Alt+F11` | Abre visualizador do journal de operações do agente |
| `Ctrl+Alt+F8` | Pré-visualiza diff inline via `--dry-run` para o arquivo atual |
| Menu `DelphiSense` | Acesso a todas as funções via menu principal do IDE |

O plugin requer o bridge CLI em execução (`delphisense bridge --pipe`) e RAD Studio 10.3 ou superior.

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
