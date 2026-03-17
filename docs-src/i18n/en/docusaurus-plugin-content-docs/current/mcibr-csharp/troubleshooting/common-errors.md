---
displayed_sidebar: mcibrSidebar
---

# Troubleshooting

## Precondition exceptions (NotaFiscal)

File: `Models/NotaFiscal.cs`

`NotaFiscal.Processar()` throws `InvalidOperationException` when:

- `Emitente.RegimeTributario` is `NotDefined`
- `Destinatario.ContribuinteIcms` is `NotDefined`
- `TotalProdutosNF <= 0`

How to fix:

- Set `nf.Emitente.RegimeTributario`
- Set `nf.Destinatario.ContribuinteIcms`
- Set `nf.TotalProdutosNF` with the invoice total products amount (same base used for allocations)

## Precondition exceptions (Produto)

File: `Models/Produto.cs`

`Produto.Processar()` throws `InvalidOperationException` when:

- `PrecoUnitario <= 0`
- `Quantidade <= 0`
- `Cfop <= 0`

How to fix:

- Set `item.PrecoUnitario`, `item.Quantidade`, and `item.Cfop`

## UF / interstate rate errors

Files: `Models/ImpostoMotor.cs`, `UFAliquotas/GradeAliquotasBase.cs`

Common failures:

- Origin/destination UF is blank when calling `BuscarUFAliquota(...)`
- Destination UF not found in the table (`KeyNotFoundException`)

How to fix:

- Ensure `Emitente.UFSigla` and `Destinatario.UFSigla` are set
- If you use a rate file, ensure it contains `UF=value` for the desired destination UF



