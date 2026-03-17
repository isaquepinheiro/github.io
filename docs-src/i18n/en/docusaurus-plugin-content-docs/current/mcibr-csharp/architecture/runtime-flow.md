---
displayed_sidebar: mcibrSidebar
---

# Runtime Flow

## Main flow (Motor → NF → Items → Validations)

### 1) `ImpostoMotor.Processar()`

File: `Models/ImpostoMotor.cs`

Observed behavior:

- If `NotaFiscal` has not been instantiated yet, it returns without processing
- Otherwise, it calls:
  - `NotaFiscal.Processar()`
  - `NotaFiscal.ValidationPipes().Validate()`

### 2) `NotaFiscal.Processar()`

File: `Models/NotaFiscal.cs`

Observed behavior:

- Runs preconditions through `DoAssert()`:
  - `Emitente.RegimeTributario` must not be `NotDefined`
  - `Destinatario.ContribuinteIcms` must not be `NotDefined`
  - `TotalProdutosNF` must be `> 0`
- If there are items added via `AddProduto()`, it processes all and applies difference adjustment:
  - Processes each item by calling `Produto.Processar()`
  - Selects the **highest-total** item (`AsTotalProduto()`) and calls `ProcessarDiffRateio()` on it
- Otherwise, it processes the single `Produto` (if available)

### 3) `Produto.Processar()`

File: `Models/Produto.cs`

Observed behavior:

- Runs preconditions through `DoAssert()`:
  - `PrecoUnitario > 0`
  - `Quantidade > 0`
  - `Cfop > 0`
- Applies product validation rule (by CFOP and other validations):
  - `new RegraProdutoValidar(this).Validar()`
- Processes item allocations (proportional to item gross value over `TotalProdutosNF`)
- Processes taxes:
  - `ProcessarImpostos()` (método interno do `Produto`)

## Allocation and difference adjustment

### Proportional allocation

Observed allocation pattern (example):

- `freteRateio = ValorBrutoItem * (FreteEmbutidoNF / TotalProdutosNF)`

This pattern appears for embedded freight, insurance, ancillary expenses, surcharge, discount, and other fields.

### Difference adjustment (`ProcessarDiffRateio`)

When multiple items exist:

- The invoice selects the item with highest `AsTotalProduto()`
- On that item, it runs “diff” routines to adjust possible differences caused by rounding/truncation in allocations

> Difference adjustment is inferred from code structure (name and invocation). Exact behavior depends on internal `ProcessarDiff*` routines in `Produto`.

## Validations

The validation pipeline (`Validations/ValidationPipes.cs`) works as follows:

- Rules/validators add entries through `ValidationPipes.Add()`
- At the end of `Motor.Processar()`, the pipeline executes all validators and accumulates failure messages
- Consumers can read messages through `NotaFiscal.ValidationPipes().ListMessages()`



