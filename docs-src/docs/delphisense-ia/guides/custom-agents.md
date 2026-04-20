---
displayed_sidebar: delphisenseIaSidebar
title: Agentes Personalizados
---

O **Registro de Agentes Personalizados** permite criar agentes nomeados com role/persona e payload de skill armazenados localmente em SQLite. Ao invocar um agente nomeado, o CLI enriquece o prompt com o contexto do agente antes de delegar ao runtime de sugestão.

## Criar um agente

```bash
delphisense agent registry create <nome> --role "<papel>" [--skill "<payload>"]
```

Exemplos:

```bash
# Agente especialista em refatoração
delphisense agent registry create refactor \
  --role "Você é um especialista em refatoração de código Delphi seguindo princípios SOLID" \
  --skill "Analise o código fornecido e sugira melhorias de estrutura e legibilidade"

# Agente revisor de segurança
delphisense agent registry create security \
  --role "Você é um auditor de segurança especializado em Delphi e Pascal" \
  --skill "Identifique vulnerabilidades de SQL injection, buffer overflow e acesso não autorizado"
```

| Parâmetro | Obrigatório | Descrição |
|-----------|-------------|-----------|
| `<nome>` | Sim | Identificador único do agente (sem espaços) |
| `--role` | Sim | Persona e instruções do agente |
| `--skill` | Não | Payload de habilidade adicional para o contexto do agente |

## Listar agentes registrados

```bash
delphisense agent registry list
```

Exemplo de saída:

```
NAME       ROLE
refactor   Você é um especialista em refatoração de código Delphi...
security   Você é um auditor de segurança especializado em Delphi...
```

## Remover um agente

```bash
delphisense agent registry delete <nome>
```

## Invocar um agente nomeado

Use `agent invoke` para executar um prompt com o contexto do agente enriquecido:

```bash
delphisense agent invoke <nome> "<prompt>" [--mode <suggest|pipeline>] [--steps N]
```

Exemplos:

```bash
# Modo sugestão (padrão — somente leitura)
delphisense agent invoke refactor "Revise TClienteForm e sugira melhorias"

# Modo pipeline — execução em múltiplas etapas
delphisense agent invoke refactor "Refatore TClienteService" --mode pipeline --steps 3

# Agente de segurança com saída JSON
delphisense agent invoke security "Audite este módulo" --mode suggest --json
```

### Flags do `agent invoke`

| Flag | Valores | Padrão | Descrição |
|------|---------|--------|-----------|
| `--mode` | `suggest`, `pipeline` | `suggest` | Modo de execução |
| `--steps` | inteiro ≥ 1 | `3` | Número de etapas (apenas com `--mode pipeline`) |
| `--json` | (sem valor) | — | Emite achados em JSON |
| `--dry-run` | (sem valor) | — | Pré-visualiza escritas sem aplicar |

## Aliases dinâmicos de comando

Agentes registrados podem ser invocados como subcomandos de nível superior, sem o prefixo `agent invoke`:

```bash
delphisense <nome> "<prompt>"
```

Exemplos:

```bash
# Equivalente a: delphisense agent invoke refactor "..."
delphisense refactor "Sugira melhorias para TClienteRepository"

# Equivalente a: delphisense agent invoke security "..."
delphisense security "Audite o módulo de autenticação"
```

> **Nota:** aliases dinâmicos usam implicitamente `--mode suggest`. Para pipeline, use `agent invoke` diretamente com `--mode pipeline`.

## Fluxo completo: criar, invocar e auditar

```bash
# 1. Criar o agente
delphisense agent registry create reviewer \
  --role "Revisor de código Delphi — foca em legibilidade e convenções"

# 2. Invocar com alias dinâmico
delphisense reviewer "Revise os métodos públicos de TClienteService"

# 3. Auditar a operação no journal
delphisense agent journal list --limit 5
```

## Boas práticas

- Use roles precisas e coerentes com a tarefa — o CLI inclui o texto da role diretamente no contexto enviado ao provider.
- Use `--skill` para fornecer exemplos ou instruções adicionais que complementam a role.
- Prefira `--mode suggest` para análise e `--mode pipeline` para tarefas complexas com múltiplos passos.
- Mantenha os nomes de agentes curtos e descritivos: `refactor`, `security`, `doc`, `test`.
