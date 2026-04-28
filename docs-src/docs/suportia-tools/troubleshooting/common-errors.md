---
title: Common Errors
---

# Common Errors

## 401 Unauthorized when publishing

**Likely cause:** `SUPORTIA_PANEL_TOKEN` is not set or the token has expired.

**Action:**

1. Set the token in your environment:

   ```bash
   export SUPORTIA_PANEL_TOKEN=your-bearer-token
   ```

2. Or add it to your TOML config profile:

   ```toml
   [suportia.profiles.prod]
   panel_token = "your-bearer-token"
   ```

3. Re-run the publish command.

The CLI prints a hint when it receives a 401 response, indicating which variable or config key to set.

---

## Connection refused or timeout on `publish screen`

**Likely cause:** `SUPORTIA_PANEL_BASE_URL` points to an unreachable address or the panel is not running.

**Action:**

1. Confirm the panel is running:

   ```bash
   curl http://localhost:8001/health
   ```

2. Check that `SUPORTIA_PANEL_BASE_URL` matches the actual panel address:

   ```bash
   echo $SUPORTIA_PANEL_BASE_URL
   ```

3. If using a profile, verify `panel_base_url` in your TOML file.

---

## `suportia: command not found`

**Likely cause:** The package was not installed or the Python environment is not activated.

**Action:**

1. Install the CLI:

   ```bash
   cd tools/suportia
   pip install -e .
   ```

2. Verify:

   ```bash
   suportia --help
   ```

3. If using a virtual environment, activate it first:

   ```bash
   source .venv/bin/activate   # macOS/Linux
   .venv\Scripts\activate       # Windows
   ```

---

## `ConfigFileError: config file not found`

**Likely cause:** The path passed to `--config` does not exist.

**Action:**

1. Verify the path:

   ```bash
   ls ./suportia.toml
   ```

2. Pass the correct path or use an absolute path.

---

## Profile values are not applied {#profile-values-are-not-applied}

**Likely cause:** `--profile` was passed without `--config`, or the profile name does not match the key in the TOML file.

**Action:**

1. Always pass both options together:

   ```bash
   suportia --config ./suportia.toml --profile prod publish screen 42
   ```

2. Verify the profile name in your TOML file:

   ```toml
   [suportia.profiles.prod]   # profile name is "prod"
   ```

3. Or set both via environment variables:

   ```bash
   export SUPORTIA_CONFIG=./suportia.toml
   export SUPORTIA_PROFILE=prod
   ```

---

## `smoke` fails: pytest not found or SuportIA-Core not found

**Likely cause:** The core worktree is not present at the expected path or pytest is not installed in the core environment.

**Action:**

1. Confirm the core path exists:

   ```bash
   ls _worktrees/SuportIA-Core
   ```

2. Pass the path explicitly:

   ```bash
   suportia smoke --core-dir /path/to/SuportIA-Core
   ```

3. Ensure the core's dependencies (including pytest) are installed:

   ```bash
   cd _worktrees/SuportIA-Core && pip install -r requirements.txt
   ```

---

## Where to find logs

The `suportia` CLI prints output to stdout and errors to stderr. There is no persistent log file — capture output by redirecting:

```bash
suportia publish screen 42 2>error.log
```

## How to report a problem

1. Capture the full output with the error message:

   ```bash
   suportia --config ./suportia.toml --profile prod publish screen 42 2>&1
   ```

2. Note the exact command, the error text, and the version of `suportia`:

   ```bash
   suportia --version
   ```

3. Open an issue at: `https://github.com/isaquepinheiro/SuportIA-Tools/issues`
