---
title: Introdução
displayed_sidebar: janusSidebar
---

Janus é um framework ORM para Delphi que mapeia classes para entidades persistidas e gera SQL automaticamente para múltiplos drivers de banco de dados.

No uso diário, isso significa menos SQL manual, menos código repetitivo de persistência e um modelo de uso consistente em telas DataSet visuais, listas orientadas a objetos e integração REST.

## O que o Janus resolve

- Reduz o boilerplate repetitivo de CRUD.
- Centraliza o mapeamento via atributos na classe de domínio.
- Permite trocar bancos suportados com impacto mínimo no código da aplicação.
- Preserva a integração natural com DataSet para telas e rotinas legadas.

## Público-alvo

- Desenvolvedores Delphi em sistemas VCL/FMX.
- Times que mantêm aplicações em múltiplos bancos suportados.
- Projetos que precisam de persistência orientada a objetos com menor acoplamento a SQL nativo.

## Conceitos fundamentais

- **Entidade mapeada** — classe Delphi com atributos como `[Entity]`, `[Table]`, `[PrimaryKey]` e `[Column]`.
- **Registro de entidade** — passo obrigatório no bloco `initialization` para que o runtime resolva os metadados de mapeamento.
- **Container DataSet/ObjectSet** — camada de operações de dados para leitura, edição e persistência.
- **Driver DML** — componente que traduz operações para o dialeto do banco selecionado.
- **Lazy loading transparente** — associações marcadas com `[Lazy]` carregam no primeiro acesso sem `LoadLazy` manual nos fluxos suportados.

## Fluxo típico de uso

1. Modele uma entidade Delphi com atributos.
2. Registre a entidade no bloco `initialization` da unit.
3. Configure a conexão através de uma factory DataEngine.
4. Crie um container e abra os dados.
5. Persista as alterações com `ApplyUpdates`.

## Bancos suportados

| Banco | Driver DML |
|-------|-----------|
| Firebird / Firebird 3 | `Janus.DML.Generator.Firebird` / `Firebird3` |
| InterBase | `Janus.DML.Generator.InterBase` |
| SQLite | `Janus.DML.Generator.SQLite` |
| MySQL | `Janus.DML.Generator.MySQL` |
| PostgreSQL | `Janus.DML.Generator.PostgreSQL` |
| SQL Server | `Janus.DML.Generator.MSSQL` |
| Oracle | `Janus.DML.Generator.Oracle` |
| MongoDB | `Janus.DML.Generator.MongoDB` |
| AbsoluteDB | `Janus.DML.Generator.AbsoluteDB` |
| ElevateDB | `Janus.DML.Generator.ElevateDB` |
| NexusDB | `Janus.DML.Generator.NexusDB` |
