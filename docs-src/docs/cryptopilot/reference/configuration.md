---
displayed_sidebar: cryptopilotSidebar
title: Referência de Configuração
---

# Referência de Configuração

Todos os parâmetros de configuração do CryptoPilot são definidos via variáveis de ambiente no arquivo `.env` na raiz do projeto. Copie `.env.example` como ponto de partida.

## Arquivo de configuração

**Localização:** `<raiz do projeto>/.env`  
**Formato:** variáveis de ambiente no padrão `CHAVE=VALOR`

## Parâmetros

### Banco de dados

| Variável | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `POSTGRES_HOST` | string | Sim | Hostname do PostgreSQL (padrão Docker: `db`) |
| `POSTGRES_PORT` | inteiro | Não | Porta do PostgreSQL (padrão: `5432`) |
| `POSTGRES_DB` | string | Sim | Nome do banco de dados |
| `POSTGRES_USER` | string | Sim | Usuário do banco |
| `POSTGRES_PASSWORD` | string | Sim | Senha do banco |
| `DATABASE_URL` | string | Sim | URL completa de conexão async (`postgresql+asyncpg://...`) |

### Redis

| Variável | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `REDIS_HOST` | string | Sim | Hostname do Redis (padrão Docker: `redis`) |
| `REDIS_PORT` | inteiro | Não | Porta do Redis (padrão: `6379`) |
| `REDIS_PASSWORD` | string | Não | Senha do Redis (se configurada) |
| `REDIS_URL` | string | Sim | URL completa de conexão (`redis://...`) |
| `CELERY_BROKER_URL` | string | Sim | URL do broker Celery (geralmente igual ao `REDIS_URL`) |

### Autenticação

| Variável | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `JWT_SECRET_KEY` | string | Sim | Chave secreta para assinar tokens JWT (mínimo 64 caracteres) |
| `JWT_ALGORITHM` | string | Não | Algoritmo JWT (padrão: `HS256`) |
| `JWT_ACCESS_TOKEN_EXPIRE_MINUTES` | inteiro | Não | Expiração do token de acesso em minutos (padrão: `30`) |
| `JWT_REFRESH_TOKEN_EXPIRE_DAYS` | inteiro | Não | Expiração do refresh token em dias (padrão: `7`) |

### Exchanges

| Variável | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `COINEX_API_KEY` | string | Sim* | Chave da API CoinEx |
| `COINEX_API_SECRET` | string | Sim* | Secret da API CoinEx |
| `BINANCE_API_KEY` | string | Não | Chave da API Binance (fallback) |
| `BINANCE_API_SECRET` | string | Não | Secret da API Binance (fallback) |

*Obrigatório para execução ao vivo. Não necessário em `PAPER_TRADING_MODE=true`.

### APIs externas

| Variável | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `WHALE_ALERT_API_KEY` | string | Não | Chave da API Whale Alert |
| `WHALE_ALERT_MIN_VALUE_USD` | inteiro | Não | Valor mínimo de transação whale a monitorar (padrão: `500000`) |
| `ANTHROPIC_API_KEY` | string | Não | Chave da API Anthropic para análise de IA |
| `ANTHROPIC_MODEL` | string | Não | Modelo Claude a usar (padrão: `claude-sonnet-4-20250514`) |

### Notificações

| Variável | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `TELEGRAM_BOT_TOKEN` | string | Não | Token do bot Telegram |
| `TELEGRAM_CHAT_ID` | string | Não | ID do chat/grupo do Telegram |
| `DISCORD_WEBHOOK_URL` | string | Não | URL do webhook Discord |

### Limites de risco globais

| Variável | Tipo | Padrão | Descrição |
|----------|------|--------|-----------|
| `GLOBAL_MAX_DRAWDOWN_PCT` | decimal | `20` | Drawdown máximo acumulado antes de pausar execuções (%) |
| `GLOBAL_MAX_SINGLE_TRADE_PCT` | decimal | `5` | Tamanho máximo de uma operação em % do saldo total |
| `GLOBAL_CIRCUIT_BREAKER_DAILY_LOSS_PCT` | decimal | `10` | Perda diária que ativa o circuit breaker (%) |

### Paper trading

| Variável | Tipo | Padrão | Descrição |
|----------|------|--------|-----------|
| `PAPER_TRADING_MODE` | boolean | `true` | Modo simulação — sem ordens reais |
| `PAPER_TRADING_INITIAL_BALANCE` | decimal | `10000` | Saldo virtual inicial em USDT |

### Aplicação

| Variável | Tipo | Padrão | Descrição |
|----------|------|--------|-----------|
| `APP_ENV` | string | `development` | Ambiente de execução (`development`, `production`) |
| `APP_URL` | string | — | URL pública da aplicação |
| `CORS_ORIGINS` | string | `http://localhost:5173` | Origens permitidas para CORS (separadas por vírgula) |
| `LOG_LEVEL` | string | `INFO` | Nível de log (`DEBUG`, `INFO`, `WARNING`, `ERROR`) |
| `TIMEZONE` | string | `UTC` | Timezone para jobs agendados |

### TradingView

| Variável | Tipo | Padrão | Descrição |
|----------|------|--------|-----------|
| `TV_WEBHOOK_RATE_LIMIT_PER_MINUTE` | inteiro | `60` | Máximo de requisições por minuto ao endpoint `/webhooks/tv` |
| `TV_ALLOWED_IPS` | string | — | IPs permitidos para o webhook TradingView (separados por vírgula; vazio = todos) |

---

## Exemplo: configuração mínima

```env
# Banco de dados
POSTGRES_HOST=db
POSTGRES_DB=cryptopilot
POSTGRES_USER=cryptopilot
POSTGRES_PASSWORD=<senha_segura>
DATABASE_URL=postgresql+asyncpg://cryptopilot:<senha_segura>@db:5432/cryptopilot

# Redis
REDIS_HOST=redis
REDIS_URL=redis://redis:6379/0
CELERY_BROKER_URL=redis://redis:6379/0

# Auth
JWT_SECRET_KEY=<string_64_caracteres_aleatoria>

# App
APP_ENV=development
CORS_ORIGINS=http://localhost:5173

# Paper trading (seguro para início)
PAPER_TRADING_MODE=true
PAPER_TRADING_INITIAL_BALANCE=10000
```

---

## Exemplo: configuração para produção

```env
# Banco de dados
POSTGRES_HOST=db
POSTGRES_DB=cryptopilot_prod
POSTGRES_USER=cryptopilot
POSTGRES_PASSWORD=<senha_forte>
DATABASE_URL=postgresql+asyncpg://cryptopilot:<senha_forte>@db:5432/cryptopilot_prod

# Redis
REDIS_HOST=redis
REDIS_PASSWORD=<senha_redis>
REDIS_URL=redis://:<senha_redis>@redis:6379/0
CELERY_BROKER_URL=redis://:<senha_redis>@redis:6379/0

# Auth
JWT_SECRET_KEY=<64_chars_random>
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30

# Exchanges
COINEX_API_KEY=<sua_chave>
COINEX_API_SECRET=<seu_secret>

# Risco global
GLOBAL_MAX_DRAWDOWN_PCT=20
GLOBAL_MAX_SINGLE_TRADE_PCT=5
GLOBAL_CIRCUIT_BREAKER_DAILY_LOSS_PCT=10

# App
APP_ENV=production
APP_URL=https://seudominio.com
CORS_ORIGINS=https://seudominio.com
LOG_LEVEL=WARNING
PAPER_TRADING_MODE=false
```