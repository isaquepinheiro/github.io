---
displayed_sidebar: delphisenseIaSidebar
title: Quickstart
---

Este guia leva você do binário instalado até o primeiro resultado do agente em menos de 10 minutos.

## Pré-requisitos

- Sistema operacional: Windows, Linux ou macOS
- Binário `delphisense` disponível no `PATH`
- Um projeto Delphi com arquivos `.pas` / `.dpr` / `.dpk`

## 1. Verificar a instalação

```bash
delphisense --version
```

Se o comando retornar a versão (ex.: `0.21.0`), a instalação está correta. Caso contrário, verifique se o binário está no `PATH`.

## 2. Diagnosticar o ambiente

Antes de qualquer outra operação, execute o diagnóstico:

```bash
delphisense doctor
```

O comando valida: acesso ao workspace, configuração, índice de símbolos, credenciais e conectividade com provider. Corrija os itens marcados como `[fail]` antes de prosseguir.

## 3. Inicializar o projeto

Dentro do diretório raiz do projeto Delphi:

```bash
delphisense project init
```

Isso cria `.delphisense/project.json` com os metadados do workspace.

## 4. Configurar um provider de IA

Para usar o agente, configure um provider. Exemplo com Ollama (local, sem internet):

```bash
# Definir o provider ativo
delphisense config set provider.name ollama

# Verificar a configuração
delphisense config get provider.name
```

Para OpenAI ou GitHub Models, armazene a chave de API com segurança:

```bash
delphisense config credential set openai
# O CLI solicitará a chave interativamente — ela vai direto para o keychain do SO
```

## 5. Indexar os símbolos do projeto

```bash
delphisense symbol index --build
```

A indexação é incremental: na primeira vez varre todos os arquivos; nas execuções seguintes, apenas os arquivos modificados são reindexados.

## 6. Buscar um símbolo

```bash
# Busca em formato tabela
delphisense symbol find TClienteService

# Busca com saída JSON (útil em scripts)
delphisense symbol find TClienteService --json

# Limitar o número de resultados
delphisense symbol find Cliente --limit 20
```

## 7. Executar o agente IA

```bash
# Modo assistido — solicita confirmação antes de qualquer escrita
delphisense agent run "Liste as classes que dependem de TDataSource neste projeto" --mode assisted

# Modo somente leitura — sem risco de modificação
delphisense agent run "Explique o fluxo de TClienteForm" --mode suggest
```

## Próximos passos

- [Indexação de Símbolos em detalhes](../guides/symbol-indexing.md)
- [Guia completo do Agente IA](../guides/agent-runtime.md)
- [Gerenciar credenciais e providers](../guides/credentials.md)
- [Referência completa de configuração](../reference/configuration.md)
