---
displayed_sidebar: cryptopilotSidebar
title: Quickstart
---

# Quickstart

## Pré-requisitos

| Item | Versão mínima | Como instalar |
|------|---------------|---------------|
| Docker | 24.x | [docs.docker.com](https://docs.docker.com/get-docker/) |
| Docker Compose | 2.x (plugin) | Incluído no Docker Desktop |
| Git | 2.x | `apt install git` / [git-scm.com](https://git-scm.com/) |

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/isaquepinheiro/CryptoPilot.git
   cd CryptoPilot
   ```

2. Copie e edite o arquivo de configuração:

   ```bash
   cp .env.example .env
   ```

   Abra `.env` em um editor e preencha **no mínimo** os campos obrigatórios:

   ```env
   JWT_SECRET_KEY=<string_aleatoria_de_64_caracteres>
   POSTGRES_PASSWORD=<senha_segura>
   ```

   Gere uma chave JWT segura com:

   ```bash
   python3 -c "import secrets; print(secrets.token_hex(32))"
   ```

3. Suba o ambiente:

   ```bash
   docker compose up -d
   ```

   Isso inicia PostgreSQL 16, Redis 7, backend FastAPI, frontend React e Nginx.

4. Execute as migrações de banco de dados:

   ```bash
   docker compose exec backend alembic upgrade head
   ```

## Primeiro acesso

1. Registre uma conta:

   ```bash
   curl -X POST http://localhost/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email": "trader@exemplo.com", "password": "suasenha123"}'
   ```

2. Faça login e salve o token de acesso:

   ```bash
   curl -X POST http://localhost/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "trader@exemplo.com", "password": "suasenha123"}'
   ```

   Resposta:

   ```json
   {
     "access_token": "eyJ...",
     "token_type": "bearer"
   }
   ```

3. Acesse a interface web em `http://localhost` e faça login com as credenciais criadas.

## Verificação

Confirme que os contêineres estão rodando:

```bash
docker compose ps
```

Todos os serviços devem aparecer com status `running` ou `healthy`:

```
NAME                STATUS
cryptopilot-db-1    running
cryptopilot-redis-1 running
cryptopilot-backend-1 running
cryptopilot-frontend-1 running
cryptopilot-nginx-1 running
```

## Próximos passos

- [Criar sua primeira estratégia](../guides/gerenciar-estrategias.md)
- [Configurar parâmetros de risco](../guides/configurar-risco.md)
- [Referência de configuração](../reference/configuration.md)