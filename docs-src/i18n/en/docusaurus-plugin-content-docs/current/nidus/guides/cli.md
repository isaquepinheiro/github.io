# CLI — Nidus CLI

**Nidus CLI** is a command-line tool written in Rust for scaffolding, code generation,
and dependency management of Delphi projects using the Nidus framework.

:::info Download
Download the binary for your platform from the [releases page](https://github.com/ModernDelphiWorks/Nidus-CLI/releases).
:::

---

## Installation

### Pre-built binary

| Platform | File                 |
| -------- | -------------------- |
| Windows  | `Nidus-windows.exe`  |
| Linux    | `Nidus-linux`        |
| macOS    | `Nidus-macos`        |

Download and add to your system PATH.

### Build from source

```bash
cargo install --git https://github.com/ModernDelphiWorks/Nidus-CLI
```

### Shell tab-completion

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
# 1. Scaffold a new project
Nidus new MyApp

# 2. Install dependencies
cd MyApp
Nidus install

# 3. Generate a module
Nidus gen module User

# 4. Check project health
Nidus doctor
```

---

## Commands

### `new` — Scaffold a project

Creates the full Delphi/Nidus project structure: `.dpr`, `AppModule.pas`, `src/modules/`, `.gitignore`.

```bash
Nidus new <name> [--path <dir>] [--with-tests]
```

| Option          | Description                                              |
| --------------- | -------------------------------------------------------- |
| `--path <dir>`  | Directory where the project will be created (default: `.`) |
| `--with-tests`  | Also creates a `test/` directory                         |

---

### `init` — Initialize in an existing project

Creates `nidus.json` in an existing Delphi project without touching any source files.

```bash
Nidus init [--download <url>] [--mainsrc <dir>] [--force]
```

| Option              | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `--download <url>`  | Main framework git URL (default: official Nidus repo)    |
| `--mainsrc <dir>`   | Sources directory (default: `src/`)                      |
| `--force`           | Overwrite if `nidus.json` already exists                 |

---

### `install` — Install dependencies

Clones all dependencies listed in `nidus.json`, syncs `.dproj` search paths, and writes `nidus.lock`.

```bash
Nidus install
Nidus install --add <url> [--branch <branch>]
Nidus install --remove <url>
Nidus install --frozen
```

| Option              | Description                                                                                     |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| `--add <url>`       | Register and clone a new dependency. Rolls back `nidus.json` if the clone fails.               |
| `--branch <branch>` | Branch to use with `--add`                                                                      |
| `--remove <url>`    | Remove a dependency from `nidus.json`                                                           |
| `--frozen`          | Fail if `nidus.lock` is missing or any repo diverges from the locked commit                     |

---

### `update` — Update dependencies

Fast-forwards all dependencies (or a specific one) to the latest remote commit and updates `nidus.lock`.

```bash
Nidus update
Nidus update --dep <url-or-name>
```

---

### `gen` — Generate components

Generates `.pas` files for a Nidus module from templates.

```bash
Nidus gen <type> <name> [options]
```

**Available types:**

| Type         | Files generated                                                       |
| ------------ | --------------------------------------------------------------------- |
| `module`     | `XxxModule.pas`, `XxxHandler.pas`                                     |
| `handler`    | `XxxHandler.pas`                                                      |
| `controller` | `XxxController.pas`                                                   |
| `service`    | `XxxService.pas`                                                      |
| `repository` | `XxxRepository.pas`                                                   |
| `interface`  | `XxxInterface.pas`                                                    |
| `infra`      | `XxxInfra.pas`                                                        |
| `scaffold`   | All of the above                                                      |

**Options:**

| Option               | Description                                                                   |
| -------------------- | ----------------------------------------------------------------------------- |
| `--path <dir>`       | Path to the `src/` folder (default: `./src`)                                  |
| `--overwrite`        | Overwrite existing files                                                      |
| `--template <name>`  | Use a custom template from `~/.Nidus/templates/<name>`                        |
| `--dry-run`          | Preview files that would be generated without writing them                    |
| `--interactive`/`-i` | Select components via an interactive multi-select menu (requires TTY)         |

**Examples:**

```bash
Nidus gen module User
Nidus gen scaffold Order --dry-run
Nidus gen scaffold Payment --interactive
Nidus gen module Auth --template jwt-template
```

---

### `remove` — Remove a module

Deletes the module directory and removes its units from the `.dpr` file.

```bash
Nidus remove <name>
Nidus rm <name>
```

---

### `sync` — Sync .dproj paths

Adds `src`/`Source` sub-paths from the dependencies directory to the `.dproj` `DCC_UnitSearchPath`.

```bash
Nidus sync
Nidus add-paths
```

---

### `doctor` — Project health check

Runs a 5-section health check and reports issues and warnings.

```bash
Nidus doctor
Nidus doctor --fix
Nidus doctor --json
```

| Section                   | Checks                                                               |
| ------------------------- | -------------------------------------------------------------------- |
| **A. Configuration**      | `nidus.json` validity, `mainsrc`, `download` URL                     |
| **B. Project Structure**  | `.dpr`, `.dproj`, `src/`, `AppModule.pas`, `modules/`                |
| **C. Dependencies**       | Clone status, `.git/` integrity, `DCC_UnitSearchPath` sync           |
| **D. Module Consistency** | `.dpr` unit paths, module registration, `AppModule.pas` references   |
| **E. Environment**        | Custom templates count, CLI version                                  |

| Option   | Description                                                                          |
| -------- | ------------------------------------------------------------------------------------ |
| `--fix`  | Auto-fix issues: clones missing deps (C1/C2) and syncs `.dproj` paths (C4)          |
| `--json` | Structured JSON output — ideal for CI/CD pipelines                                  |

---

### `deps` — List dependencies

Shows all dependencies with clone status, branch, and last commit SHA/date.

```bash
Nidus deps
Nidus deps --json
```

---

### `outdated` — Check for updates

Fetches each dependency's remote and compares with the local HEAD. Reports which repos have new commits — without modifying anything.

```bash
Nidus outdated
```

---

### `clean` — Remove build artifacts

Removes Delphi build artifacts. Git-tracked files are **never** deleted.

```bash
Nidus clean              # dry-run (list only)
Nidus clean --execute    # actually delete
Nidus clean --execute --yes   # skip confirmation
Nidus clean --path ./MyApp
```

| Removed      | Items                                                                     |
| ------------ | ------------------------------------------------------------------------- |
| Files        | `*.dcu`, `*.dcp`, `*.bpl`, `*.bpi`, `*.drc`, `*.map`                     |
| Directories  | `Win32/`, `Win64/`, `OSX32/`, `OSX64/`, `__history/`, `__recovery/`      |

---

### `template` — Manage templates

```bash
Nidus template list
Nidus template install <source>
Nidus template update [<name>]
Nidus template create <name>
Nidus template config <name> [<key> <value>]
Nidus template publish <name> <git-url>
```

| Subcommand             | Description                                                                  |
| ---------------------- | ---------------------------------------------------------------------------- |
| `list`                 | List installed custom templates                                              |
| `install <source>`     | Install a template from a git URL or local path                              |
| `update [name]`        | Update one or all installed templates                                        |
| `create <name>`        | Create a new template scaffold                                               |
| `config <name>`        | Get or set template configuration (persisted to `template.json`)             |
| `publish <name> <url>` | Push a local template to a git remote                                        |

---

### `info` — Project information

Displays the CLI banner, version, and — when `nidus.json` is present — a project summary.

```bash
Nidus info
```

---

## Generated project structure

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

| Field          | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| `mainsrc`      | Relative path to the sources directory                            |
| `download`     | Main framework repository URL                                     |
| `dependencies` | Map of `"url": "branch"` (empty string = default branch)          |

---

## nidus.lock

Automatically generated by `install` and `update`. Records the exact commit SHA of each cloned dependency for reproducible builds.

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

Use `Nidus install --frozen` to enforce exact commit matching in CI/CD.
