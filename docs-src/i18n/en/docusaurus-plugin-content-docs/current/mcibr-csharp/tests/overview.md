---
displayed_sidebar: mcibrSidebar
---

# Tests

## Stack

The test project (`Tests/MCIBr.Tests/`) uses:

- xUnit
- Microsoft.NET.Test.Sdk
- coverlet.collector

See `Tests/MCIBr.Tests/MCIBr.Tests.csproj`.

## What tests guarantee (concrete examples)

### Rounding/truncation and helpers

File: `Tests/MCIBr.Tests/UtilsTests.cs`

- Ensures `ResolveValue(..., CalcType.Round, decimals)` works for positive, zero, and negative `decimals`
- Ensures `ResolveValue(..., CalcType.Truncate, decimals)` works for `decimals` in `0..4`
- Ensures `IfThen.Condition(condition, whenTrue, whenFalse)`

### RT effective dates (dates and override)

File: `Tests/MCIBr.Tests/VigenciaTests.cs`

- Ensures behavior around CBS/IS start date (2027-01-01)
- Ensures overriding the date changes the effective-date results
- Ensures transition from ICMS/PIS/COFINS to IBS starting at 2033-01-01

## Tax coverage (by file)

Beyond the examples above, there are multiple tests focused on ICMS/ICMS-ST/DIFAL/FCP scenarios, organized by CST/CSOSN, for example:

- `Csosn101IcmsTests.cs`
- `Csosn201IcmsStTests.cs`
- `Cst00IcmsTests.cs`
- `Cst10IcmsStTests.cs`

> Interpret “expected behavior” strictly from what tests assert (Arrange/Act/Assert) in each file.



