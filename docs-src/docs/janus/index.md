---
title: Janus ORM — Manual do Usuário
displayed_sidebar: janusSidebar
---

Manual do usuário do Janus para Delphi, com foco em instalação, fluxos de primeiro uso e operação diária do framework.

Versão atual deste manual: **v2.22.4**.

- `v2.22.4` adicionou o Examples Build Gate e extraiu a infraestrutura compartilhada de runner para os 4 executores DUnitX.
- `v2.22.x` introduziu o engine LiveBindings `TJanusBinder` com atributos `[Bind]`, `[BindGrid]` e `[BindGridColumn]`.
- `v2.20.x` introduziu integração REST/Horse com suporte a OData, `[RESTReadOnly]`, join views e controle de verbos HTTP.

## Para quem é este manual

- Desenvolvedores Delphi que precisam persistir objetos em bancos relacionais.
- Times que querem reduzir SQL manual em operações CRUD.
- Operadores técnicos que mantêm aplicações VCL/FMX com DataSet e fluxos de integração.

## Jornada recomendada

- [Introdução](./introduction)
- [Quickstart](./getting-started/quickstart)

## Guias por funcionalidade

### Persistência e dados
- [Primeiro CRUD com DataSet](./guides/primeiro-crud-com-dataset)
- [Operação Master-Detail](./guides/operacao-master-detail)
- [ObjectSet (sem DataSet visual)](./guides/objectset)
- [Consultas personalizadas](./guides/consultas-personalizadas)

### Tipos especiais
- [Campos opcionais com Nullable](./guides/nullable)
- [Lazy Loading](./guides/lazy-loading)

### UI e binding
- [LiveBindings VCL/FMX](./guides/livebindings)
- [Monitor SQL](./guides/monitor-sql)

### Funcionalidades avançadas
- [Eventos Before e After](./guides/eventos-middleware)
- [CodeGen](./guides/codegen)
- [Serialização JSON](./guides/json)
- [Driver RESTful](./guides/restful)

## Referências
- [Configuração](./reference/configuration)
- [Erros Comuns](./troubleshooting/common-errors)
