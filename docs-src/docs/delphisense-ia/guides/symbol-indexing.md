---
displayed_sidebar: delphisenseIaSidebar
title: Indexação de Símbolos
---

O índice de símbolos é o coração do DelphiSense-IA. Ele permite busca offline, rápida e sem rede sobre todos os tipos, classes, funções e unidades do projeto Delphi.

## Como funciona

O índice é um banco SQLite com extensão FTS5 (Full-Text Search) armazenado em `.delphisense/symbol-index.db`. A cada execução de `symbol index --build`, o CLI:

1. Percorre os arquivos do workspace
2. Calcula o fingerprint (hash) de cada arquivo
3. Reindexia apenas os arquivos cujo hash mudou desde a última execução
4. Atualiza as entradas no banco e descarta as obsoletas

## Construir ou atualizar o índice

```bash
delphisense symbol index --build
```

Execute este comando sempre que:
- O projeto for clonado pela primeira vez
- Novos arquivos `.pas`, `.dpr` ou `.dpk` forem adicionados
- Símbolos tiverem sido renomeados ou movidos

A indexação incremental torna as execuções subsequentes muito mais rápidas do que a varredura inicial.

## Verificar o status do índice

```bash
delphisense doctor
```

A saída do `doctor` inclui uma seção `symbol_index` com status (`ok` / `missing` / `stale`) e o número de entradas indexadas.

## Buscar símbolos

### Busca simples

```bash
delphisense symbol find <query>
```

Exemplos:

```bash
# Por nome de classe
delphisense symbol find TClienteService

# Por fragmento de nome
delphisense symbol find Cliente

# Por nome de unidade
delphisense symbol find ClienteRepository
```

### Limitar resultados

O padrão é 50 resultados. Use `--limit` para ajustar (máximo: 200):

```bash
delphisense symbol find Cliente --limit 10
delphisense symbol find Cliente --limit 200
```

### Saída em JSON

Útil para scripts e integrações:

```bash
delphisense symbol find TClienteService --json
```

Exemplo de resposta JSON:

```json
[
  {
    "name": "TClienteService",
    "kind": "class",
    "unit": "App.Service.Cliente",
    "file": "src/service/ClienteService.pas",
    "line": 14
  }
]
```

## Limites

| Parâmetro | Mínimo | Padrão | Máximo |
|-----------|--------|--------|--------|
| `--limit` | 1 | 50 | 200 |

Queries vazias são rejeitadas com erro imediato.

## Bridge HTTP e Named-Pipe (integração externa)

O comando `bridge` expõe o índice via dois transportes para que editores e scripts consultem símbolos sem depender do CLI diretamente.

### HTTP (loopback)

```bash
# Iniciar a bridge HTTP na porta padrão (7777)
delphisense bridge

# Porta personalizada
delphisense bridge --port 8080
```

Endpoint de busca (v1):

```
POST http://127.0.0.1:7777/v1/symbol/find
Content-Type: application/json

{"query": "TClienteService", "limit": 10}
```

Endpoints disponíveis:

| Método | Caminho | Descrição |
|--------|---------|-----------|
| `GET`  | `/v1/health` | Verificação de saúde |
| `POST` | `/v1/symbol/find` | Busca de símbolos |
| `POST` | `/v1/agent/suggest` | Sugestão via agente |
| `POST` | `/v1/project/index` | Indexar projeto |

### Named-Pipe JSON-RPC 2.0 (Windows — transporte primário para OTA)

```bash
# Iniciar servidor named-pipe
delphisense bridge --pipe

# Nome de pipe personalizado
delphisense bridge --pipe-name minha-instancia
```

O pipe é criado em `\\.\pipe\delphisense-*`. Os métodos JSON-RPC 2.0 disponíveis são:

| Método | Equivalente HTTP |
|--------|-----------------|
| `delphisense.health` | `GET /v1/health` |
| `delphisense.symbol.find` | `POST /v1/symbol/find` |
| `delphisense.agent.suggest` | `POST /v1/agent/suggest` |
| `delphisense.project.index` | `POST /v1/project/index` |

### Ambos os transportes simultaneamente

```bash
delphisense bridge --port 7777 --pipe
```
