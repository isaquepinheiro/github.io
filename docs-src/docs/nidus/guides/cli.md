# CLI — Nidus CLI

O **Nidus CLI** é uma ferramenta de linha de comando escrita em Rust para scaffolding,
geração de código e gerenciamento de dependências de projetos Delphi com o framework Nidus.

:::info Download
Baixe o binário para sua plataforma na [página de releases](https://github.com/ModernDelphiWorks/Nidus-CLI/releases).
:::

---

## Instalação

### Binário pré-compilado

| Plataforma | Arquivo              |
| ---------- | -------------------- |
| Windows    | `Nidus-windows.exe`  |
| Linux      | `Nidus-linux`        |
| macOS      | `Nidus-macos`        |

Baixe e adicione ao PATH do sistema.

### Build a partir do código

```bash
cargo install --git https://github.com/ModernDelphiWorks/Nidus-CLI
```

### Tab-completion no terminal

```bash
# Bash
Nidus completions bash >> ~/.bashrc

# Zsh
Nidus completions zsh >> ~/.zshrc

# Fish
Nidus completions fish > ~/.config/fish/completions/Nidus.fish
```

---

## Quick Start

```bash
# 1. Criar um projeto novo
Nidus new MyApp

# 2. Instalar as dependências
cd MyApp
Nidus install

# 3. Gerar um módulo
Nidus gen module User

# 4. Verificar a saúde do projeto
Nidus doctor
```

---

## Comandos

### `new` — Criar projeto

Cria a estrutura completa de um projeto Delphi/Nidus: `.dpr`, `AppModule.pas`, `src/modules/`, `.gitignore`.

```bash
Nidus new <nome> [--path <dir>] [--with-tests]
```

| Opção           | Descrição                                          |
| --------------- | -------------------------------------------------- |
| `--path <dir>`  | Diretório onde o projeto será criado (padrão: `.`) |
| `--with-tests`  | Cria também o diretório `test/`                    |

---

### `init` — Inicializar em projeto existente

Cria o `nidus.json` em um projeto Delphi já existente, sem alterar os fontes.

```bash
Nidus init [--download <url>] [--mainsrc <dir>] [--force]
```

| Opção               | Descrição                                            |
| ------------------- | ---------------------------------------------------- |
| `--download <url>`  | URL do framework principal (padrão: repo oficial)    |
| `--mainsrc <dir>`   | Diretório de fontes (padrão: `src/`)                 |
| `--force`           | Sobrescreve se `nidus.json` já existir               |

---

### `install` — Instalar dependências

Clona todas as dependências listadas no `nidus.json`, sincroniza os paths do `.dproj` e grava o `nidus.lock`.

```bash
Nidus install
Nidus install --add <url> [--branch <branch>]
Nidus install --remove <url>
Nidus install --frozen
```

| Opção               | Descrição                                                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| `--add <url>`       | Registra e clona uma nova dependência. Faz rollback no `nidus.json` se o clone falhar.         |
| `--branch <branch>` | Branch a usar com `--add`                                                                      |
| `--remove <url>`    | Remove uma dependência do `nidus.json`                                                         |
| `--frozen`          | Falha se o `nidus.lock` estiver ausente ou se algum repo divergir do commit registrado         |

---

### `update` — Atualizar dependências

Atualiza todas as dependências (ou uma específica) para o último commit remoto e grava o `nidus.lock`.

```bash
Nidus update
Nidus update --dep <url-ou-nome>
```

---

### `gen` — Gerar componentes

Gera arquivos `.pas` de um módulo Nidus a partir de templates.

```bash
Nidus gen <tipo> <nome> [opções]
```

**Tipos disponíveis:**

| Tipo         | Arquivos gerados                                                      |
| ------------ | --------------------------------------------------------------------- |
| `module`     | `XxxModule.pas`, `XxxHandler.pas`                                     |
| `handler`    | `XxxHandler.pas`                                                      |
| `controller` | `XxxController.pas`                                                   |
| `service`    | `XxxService.pas`                                                      |
| `repository` | `XxxRepository.pas`                                                   |
| `interface`  | `XxxInterface.pas`                                                    |
| `infra`      | `XxxInfra.pas`                                                        |
| `scaffold`   | Todos os acima                                                        |

**Opções:**

| Opção                | Descrição                                                                   |
| -------------------- | --------------------------------------------------------------------------- |
| `--path <dir>`       | Caminho para a pasta `src/` (padrão: `./src`)                               |
| `--overwrite`        | Sobrescreve arquivos existentes                                             |
| `--template <nome>`  | Usa um template customizado de `~/.Nidus/templates/<nome>`                  |
| `--dry-run`          | Mostra o que seria gerado sem escrever nada                                 |
| `--interactive`/`-i` | Menu interativo para selecionar os componentes (requer TTY)                 |

**Exemplos:**

```bash
Nidus gen module User
Nidus gen scaffold Order --dry-run
Nidus gen scaffold Payment --interactive
Nidus gen module Auth --template jwt-template
```

---

### `remove` — Remover módulo

Remove o diretório do módulo e limpa as units do arquivo `.dpr`.

```bash
Nidus remove <nome>
Nidus rm <nome>
```

---

### `sync` — Sincronizar paths do .dproj

Adiciona os sub-paths `src`/`Source` das dependências ao `DCC_UnitSearchPath` do `.dproj`.

```bash
Nidus sync
Nidus add-paths
```

---

### `doctor` — Diagnóstico do projeto

Executa uma verificação completa em 5 seções e reporta problemas e avisos.

```bash
Nidus doctor
Nidus doctor --fix
Nidus doctor --json
```

| Seção                     | Verificações                                                             |
| ------------------------- | ------------------------------------------------------------------------ |
| **A. Configuração**       | Validade do `nidus.json`, `mainsrc`, URL do `download`                   |
| **B. Estrutura**          | `.dpr`, `.dproj`, `src/`, `AppModule.pas`, `modules/`                    |
| **C. Dependências**       | Status do clone, integridade do `.git/`, sync do `DCC_UnitSearchPath`    |
| **D. Consistência**       | Paths de units no `.dpr`, registro de módulos, referências no AppModule  |
| **E. Ambiente**           | Templates customizados, versão do CLI                                    |

| Opção    | Descrição                                                                            |
| -------- | ------------------------------------------------------------------------------------ |
| `--fix`  | Corrige automaticamente: clona deps ausentes (C1/C2) e sincroniza paths (C4)        |
| `--json` | Saída estruturada em JSON — ideal para pipelines CI/CD                               |

---

### `deps` — Listar dependências

Exibe todas as dependências com status de clone, branch e último commit (SHA/data).

```bash
Nidus deps
Nidus deps --json
```

---

### `outdated` — Verificar atualizações

Busca o remoto de cada dependência e compara com o HEAD local. Reporta quais têm novos commits — sem modificar nada.

```bash
Nidus outdated
```

---

### `clean` — Limpar artefatos de build

Remove artefatos de compilação Delphi. Arquivos rastreados pelo git **nunca** são deletados.

```bash
Nidus clean              # modo dry-run (apenas lista)
Nidus clean --execute    # deleta de verdade
Nidus clean --execute --yes   # sem confirmação
Nidus clean --path ./MyApp
```

| Removidos    | Itens                                                                     |
| ------------ | ------------------------------------------------------------------------- |
| Arquivos     | `*.dcu`, `*.dcp`, `*.bpl`, `*.bpi`, `*.drc`, `*.map`                     |
| Diretórios   | `Win32/`, `Win64/`, `OSX32/`, `OSX64/`, `__history/`, `__recovery/`      |

---

### `template` — Gerenciar templates

```bash
Nidus template list
Nidus template install <fonte>
Nidus template update [<nome>]
Nidus template create <nome>
Nidus template config <nome> [<chave> <valor>]
Nidus template publish <nome> <git-url>
```

| Subcomando             | Descrição                                                           |
| ---------------------- | ------------------------------------------------------------------- |
| `list`                 | Lista templates instalados                                         |
| `install <fonte>`      | Instala a partir de URL git ou caminho local                       |
| `update [nome]`        | Atualiza um ou todos os templates                                  |
| `create <nome>`        | Cria um novo scaffold de template                                  |
| `config <nome>`        | Lê ou define configuração do template                              |
| `publish <nome> <url>` | Publica um template local em um repositório git remoto             |

---

### `info` — Informações do projeto

Exibe o banner do CLI, versão e — quando `nidus.json` estiver presente — um resumo do projeto.

```bash
Nidus info
```

---

## Estrutura gerada pelo `new`

```text
MyApp/
├── MyApp.dpr
├── nidus.json
├── nidus.lock
├── .gitignore
└── src/
    ├── AppModule.pas
    └── modules/
        └── user/
            ├── UserModule.pas
            ├── UserHandler.pas
            ├── UserController.pas
            ├── UserService.pas
            ├── UserRepository.pas
            ├── UserInterface.pas
            └── UserInfra.pas
```

---

## nidus.json

```json
{
  "name": "MyApp",
  "mainsrc": "src/",
  "download": "https://github.com/ModernDelphiWorks/Nidus.git",
  "dependencies": {
    "https://github.com/HashLoad/Horse.git": "",
    "https://github.com/ModernDelphiWorks/ModernSyntax.git": ""
  }
}
```

| Campo          | Descrição                                                      |
| -------------- | -------------------------------------------------------------- |
| `mainsrc`      | Caminho relativo para o diretório de fontes                    |
| `download`     | URL do repositório do framework principal                      |
| `dependencies` | Mapa `"url": "branch"` (string vazia = branch padrão)         |

---

## nidus.lock

Gerado automaticamente pelo `install` e `update`. Registra o SHA exato de cada dependência clonada para builds reproduzíveis.

```json
{
  "version": "1",
  "generated_at": "2026-03-28T12:00:00Z",
  "dependencies": {
    "https://github.com/HashLoad/Horse.git": {
      "branch": "master",
      "commit": "abc123...",
      "locked_at": "2026-03-28T12:00:00Z"
    }
  }
}
```

Use `Nidus install --frozen` para garantir builds exatos em CI/CD.
