---
displayed_sidebar: delphisenseIaSidebar
title: Erros Comuns
---

Referência rápida para diagnosticar e resolver os erros mais frequentes do DelphiSense-IA.

## Índice de símbolos

### `Symbol index not found or invalid`

**Causa:** O índice ainda não foi construído ou o arquivo está corrompido.

**Resolução:**
```bash
delphisense symbol index --build
```

### `Symbol query must not be empty`

**Causa:** A query passada para `symbol find` está vazia.

**Resolução:** Forneça um termo de busca não vazio:
```bash
delphisense symbol find TClienteService
```

### `Symbol limit must be between 1 and 200`

**Causa:** O valor de `--limit` está fora do intervalo permitido.

**Resolução:** Use um valor entre 1 e 200:
```bash
delphisense symbol find Cliente --limit 50
```

## Agente IA

### `Agent workspace boundary violation`

**Causa:** O agente tentou acessar ou escrever um arquivo fora do diretório raiz do workspace.

**Resolução:** Execute o CLI a partir da raiz do projeto Delphi. O workspace boundary é o diretório onde `.delphisense/` existe.

### `Agent operation denied by policy`

**Causa:** A operação solicitada (ex.: escrita) está bloqueada pela política de tier configurada.

**Resolução:** Aumente o tier ou pré-aprove a operação:
```bash
# Opção 1: aumentar o tier na sessão
delphisense agent run "<prompt>" --mode confirm

# Opção 2: pré-aprovar a operação específica
delphisense agent run "<prompt>" --mode confirm --approve-ops write
```

### `ambiguous: --allow-ops flag and config both set`

**Causa:** `--allow-ops` (flag CLI) e `agent.allow_ops` (config do workspace) estão definidos simultaneamente.

**Resolução:** Use apenas uma das fontes. Remova a chave do config ou omita o flag:
```bash
# Remover da config
delphisense config set agent.allow_ops ""

# Ou omitir o flag e usar apenas a config
```

### `agent.policy.<op>.tier requires stricter tier`

**Causa:** O tier passado via `--mode` é menos restritivo do que o tier mínimo exigido pela política do workspace para aquela operação.

**Resolução:** Eleve o tier de invocação ou relaxe a política:
```bash
# Usar tier mais alto
delphisense agent run "<prompt>" --mode supervised

# Ou relaxar a política
delphisense config set agent.policy.write.tier assisted
```

## Rollback

### `hash mismatch: file has been modified`

**Causa:** O arquivo foi modificado manualmente depois que o agente escreveu nele. O snapshot não pode ser aplicado com segurança.

**Resolução:** Reverta manualmente consultando o conteúdo do journal:
```bash
delphisense agent journal list --type write --format json
```

### `rollback: path is outside workspace`

**Causa:** O snapshot registra um caminho fora do workspace atual (possível adulteração).

**Resolução:** Não aplique o rollback. Restaure o arquivo a partir do controle de versão (git).

## Configuração e credenciais

### `invalid JSON at config.json`

**Causa:** O arquivo `.delphisense/config.json` contém JSON malformado.

**Resolução:** Abra o arquivo e corrija a sintaxe, ou remova-o e reconfigure:
```bash
# Verificar o conteúdo
cat .delphisense/config.json

# Recriar do zero (perda das configurações atuais)
rm .delphisense/config.json
delphisense project init
```

### `credential_security warning`

**Causa:** Uma chave de API está armazenada em texto simples no `config.json` (campo `provider.api_key`).

**Resolução:** Migre para o keychain do SO:
```bash
delphisense config credential migrate
```

### `global_runtime_home [fail]`

**Causa:** O caminho `~/.delphisense/` não existe ou não tem permissão de escrita.

**Resolução:** Verifique se a variável `HOME` está definida e se o usuário tem permissão de escrita no diretório home.

## Bridge HTTP

### `Bridge bind error on 127.0.0.1:<port>`

**Causa:** A porta já está em uso por outro processo.

**Resolução:** Use uma porta diferente:
```bash
delphisense bridge --port 8080
```

### `Bridge returns 400 INVALID_REQUEST`

**Causa:** O payload enviado ao endpoint não é JSON válido ou o `Content-Type` está ausente.

**Resolução:** Envie JSON válido com o header correto:
```bash
curl -X POST http://127.0.0.1:7777/symbol/find \
  -H "Content-Type: application/json" \
  -d '{"query": "TClienteService", "limit": 10}'
```

## Diagnóstico geral

Quando em dúvida, execute o `doctor` com log detalhado:

```bash
delphisense doctor --log-level debug
```

A saída indicará exatamente qual subsistema falhou e por quê.
