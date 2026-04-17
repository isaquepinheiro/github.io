---
displayed_sidebar: delphisenseIaSidebar
title: Runtime do Agente IA
---

O agente IA permite executar prompts de análise e automação dentro do workspace Delphi. Toda operação é controlada por uma política de segurança graduada que define o que pode ser lido, escrito ou executado.

## Modos de operação (tiers)

| Tier | Alias CLI | Comportamento |
|------|-----------|--------------|
| `readonly` | `suggest` | Leitura apenas; nenhuma escrita, exec ou rede |
| `assisted` | `confirm` | Solicita confirmação antes de escrever, executar ou chamar APIs externas |
| `supervised` | — | Verifica limites do workspace automaticamente; confirma operações perigosas |
| `autonomous` | `auto` | Aprova todas as operações sem intervenção humana |

Recomendação: use `assisted` no dia a dia e `autonomous` apenas em ambientes isolados.

## Executar um prompt simples

```bash
delphisense agent run "<prompt>" --mode <suggest|confirm|auto>
```

Exemplos:

```bash
# Analisar dependências sem risco de escrita
delphisense agent run "Quais forms dependem de TDataSource?" --mode suggest

# Sugerir refatoração com confirmação antes de salvar
delphisense agent run "Extraia a lógica de validação de TClienteForm para uma classe separada" --mode confirm

# Automação total (cuidado!)
delphisense agent run "Adicione logging em todos os métodos públicos de TClienteService" --mode auto
```

## Pipeline de múltiplas etapas

Para análises mais complexas, o agente pode executar uma sequência de passos:

```bash
delphisense agent pipeline "<prompt>" --steps 5
```

Cada etapa é registrada no journal para auditoria e rollback.

## Controle de operações permitidas

### Via flag (sessão única)

```bash
# Permitir apenas leitura e busca
delphisense agent run "<prompt>" --mode confirm --allow-ops read,search

# Pré-aprovar escritas sem confirmação interativa
delphisense agent run "<prompt>" --mode confirm --approve-ops write
```

### Via configuração do workspace (persistente)

```bash
delphisense config set agent.allow_ops read,search,write
```

**Atenção:** não é possível misturar `--allow-ops` (flag) e `agent.allow_ops` (config) na mesma execução. O CLI retornará erro de ambiguidade.

## Políticas por tipo de operação

Configure o tier mínimo exigido para cada categoria de operação:

```bash
# Exigir confirmação para escritas
delphisense config set agent.policy.write.tier assisted

# Exigir supervisão para execução de comandos
delphisense config set agent.policy.exec.tier supervised

# Exigir supervisão para chamadas de rede
delphisense config set agent.policy.network.tier supervised
```

## Journal de operações

Cada ação do agente é registrada em `.delphisense/agent-journal.jsonl`. Use os subcomandos de journal para auditoria:

```bash
# Listar as últimas 20 operações
delphisense agent journal list --limit 20

# Filtrar por tipo de operação
delphisense agent journal list --type write

# Filtrar por data
delphisense agent journal list --since 2025-01-01

# Saída JSON
delphisense agent journal list --format json

# Estatísticas do journal
delphisense agent journal stats

# Remover entradas antigas (simulação)
delphisense agent journal prune --dry-run

# Executar remoção
delphisense agent journal prune
```

## Rollback de operações

O agente cria snapshots dos arquivos antes de qualquer escrita. Para desfazer:

```bash
# Listar snapshots disponíveis
delphisense agent rollback list

# Reverter um arquivo ao estado anterior
delphisense agent rollback undo <operation_id>
```

O rollback é abortado se o hash atual do arquivo não corresponder ao hash registrado no snapshot (o arquivo foi modificado manualmente após a operação).

## Limites do workspace

O agente nunca opera fora do diretório raiz do workspace. Tentativas de escrita ou leitura fora do workspace são bloqueadas pela política `boundary`.

## Observabilidade

Para ver o contexto enviado ao provider:

```bash
DELPHISENSE_AGENT_OBSERVABILITY=1 delphisense agent run "<prompt>" --mode suggest
```

Para fixar o session ID (reprodutibilidade em testes):

```bash
DELPHISENSE_AGENT_SESSION_ID=minha-sessao delphisense agent run "<prompt>" --mode suggest
```
