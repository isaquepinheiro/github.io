---
title: Erros Comuns
displayed_sidebar: janusSidebar
---

## Entidade não reconhecida

**Sintoma:** operação de CRUD falha com erro de mapeamento; o Janus não encontra a tabela correspondente.

**Causa:** a classe não foi registrada no bloco `initialization`.

**Como resolver:**

```delphi
initialization
  TRegisterClass.RegisterEntity(Tclient);
```

---

## SQL incompatível com o banco

**Sintoma:** erro de sintaxe SQL em runtime; comandos gerados não respeitam o dialeto do banco.

**Causa:** driver escolhido na factory não corresponde ao banco em uso.

**Como resolver:**

1. Revise o driver em `TFactoryFireDAC.Create`.
2. Confirme se o enum (`dnSQLite`, `dnMySQL`, etc.) está correto.
3. Verifique se a unit `Janus.DML.Generator.<Driver>` foi incluída no projeto.

---

## ELazyLoadException ao acessar relacionamento

**Sintoma:** acesso a `MinhaEntidade.Relacao.Value` falha com mensagem indicando sessão destruída.

**Causa:** o relacionamento lazy foi acessado depois que o contexto de persistência já tinha sido encerrado.

**Como resolver:**

1. Garanta que o primeiro acesso a `.Value` ocorra enquanto a sessão ainda estiver ativa.
2. Evite guardar a entidade para uso posterior fora do ciclo de vida do container.

---

## Relacionamento lazy não atualiza ao navegar no DataSet

**Sintoma:** a tela muda de registro, mas a associação lazy continua mostrando dados da linha anterior.

**Causa:** o objeto foi reutilizado fora do fluxo do `TManagerDataSet` ou o acesso foi feito fora da navegação controlada pelo framework.

**Como resolver:**

1. Abra e navegue o DataSet pelo fluxo normal do manager/container.
2. Evite manter referências antigas da mesma entidade entre trocas de registro.
3. Use o monitor SQL para confirmar a nova carga quando a PK mudar.

---

## Erro de bind em INSERT/UPDATE

**Sintoma:** exceção relacionada a parâmetros na execução.

**Causa:** diferença entre colunas mapeadas e parâmetros esperados no comando.

**Como resolver:**

1. Verifique se todas as propriedades têm atributo `[Column]` consistente.
2. Revise restrições como `NotNull` e campos obrigatórios.
3. Confirme tipos Delphi compatíveis com o tipo do banco.

---

## Tabela ou coluna não encontrada

**Sintoma:** mensagem de erro indicando tabela/coluna inexistente.

**Causa:** divergência entre nome no atributo e nome real no banco.

**Como resolver:**

1. Compare `[Table]` e `[Column]` com o schema real do banco.
2. Ajuste o mapeamento na entidade.
3. Recompile e execute novamente.

---

## Erro E2003: Undeclared identifier `Supports`

**Sintoma:** compilação da suite smoke falha com `E2003 Undeclared identifier: 'Supports'`.

**Causa:** unit necessária para resolver `Supports` ausente no `uses`.

**Como resolver:** inclua `SysUtils` na unit que referencia `Supports`.

---

## Erro F2613: Unit `SysUtils` not found

**Sintoma:** gate de compilação falha com `F2613 Unit 'SysUtils' not found`.

**Causa:** ambiente Delphi não carregado corretamente no script de build.

**Como resolver:** reexecute o fluxo oficial de build e garanta que o compilador Delphi esteja inicializado antes da compilação.
