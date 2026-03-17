---
displayed_sidebar: mcibrSidebar
---

# Troubleshooting

## Exceções de pré-condição (NotaFiscal)

Arquivo: `Models/NotaFiscal.cs`

`NotaFiscal.Processar()` lança `InvalidOperationException` quando:

- `Emitente.RegimeTributario` é `NotDefined`
- `Destinatario.ContribuinteIcms` é `NotDefined`
- `TotalProdutosNF <= 0`

Como resolver:

- Preencha `nf.Emitente.RegimeTributario`
- Preencha `nf.Destinatario.ContribuinteIcms`
- Preencha `nf.TotalProdutosNF` com o total de produtos da NF (mesma base usada para rateios)

## Exceções de pré-condição (Produto)

Arquivo: `Models/Produto.cs`

`Produto.Processar()` lança `InvalidOperationException` quando:

- `PrecoUnitario <= 0`
- `Quantidade <= 0`
- `Cfop <= 0`

Como resolver:

- Preencha `item.PrecoUnitario`, `item.Quantidade` e `item.Cfop`

## Erros de UF/alíquota interestadual

Arquivos: `Models/ImpostoMotor.cs`, `UFAliquotas/GradeAliquotasBase.cs`

Possíveis falhas:

- UF de origem/destino em branco em `BuscarUFAliquota(...)`
- UF destino não encontrada na grade (`KeyNotFoundException`)

Como resolver:

- Garanta que `Emitente.UFSigla` e `Destinatario.UFSigla` estejam preenchidos
- Se você usa arquivo de alíquotas, valide se o conteúdo contém `UF=valor` para a UF destino desejada



