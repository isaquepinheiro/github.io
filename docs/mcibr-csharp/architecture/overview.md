# Arquitetura

## Visão geral

O motor é organizado em camadas/pastas com responsabilidades bem separadas:

- `Models/`: orquestração e ciclo de vida do cálculo (Motor, NotaFiscal, Produto, Emitente, Destinatario)
- `Contexts/`: DTO de contexto para cálculo (`TaxContext`) que reduz acoplamento entre cálculo e objetos do domínio
- `Impostos/`: implementações de cálculo por tributo (ICMS/ICMS-ST, IPI, PIS/COFINS, II, ISSQN, IBPT, etc.)
- `RT/`: componentes ligados à Reforma Tributária (IBS/CBS/ISE + vigência e auxiliares)
- `Validations/`: acumulação e execução de validações (pipeline)
- `Regras/`: regras de validação/negócio aplicadas no processamento
- `UFAliquotas/`: tabela de alíquota interestadual (UF origem → UF destino)
- `Enums/`, `Constants/`, `Utils/`: apoio (tipos fiscais, constantes e funções numéricas)

## Componentes principais (C4 — Componentes)

### ImpostoMotor (orquestrador)

- Responsabilidade: coordenar execução e expor API principal (`IImpostoMotor`)
- Arquivo: `Models/ImpostoMotor.cs`

Funções relevantes:

- `NotaFiscal` (lazy init)
- `Processar()` (executa NF e validações)
- `BuscarUFAliquota(ufOrigem, ufDestino)` (resolve alíquota interestadual via `UFAliquotas/`)

### NotaFiscal (agregador do cálculo)

- Responsabilidade: agrupar emitente/destinatário/produtos/totais e disparar processamento
- Arquivo: `Models/NotaFiscal.cs`

Características:

- Suporta **produto único** (`Produto`) ou **lista de produtos** (`AddProduto()` + `ProdutoList()`)
- Armazena totais usados para rateio (frete embutido, seguro, acréscimos, descontos, etc.)
- Mantém um `ValidationPipes` próprio, executado ao final do `Motor.Processar()`

### Produto (unidade de cálculo)

- Responsabilidade: rateios, regras e processamento de impostos do item
- Arquivo: `Models/Produto.cs`

Características:

- Constrói e atualiza um `TaxContext` antes de instanciar/processar impostos do item
- Seleciona implementação de ICMS conforme o regime tributário do emitente
- Expõe resultados via `ITaxResults` (parcialmente, para alguns tributos)

### TaxContext (DTO de contexto)

- Responsabilidade: transportar dados e callbacks necessários para cálculo sem depender diretamente de `Produto/NotaFiscal`
- Arquivo: `Contexts/TaxContext.cs`

O `TaxContext` inclui:

- parâmetros de arredondamento/truncamento (`CalcParams`)
- dados do emitente/destinatário
- dados do item e rateios
- callback para alíquota interestadual (`OnBuscarAliquotaInterestadual`)
- acesso ao pipeline de validações (`ValidationPipes`)

## Padrões observados

- **Lazy initialization**: `Motor.NotaFiscal`, `NotaFiscal.Emitente`, `NotaFiscal.Destinatario`, `NotaFiscal.Produto`
- **Separação de contexto**: cálculos recebem `TaxContext` para reduzir acoplamento
- **Rateio proporcional por valor bruto**: diversos campos do item são rateados como `ValorBruto * (TotalRateio / TotalProdutosNF)` (inferido do código)

