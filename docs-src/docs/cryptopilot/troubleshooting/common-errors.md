---
displayed_sidebar: cryptopilotSidebar
title: Erros Comuns
---

# Erros Comuns

## 401 Unauthorized em endpoints protegidos

**Causa provável:** Token JWT ausente, expirado (TTL de 30 minutos) ou malformado no header `Authorization`.

**Ação:**

1. Faça login novamente em `POST /api/v1/auth/login` para obter um novo `access_token`.
2. Inclua o header em todas as requisições: `Authorization: Bearer <seu_token>`.
3. Se o erro persistir, verifique se o relógio do servidor está sincronizado (tokens JWT são sensíveis a diferença de horário).

---

## 409 Conflict ao criar estratégia

**Causa provável:** Já existe uma estratégia com o mesmo nome para o seu usuário.

**Ação:**

1. Liste suas estratégias: `GET /api/v1/strategies/` para confirmar o conflito.
2. Escolha um nome diferente ou edite a estratégia existente.

---

## 400 Bad Request com erro em `type_config`

**Causa provável:** Campos obrigatórios faltando, valores fora do intervalo permitido, ou campos desconhecidos enviados para o tipo de estratégia.

**Ação:**

1. Verifique a [Referência de Configuração de Estratégia](../guides/gerenciar-estrategias.md#configurações-por-tipo-de-estratégia) para os campos exatos de cada tipo.
2. Campos extras não são permitidos (`extra="forbid"`) — remova quaisquer campos não documentados.
3. Confirme os limites numéricos: ex., `interval_hours` de DCA deve ser entre 1 e 168.

---

## 409 Conflict ao excluir estratégia

**Causa provável:** A estratégia possui ativos ativos vinculados. A exclusão é bloqueada por regra de negócio.

**Ação:**

1. Desative ou desvincule todos os ativos associados à estratégia.
2. Tente a exclusão novamente.

---

## 404 Not Found ao acessar estratégia de outro usuário

**Causa provável:** A estratégia pertence a outro usuário. O CryptoPilot retorna 404 (não 403) para não expor a existência de recursos de outros usuários.

**Ação:** Verifique se você está autenticado como o usuário correto via `GET /api/v1/auth/me`.

---

## Sinal TradingView rejeitado com 401

**Causa provável:** O campo `secret` no payload do webhook está incorreto, expirado após uma rotação, ou ausente.

**Ação:**

1. Acesse **Configurações → TradingView** e copie o secret atual.
2. Atualize o campo `"secret"` no template do alerta no TradingView.
3. Se o secret foi rotacionado recentemente, o token antigo foi invalidado imediatamente.

---

## Sinal TradingView rejeitado com 429

**Causa provável:** O limite de sinais por hora (`max_signals_per_hour`) ou o cooldown por ativo (`cooldown_seconds`) foi atingido.

**Ação:**

1. Aguarde o período de cooldown expirar.
2. Se necessário, ajuste `max_signals_per_hour` e `cooldown_seconds` nas configurações TradingView.
3. Revise a frequência dos alertas Pine Script no TradingView.

---

## Contêineres não sobem / `docker compose up` falha

**Causa provável:** Arquivo `.env` com valores ausentes ou incorretos, porta já em uso, ou permissão negada no socket Docker.

**Ação:**

1. Verifique se o `.env` existe e tem todos os campos obrigatórios: `docker compose config` lista variáveis não resolvidas.
2. Confirme portas livres: `ss -tlnp | grep '5432\|6379\|8000\|80'`.
3. Se a mensagem for `permission denied` no socket Docker: `sudo usermod -aG docker $USER` e relogue.

---

## Migrações falhando com `Target database is not up to date`

**Causa provável:** Migrações Alembic não foram executadas após subir o ambiente ou após um pull com novas migrações.

**Ação:**

1. Execute: `docker compose exec backend alembic upgrade head`.
2. Confirme que `DATABASE_URL` aponta para o PostgreSQL correto.
3. Se o erro persistir, verifique os logs do container: `docker compose logs backend`.

---

## Frontend mostra tela em branco ou redireciona para /login após autenticação

**Causa provável:** `VITE_API_URL` no `frontend/.env` não corresponde ao endereço do backend.

**Ação:**

1. Verifique `frontend/.env`: deve conter `VITE_API_URL=http://localhost/api` (ou a URL correta do seu proxy Nginx).
2. Reinicie o frontend após editar: `docker compose restart frontend`.
3. Limpe o cache do navegador (Ctrl+Shift+R).

---

## Onde encontrar logs

| Tipo | Localização |
|------|-------------|
| Backend (FastAPI) | `docker compose logs backend` |
| Banco de dados | `docker compose logs db` |
| Celery worker | `docker compose logs celery_worker` |
| Nginx | `docker compose logs nginx` |

Para logs em tempo real com scroll: `docker compose logs -f backend`.

---

## Como reportar um problema

1. Colete os logs relevantes: `docker compose logs backend 2>&1 | tail -100`
2. Anote a mensagem de erro exata e os passos para reproduzir.
3. Abra uma issue em: [github.com/isaquepinheiro/CryptoPilot/issues](https://github.com/isaquepinheiro/CryptoPilot/issues)