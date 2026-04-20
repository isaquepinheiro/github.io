---
displayed_sidebar: delphisenseIaSidebar
title: Plugin OTA para RAD Studio
---

O plugin OTA integra o DelphiSense-IA diretamente ao RAD Studio, expondo indexação de símbolos, sugestões do agente IA, validação de credenciais e visualização do journal sem sair do IDE.

## Requisitos

- RAD Studio 10.3 ou superior
- DelphiSense-IA CLI v0.19.0+
- Bridge CLI em execução com named-pipe: `delphisense bridge --pipe`

## Iniciar a bridge antes de abrir o IDE

```bash
delphisense bridge --pipe
```

O processo imprime o caminho do pipe (`\\.\pipe\delphisense-*`) e aguarda conexões. Mantenha-o em execução enquanto o RAD Studio estiver aberto.

## Instalar o plugin

1. Compile o pacote `DelphiSense.OTA.dpk` no RAD Studio (menu **File → Open**).
2. Instale via **Component → Install Packages** e selecione o BPL gerado.
3. Reinicie o IDE.

Após a instalação, um menu de nível superior **DelphiSense** aparece na barra de menus do RAD Studio.

## Funcionalidades e atalhos

| Atalho | Entrada no menu | Descrição |
|--------|----------------|-----------|
| `Ctrl+Alt+F12` | DelphiSense → Symbol Lookup | Busca o símbolo sob o cursor e exibe resultados com clique para navegar |
| `Ctrl+Alt+F10` | DelphiSense → Suggest from Selection | Envia o texto selecionado no editor para o agente IA e exibe achados |
| `Ctrl+Alt+F9` | DelphiSense → Validate Credentials | Verifica o status de credenciais para todos os providers configurados |
| `Ctrl+Alt+F11` | DelphiSense → Journal Viewer | Exibe as últimas 50 entradas do journal de operações do agente |
| `Ctrl+Alt+F8` | DelphiSense → Diff Preview | Pré-visualiza alterações propostas pelo agente no arquivo atual (modo `--dry-run`) |

## Painel de mensagens do IDE

Cada função abre um grupo de mensagens dedicado no painel **Messages** do RAD Studio:

| Grupo | Origem |
|-------|--------|
| `DelphiSense:Project` | Resultado da indexação automática ao abrir o projeto |
| `DelphiSense:Agent` | Achados do agente IA |
| `DelphiSense:Credential` | Status e dicas de credenciais |
| `DelphiSense:Journal` | Entradas do journal de operações |
| `DelphiSense:Diff` | Hunks de diff para pré-visualização de escritas |

## Indexação automática ao abrir o projeto

O plugin registra um notificador OTA que dispara `delphisense.project.index` automaticamente quando um arquivo `.dproj` ou `.dpr` é aberto. O resultado aparece no grupo `DelphiSense:Project`.

## Gerenciar a sessão de conexão

O plugin mantém uma sessão com o bridge via reconexão exponencial. O estado da sessão é exibido na barra de título com os indicadores:

| Estado | Significado |
|--------|------------|
| `Connected` | Bridge ativo e respondendo |
| `Reconnecting` | Tentativa de reconexão após queda |
| `Degraded` | Timeout após todas as tentativas de reconexão |

Se o estado ficar `Degraded`, reinicie a bridge (`delphisense bridge --pipe`) e aguarde a reconexão automática.

## Troubleshooting rápido

### Plugin não aparece no menu

Verifique que o BPL foi instalado corretamente em **Component → Install Packages**.

### Resultado vazio para Symbol Lookup

Certifique-se de que o índice está construído:
```bash
delphisense symbol index --build
```

### Credential status retorna "not set"

Configure a credencial pelo CLI:
```bash
delphisense config credential set openai
```
