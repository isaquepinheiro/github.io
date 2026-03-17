---
displayed_sidebar: mcibrSidebar
---

# Introduction

## What it is

**MCIBr-CSharp** is a .NET (`net8.0`) library that implements a tax calculation engine based on:

- Domain objects for **Engine**, **Invoice**, **Issuer**, **Recipient**, and **Product** (`Models/`)
- Tax implementations (`Impostos/`)
- Tax Reform components (IBS/CBS/ISE and helpers) (`RT/`)
- A simple validation pipeline accumulated and executed at the end (`Validations/`)

## How the project runs (high level)

There is no `Program.cs`. Typical usage is:

1. Create `ImpostoMotor`
2. Fill data in `Motor.NotaFiscal` (issuer, recipient, totals, and products)
3. Call `Motor.Processar()`

`ImpostoMotor.Processar()` calls `NotaFiscal.Processar()` and then executes `NotaFiscal.ValidationPipes().Validate()`.

## What is processed per product

Each `Produto`:

- Calculates allocations based on totals provided in `NotaFiscal` (embedded freight, insurance, expenses, surcharge, discount, and others)
- Processes taxes and related outputs
- Accumulates validations in invoice `ValidationPipes` (when rules/validators are applied)

## What is not covered here

This documentation describes structure and flow **based on repository code and tests**. When behavior is not validated by tests, it is described as “inferred from code”.



