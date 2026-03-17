---
displayed_sidebar: mcibrSidebar
---

# Reference (API)

This page summarizes the public engine API, mainly based on `Interfaces/MotorInterfaces.cs`.

## `IImpostoMotor`

Responsibility: calculation configuration and orchestration.

Propriedades/métodos principais:

- `TipoOperacao` (`OperacaoDestino`)
- `CalcParam` (`CalcParams`)
- `NotaFiscal` (`INotaFiscal`)
- `ValidationPipes()` (`IValidationPipes`)
- `BuscarUFAliquota(ufOrigem, ufDestino)` (interstate tax rate)
- `Processar()`
- `OnNotifyAlert` + `NotifyAlert(value)` (consumer notifications)

Implementation: `Models/ImpostoMotor.cs`.

## `INotaFiscal`

Responsibility: aggregate global document/item data and centralize validations.

Key points:

- Access to `Emitente`, `Destinatario`, and `Produto` (single-product mode)
- Support for item list: `AddProduto()` + `ProdutoList()`
- Totals used for allocation: `TotalProdutosNF`, `FreteEmbutidoNF`, `SeguroNF`, `DespesasAcessoriasNF`, `AcrescimoNF`, `DescontoNF`, etc.
- `ValidationPipes()` + `Processar()`

Implementation: `Models/NotaFiscal.cs`.

## `IProduto`

Responsibility: represent item data and expose taxes/results.

Basic item fields:

- `Item`, `Cfop`, `Quantidade`, `PrecoUnitario`, `TipoVenda`
- `Acrescimo`, `Desconto`

Item allocations and totals:

- `AsValorBruto()`, `AsValorLiquido()`, `AsTotalProduto()`
- `AsFreteEmbutidoRateio()`, `AsSeguroRateio()`, `AsDespesasAcessoriasRateio()`, etc.

Exposed taxes (via interfaces):

- `ICMS`, `IPI`, `PIS`, `COFINS`, `ISSQN`, `II`, `IBPT`
- `IBS`, `CBS`, `ISE` (RT)

Implementation: `Models/Produto.cs`.

## `CalcParams`

File: `Interfaces/CalcParams.cs`

- `CalcType`: `Round` ou `Truncate`
- `CalcDecimal`: decimal places

`CalcParams` is used in normalization and total-closing operations (e.g., `NotaFiscal.Total*Rateio()` through `Utils.ResolveValue`).

## `IValidationPipes`

Responsibility: accumulate validations during processing and evaluate them later.

File: `Validations/ValidationPipes.cs`.

## Full detail

`Interfaces/MotorInterfaces.cs` contains multiple tax/subcomponent interfaces (ICMS-ST, DIFAL, FCP, RT, etc.). This page documents the top-level consumer-facing surface.



