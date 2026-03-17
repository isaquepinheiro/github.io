---
displayed_sidebar: mcibrSidebar
---

# Architecture

## Overview

The engine is organized into layers/folders with clear responsibilities:

- `Models/`: calculation orchestration and lifecycle (Motor, NotaFiscal, Produto, Emitente, Destinatario)
- `Contexts/`: calculation context DTO (`TaxContext`) to reduce coupling between calculations and domain objects
- `Impostos/`: tax calculation implementations (ICMS/ICMS-ST, IPI, PIS/COFINS, II, ISSQN, IBPT, etc.)
- `RT/`: Tax Reform components (IBS/CBS/ISE + effective date and helpers)
- `Validations/`: validation accumulation and execution (pipeline)
- `Regras/`: validation/business rules applied during processing
- `UFAliquotas/`: interstate rate table (origin UF → destination UF)
- `Enums/`, `Constants/`, `Utils/`: support utilities (fiscal types, constants, numeric helpers)

## Main components (C4 — Components)

### ImpostoMotor (orchestrator)

- Responsibility: coordinate execution and expose the main API (`IImpostoMotor`)
- File: `Models/ImpostoMotor.cs`

Relevant functions:

- `NotaFiscal` (lazy init)
- `Processar()` (executes invoice and validations)
- `BuscarUFAliquota(ufOrigem, ufDestino)` (resolves interstate rate via `UFAliquotas/`)

### NotaFiscal (calculation aggregator)

- Responsibility: aggregate issuer/recipient/products/totals and trigger processing
- File: `Models/NotaFiscal.cs`

Characteristics:

- Supports **single product** (`Produto`) or **product list** (`AddProduto()` + `ProdutoList()`)
- Stores totals used for allocation (embedded freight, insurance, surcharges, discounts, etc.)
- Keeps its own `ValidationPipes`, executed at the end of `Motor.Processar()`

### Produto (calculation unit)

- Responsibility: allocations, rules, and per-item tax processing
- File: `Models/Produto.cs`

Characteristics:

- Builds and updates `TaxContext` before instantiating/processing item taxes
- Selects ICMS implementation according to issuer tax regime
- Exposes results through `ITaxResults` (partially, for selected taxes)

### TaxContext (context DTO)

- Responsibility: carry calculation data and callbacks without directly depending on `Produto/NotaFiscal`
- File: `Contexts/TaxContext.cs`

`TaxContext` includes:

- rounding/truncation parameters (`CalcParams`)
- issuer/recipient data
- item and allocation data
- interstate rate callback (`OnBuscarAliquotaInterestadual`)
- access to validation pipeline (`ValidationPipes`)

## Observed patterns

- **Lazy initialization**: `Motor.NotaFiscal`, `NotaFiscal.Emitente`, `NotaFiscal.Destinatario`, `NotaFiscal.Produto`
- **Context separation**: calculations receive `TaxContext` to reduce coupling
- **Proportional allocation by gross amount**: several item fields are allocated as `ValorBruto * (TotalRateio / TotalProdutosNF)` (inferred from code)



