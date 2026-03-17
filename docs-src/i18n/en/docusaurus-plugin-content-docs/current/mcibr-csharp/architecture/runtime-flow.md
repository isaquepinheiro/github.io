---
displayed_sidebar: mcibrSidebar
---

# Runtime Flow

## Flow principal (Motor → NF → Itens → Validações)

### 1) `ImpostoMotor.Processar()`

Arquivo: `Models/ImpostoMotor.cs`

Comportamento observado:

- Se `NotaFiscal` ainda não foi instanciada, retorna sem processar
- Caso exista, chama:
  - `NotaFiscal.Processar()`
  - `NotaFiscal.ValidationPipes().Validate()`

### 2) `NotaFiscal.Processar()`

Arquivo: `Models/NotaFiscal.cs`

Comportamento observado:

- Executa pré-condições via `DoAssert()`:
  - `Emitente.RegimeTributario` não pode ser `NotDefined`
  - `Destinatario.ContribuinteIcms` não pode ser `NotDefined`
  - `TotalProdutosNF` deve ser `> 0`
- Se houver itens adicionados via `AddProduto()`, processa todos e executa ajuste de diferenças:
  - Processa cada item chamando `Produto.Processar()`
  - Seleciona o item de **maior total** (`AsTotalProduto()`) e chama `ProcessarDiffRateio()` nele
- Caso contrário, processa o `Produto` único (se existir)

### 3) `Produto.Processar()`

Arquivo: `Models/Produto.cs`

Comportamento observado:

- Executa pré-condições via `DoAssert()`:
  - `PrecoUnitario > 0`
  - `Quantidade > 0`
  - `Cfop > 0`
- Aplica regra de validação do produto (por CFOP e outras validações):
  - `new RegraProdutoValidar(this).Validar()`
- Processa rateios do item (proporcional ao valor bruto do item sobre `TotalProdutosNF`)
- Processa impostos:
  - `ProcessarImpostos()` (método interno do `Produto`)

## Rateio e ajuste de diferenças

### Rateio proporcional

Padrão de rateio observado (exemplo):

- `freteRateio = ValorBrutoItem * (FreteEmbutidoNF / TotalProdutosNF)`

Esse padrão aparece para frete embutido, seguro, despesas acessórias, acréscimo, desconto e outros campos.

### Ajuste de diferenças (`ProcessarDiffRateio`)

Quando existem múltiplos itens:

- A nota fiscal escolhe o item com maior `AsTotalProduto()`
- Nesse item, executa rotinas de “diff” para ajustar possíveis diferenças decorrentes de arredondamento/truncamento no rateio

> O ajuste de diferença é inferido da estrutura do código (nome e invocação). O comportamento exato do ajuste depende das rotinas internas `ProcessarDiff*` do `Produto`.

## Validações

O pipeline de validação (`Validations/ValidationPipes.cs`) funciona assim:

- Regras/validators adicionam entradas com `ValidationPipes.Add()`
- Ao final do `Motor.Processar()`, o pipeline executa todos os validadores e acumula mensagens de falha
- O consumidor pode ler mensagens via `NotaFiscal.ValidationPipes().ListMessages()`



