---
displayed_sidebar: delphisenseIaSidebar
title: Credenciais e Providers
---

O DelphiSense-IA armazena chaves de API no keychain do sistema operacional. Esta seção explica como configurar, verificar e migrar credenciais.

## Providers disponíveis

| Provider | `provider.name` | Endpoint padrão | Modelo padrão | Modo |
|----------|----------------|-----------------|---------------|------|
| Ollama | `ollama` | `http://127.0.0.1:11434` | `llama3.2` | Local / offline |
| OpenAI | `openai` | `https://api.openai.com` | `gpt-4o-mini` | Nuvem |
| GitHub Models | `github` | `https://models.inference.ai.azure.com` | `gpt-4o-mini` | Nuvem |
| Nenhum | `none` | — | — | Offline total |

## Configurar o provider ativo

```bash
delphisense config set provider.name openai
```

Para usar um endpoint ou modelo diferentes do padrão:

```bash
delphisense config set provider.endpoint https://meu-proxy.interno
delphisense config set provider.model gpt-4o
```

## Armazenar uma chave de API

```bash
delphisense config credential set <provider>
```

O CLI solicita a chave interativamente (sem expor no terminal) e a armazena no keychain do SO:

```bash
# Exemplos
delphisense config credential set openai
delphisense config credential set github
```

A chave nunca é gravada em texto simples no `config.json`.

## Verificar o status das credenciais

```bash
# Ver credencial mascarada e fonte de uma credencial
delphisense config credential get openai

# Listar status de todos os providers
delphisense config credential list
```

Exemplo de saída de `credential list`:

```
openai   → keychain  ✓
github   → not set
ollama   → no key required
```

## Remover uma credencial

```bash
delphisense config credential delete openai
```

## Migrar chaves em texto simples

Se você usou `provider.api_key` no `config.json` antes da versão que introduziu o keychain, migre com:

```bash
delphisense config credential migrate
```

O comando move a chave para o keychain e remove o campo `provider.api_key` do arquivo de configuração.

## Ordem de resolução de credenciais

O CLI tenta as seguintes fontes em ordem, usando a primeira que encontrar:

1. Variável de ambiente específica do provider: `DELPHISENSE_API_KEY_OPENAI`
2. Variável de ambiente genérica: `DELPHISENSE_API_KEY`
3. Keychain do SO (via `config credential set`)
4. Campo `provider.api_key` no `config.json` (depreciado — gera aviso `credential_security`)

## Usar variáveis de ambiente (CI/CD)

Em pipelines, injete a credencial via variável de ambiente sem precisar do keychain:

```bash
export DELPHISENSE_API_KEY_OPENAI="sk-..."
delphisense agent run "<prompt>" --mode suggest
```

## Ollama (sem chave)

O Ollama não exige chave de API. Basta ter o servidor Ollama rodando localmente:

```bash
delphisense config set provider.name ollama
delphisense agent run "Analise este código" --mode suggest
```
