---
displayed_sidebar: mcibrSidebar
---

# Reference (API)

Esta página resume a API pública do motor, baseada principalmente no arquivo `Interfaces/MotorInterfaces.cs`.

## `IImpostoMotor`

Responsabilidade: configuração e orquestração do cálculo.

Propriedades/métodos principais:

- `TipoOperacao` (`OperacaoDestino`)
- `CalcParam` (`CalcParams`)
- `NotaFiscal` (`INotaFiscal`)
- `ValidationPipes()` (`IValidationPipes`)
- `BuscarUFAliquota(ufOrigem, ufDestino)` (alíquota interestadual)
- `Processar()`
- `OnNotifyAlert` + `NotifyAlert(value)` (notificações para o consumidor)

Implementação: `Models/ImpostoMotor.cs`.

## `INotaFiscal`

Responsabilidade: agrupar dados globais do documento e itens, além de concentrar validações.

Pontos principais:

- Acesso a `Emitente`, `Destinatario` e `Produto` (produto único)
- Suporte a lista de itens: `AddProduto()` + `ProdutoList()`
- Totais usados no rateio: `TotalProdutosNF`, `FreteEmbutidoNF`, `SeguroNF`, `DespesasAcessoriasNF`, `AcrescimoNF`, `DescontoNF`, etc.
- `ValidationPipes()` + `Processar()`

Implementação: `Models/NotaFiscal.cs`.

## `IProduto`

Responsabilidade: representar o item e expor impostos e resultados.

Campos básicos do item:

- `Item`, `Cfop`, `Quantidade`, `PrecoUnitario`, `TipoVenda`
- `Acrescimo`, `Desconto`

Rateios e totais do item:

- `AsValorBruto()`, `AsValorLiquido()`, `AsTotalProduto()`
- `AsFreteEmbutidoRateio()`, `AsSeguroRateio()`, `AsDespesasAcessoriasRateio()`, etc.

Impostos expostos (via interfaces):

- `ICMS`, `IPI`, `PIS`, `COFINS`, `ISSQN`, `II`, `IBPT`
- `IBS`, `CBS`, `ISE` (RT)

Implementação: `Models/Produto.cs`.

## `CalcParams`

Arquivo: `Interfaces/CalcParams.cs`

- `CalcType`: `Round` ou `Truncate`
- `CalcDecimal`: casas decimais

O `CalcParams` é usado em operações de normalização e fechamento de totais (ex.: `NotaFiscal.Total*Rateio()` via `Utils.ResolveValue`).

## `IValidationPipes`

Responsabilidade: acumular validações durante o processamento e avaliá-las posteriormente.

Arquivo: `Validations/ValidationPipes.cs`.

## Detalhamento completo

O arquivo `Interfaces/MotorInterfaces.cs` contém diversas interfaces de tributos e subcomponentes (ICMS-ST, DIFAL, FCP, RT, etc.). Esta página documenta o “topo” do consumo.



