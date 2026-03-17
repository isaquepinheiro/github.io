---
displayed_sidebar: mcibrSidebar
---

# Testes

## Stack

O projeto de testes (`Tests/MCIBr.Tests/`) usa:

- xUnit
- Microsoft.NET.Test.Sdk
- coverlet.collector

Definições em `Tests/MCIBr.Tests/MCIBr.Tests.csproj`.

## O que os testes garantem (exemplos concretos)

### Arredondamento/truncamento e helpers

Arquivo: `Tests/MCIBr.Tests/UtilsTests.cs`

- Garante `ResolveValue(..., CalcType.Round, decimals)` para casos com `decimals` positivo, zero e negativo
- Garante `ResolveValue(..., CalcType.Truncate, decimals)` para `decimals` de `0..4`
- Garante `IfThen.Condition(condition, whenTrue, whenFalse)`

### Vigência RT (datas e override)

Arquivo: `Tests/MCIBr.Tests/VigenciaTests.cs`

- Garante o comportamento em torno da data de início da CBS/IS (2027-01-01)
- Garante que o override de data altera o resultado das funções de vigência
- Garante transição de cálculo ICMS/PIS/COFINS versus IBS a partir de 2033-01-01

## Cobertura de tributos (por arquivo)

Além dos exemplos acima, há diversos testes focados em cenários de ICMS/ICMS-ST/DIFAL/FCP, organizados por CST/CSOSN, por exemplo:

- `Csosn101IcmsTests.cs`
- `Csosn201IcmsStTests.cs`
- `Cst00IcmsTests.cs`
- `Cst10IcmsStTests.cs`

> A interpretação de “comportamento esperado” deve ser sempre derivada do que os testes afirmam (Arrange/Act/Assert) em cada arquivo.


