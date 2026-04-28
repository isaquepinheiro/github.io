---
title: Referência de Configuração
displayed_sidebar: janusSidebar
---

Pontos principais de configuração para operar o Janus em projetos Delphi.

Versão de referência: **v2.22.4**.

## Instalação

```bash
boss install "https://github.com/ModernDelphiWorks/Janus"
```

## Dependências do ecossistema

| Dependência | Finalidade | Origem |
|-------------|------------|--------|
| MetaDbDiff | Mapeamento e metadata ORM | Resolvida via Boss |
| DataEngine | Abstração de conexão | Resolvida via Boss |
| FluentSQL | Geração de SQL por dialeto | Resolvida via Boss |
| JsonFlow | Serialização JSON | Resolvida via Boss |

## Parâmetros operacionais

| Item | Onde configurar | Exemplo | Observações |
|------|-----------------|---------|-------------|
| Driver de banco | Factory de conexão | `dnSQLite`, `dnMySQL` | Deve refletir o banco real em uso |
| Unit do gerador DML | `uses` do projeto | `Janus.DML.Generator.SQLite` | Necessária para registrar o dialeto SQL |
| Conexão ativa | Componente FireDAC/DataEngine | `FDConnection1` | Validar credenciais antes de abrir container |
| Registro de entidade | Bloco `initialization` da unit | `TRegisterClass.RegisterEntity(Tclient)` | Obrigatório para reconhecimento do mapeamento |
| Persistência de alterações | Evento de ação da tela | `ApplyUpdates(0)` | Tratar retorno para feedback ao usuário |
| Ciclo de vida do lazy | Escopo da sessão/container | acesso a `Lazy<T>.Value` com sessão viva | Fechar a sessão antes do primeiro acesso pode gerar `ELazyLoadException` |
| Monitor SQL | Após criar conexão | `SetCommandMonitor(TCommandMonitor.GetInstance)` | Recomendado em homologação; desativar em produção |

## Segurança e dados sensíveis

Não versione credenciais de banco no código-fonte.

```text
DB_HOST=<YOUR_VALUE>
DB_USER=<YOUR_VALUE>
DB_PASSWORD=<YOUR_VALUE>
```

## Checklist de configuração inicial

1. Instalar Janus e dependências via Boss.
2. Configurar conexão de banco no ambiente.
3. Definir driver DML correto na factory.
4. Incluir a unit `Janus.DML.Generator.<Driver>` correspondente no projeto.
5. Registrar todas as entidades utilizadas no bloco `initialization`.
6. Validar abertura de container e persistência com teste simples.
7. Se usar `[Lazy]`, validar o primeiro acesso a `.Value` com a sessão ainda aberta.
8. Se seu fluxo inclui CI local, compilar `Test/Delphi/JanusSmoke.dpr` para detectar problemas de ambiente antes de publicar.
