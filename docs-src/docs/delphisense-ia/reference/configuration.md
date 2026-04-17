---
displayed_sidebar: delphisenseIaSidebar
title: Referência de Configuração
---

Referência completa de todas as flags globais, chaves de configuração e variáveis de ambiente do DelphiSense-IA.

## Flags globais

Disponíveis em qualquer comando:

| Flag | Valores | Padrão | Descrição |
|------|---------|--------|-----------|
| `--log-level` | `error`, `warn`, `info`, `debug`, `trace` | `warn` | Nível de log no stderr |
| `--log-format` | `human`, `json` | `human` | Formato da saída de log |
| `--log-file` | (sem valor) | desativado | Grava logs também em `.delphisense/logs/` |

## Comandos principais

### project

| Subcomando | Descrição |
|------------|-----------|
| `project init` | Inicializa `.delphisense/project.json` no workspace atual |
| `project info` | Exibe os metadados do projeto atual |

### config

| Subcomando | Descrição |
|------------|-----------|
| `config set <key> <value>` | Define uma chave de configuração |
| `config get <key>` | Lê uma chave de configuração |
| `config list` | Lista todas as chaves configuradas |
| `config credential set <provider>` | Armazena chave de API no keychain |
| `config credential get <provider>` | Exibe chave mascarada e fonte |
| `config credential delete <provider>` | Remove chave do keychain |
| `config credential list` | Lista status de todos os providers |
| `config credential migrate` | Move chave plain-text do config para o keychain |

### symbol

| Subcomando | Flags | Descrição |
|------------|-------|-----------|
| `symbol index --build` | — | Constrói ou atualiza o índice |
| `symbol find <query>` | `--limit N`, `--json` | Busca símbolos no índice |

### agent

| Subcomando | Flags | Descrição |
|------------|-------|-----------|
| `agent run <prompt>` | `--mode`, `--allow-ops`, `--approve-ops` | Executa prompt no agente |
| `agent pipeline <prompt>` | `--steps N`, `--mode` | Pipeline de múltiplas etapas |
| `agent journal list` | `--limit N`, `--type`, `--since`, `--format` | Lista entradas do journal |
| `agent journal stats` | — | Estatísticas do journal |
| `agent journal prune` | `--dry-run` | Remove entradas antigas |
| `agent rollback list` | — | Lista snapshots de rollback |
| `agent rollback undo <id>` | — | Reverte arquivo ao estado pré-operação |

### doctor

Sem flags adicionais. Valida todos os subsistemas do workspace.

### bridge

| Flag | Padrão | Descrição |
|------|--------|-----------|
| `--port` | `7777` | Porta do servidor HTTP local |

## Chaves de configuração do workspace

Armazenadas em `.delphisense/config.json`:

### Provider

| Chave | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `provider.name` | string | `none` | Provider ativo: `none`, `ollama`, `openai`, `github` |
| `provider.endpoint` | URL | (por provider) | Override de endpoint |
| `provider.model` | string | (por provider) | Override de modelo |
| `provider.api_key` | string | — | **Depreciado.** Use `config credential set` |

### Agente

| Chave | Tipo | Exemplo | Descrição |
|-------|------|---------|-----------|
| `agent.allow_ops` | CSV | `read,search,write` | Operações permitidas no workspace |
| `agent.policy.write.tier` | tier | `assisted` | Tier mínimo para operações de escrita |
| `agent.policy.exec.tier` | tier | `supervised` | Tier mínimo para execução de comandos |
| `agent.policy.network.tier` | tier | `supervised` | Tier mínimo para chamadas de rede |
| `agent.rollback.max_entries` | inteiro | `20` | Máximo de snapshots retidos (0 = ilimitado) |

**Valores válidos para tier:** `readonly` · `assisted` · `supervised` · `autonomous`

### Journal

| Chave | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `journal.enabled` | boolean | `true` | Habilita/desabilita gravação do journal |
| `journal.retention_days` | inteiro (1–365) | `30` | Janela de retenção de entradas |
| `journal.max_entries` | inteiro | `10000` | Máximo de entradas (0 = ilimitado) |

### Logs

| Chave | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `log.retention_days` | inteiro (1–365) | `7` | Retenção de arquivos de log |

## Variáveis de ambiente

| Variável | Descrição |
|----------|-----------|
| `HOME` | Caminho para o runtime global `~/.delphisense/` (obrigatório) |
| `RUST_LOG` | Nível de log do runtime Rust (ex.: `debug`) |
| `DELPHISENSE_LOG_LEVEL` | Override de nível de log |
| `DELPHISENSE_API_KEY_<PROVIDER>` | Credencial específica do provider (ex.: `DELPHISENSE_API_KEY_OPENAI`) |
| `DELPHISENSE_API_KEY` | Credencial genérica (fallback) |
| `DELPHISENSE_AGENT_SESSION_ID` | Fixa o session ID para reprodutibilidade |
| `DELPHISENSE_AGENT_OBSERVABILITY` | Defina como `1` para exibir o contexto enviado ao provider |

## Arquivos e diretórios

### Workspace (`.delphisense/`)

| Arquivo / Diretório | Descrição |
|---------------------|-----------|
| `config.json` | Configuração do workspace |
| `project.json` | Metadados do projeto |
| `symbol-index.db` | Índice SQLite+FTS5 de símbolos |
| `agent-journal.jsonl` | Log auditável de operações do agente |
| `rollback/` | Snapshots de arquivos para rollback |
| `agent-sessions/<id>/transcript.jsonl` | Histórico de conversa da sessão |
| `agent-sessions/<id>/working-memory.json` | Memória de trabalho da sessão |
| `logs/` | Arquivos de log (retidos por `log.retention_days`) |

### Global (`~/.delphisense/`)

| Arquivo / Diretório | Descrição |
|---------------------|-----------|
| `version.json` | Metadados de versão do CLI |
| `config/config.json` | Configuração global do usuário |
| `workspaces/<id>/cache/` | Caches de prefixo de prompt |
| `workspaces/<id>/session-index.jsonl` | Catálogo de sessões do workspace |

## Precedência de configuração

Do maior para o menor:

1. Flag CLI (ex.: `--tier autonomous`)
2. Configuração do workspace (`.delphisense/config.json`)
3. Configuração global (`~/.delphisense/config/config.json`)
4. Valores padrão internos

**Restrição:** não é possível combinar `--allow-ops` (flag) com `agent.allow_ops` (config) na mesma invocação.
