# Quickstart

Este quickstart mostra um uso mínimo do motor baseado nas interfaces públicas (`Interfaces/`) e nos fluxos implementados em `Models/ImpostoMotor.cs`, `Models/NotaFiscal.cs` e `Models/Produto.cs`.

## Requisitos

- .NET 8

## Exemplo: 1 produto

```csharp
using MCIBr.Enums;
using MCIBr.Interfaces;
using MCIBr.Models;

var motor = new ImpostoMotor
{
    TipoOperacao = OperacaoDestino.Interna,
    CalcParam = new CalcParams
    {
        CalcType = CalcType.Round,
        CalcDecimal = 2
    }
};

var nf = motor.NotaFiscal;
nf.ModeloDFe = ModeloDFe.NFe;

nf.TotalProdutosNF = 100;
nf.FreteEmbutidoNF = 0;
nf.SeguroNF = 0;
nf.DespesasAcessoriasNF = 0;
nf.AcrescimoNF = 0;
nf.DescontoNF = 0;

var emit = nf.Emitente;
emit.UFSigla = "SP";
emit.RegimeTributario = RegimeTributario.LucroPresumido;
emit.ContribuinteIpi = ContribuinteIpi.Contribuinte;

var dest = nf.Destinatario;
dest.UFSigla = "SP";
dest.ContribuinteIcms = ContribuinteIcms.Contribuinte;
dest.ConsumidorFinal = false;

var item = nf.Produto;
item.Item = "Produto A";
item.Cfop = 5102;
item.Quantidade = 1;
item.PrecoUnitario = 100;
item.TipoVenda = TipoVenda.Revenda;

motor.Processar();

var mensagens = nf.ValidationPipes().ListMessages();
var valorIcms = item.ICMS.AsValor();
```

## Exemplo: múltiplos produtos (rateio + ajuste de diferenças)

Quando você usa `AddProduto()`, a `NotaFiscal` processa todos os itens e seleciona o **produto com maior total** para executar `ProcessarDiffRateio()`, ajustando diferenças geradas por rateios.

```csharp
using MCIBr.Enums;
using MCIBr.Models;

var motor = new ImpostoMotor();
motor.TipoOperacao = OperacaoDestino.Interna;

var nf = motor.NotaFiscal;
nf.TotalProdutosNF = 300;
nf.FreteEmbutidoNF = 30;

nf.Emitente.UFSigla = "SP";
nf.Emitente.RegimeTributario = RegimeTributario.SimplesNacional;
nf.Destinatario.UFSigla = "RJ";
nf.Destinatario.ContribuinteIcms = ContribuinteIcms.NaoContribuinte;
nf.Destinatario.ConsumidorFinal = true;

var p1 = nf.AddProduto();
p1.Item = "P1";
p1.Cfop = 6102;
p1.Quantidade = 1;
p1.PrecoUnitario = 200;

var p2 = nf.AddProduto();
p2.Item = "P2";
p2.Cfop = 6102;
p2.Quantidade = 1;
p2.PrecoUnitario = 100;

motor.Processar();
```

## Erros comuns

- Se `Emitente.RegimeTributario` não for informado, `NotaFiscal.Processar()` lança `InvalidOperationException`.
- Se `Destinatario.ContribuinteIcms` não for informado, `NotaFiscal.Processar()` lança `InvalidOperationException`.
- Se `TotalProdutosNF` for `<= 0`, `NotaFiscal.Processar()` lança `InvalidOperationException`.
- Se `PrecoUnitario`, `Quantidade` ou `Cfop` do produto estiverem inválidos, `Produto.Processar()` lança `InvalidOperationException`.

Detalhes em: [Troubleshooting](../troubleshooting/common-errors.md).

