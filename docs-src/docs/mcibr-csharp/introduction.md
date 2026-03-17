---
displayed_sidebar: mcibrSidebar
---

# Introdução

## O que é

O **MCIBr-CSharp** é uma biblioteca .NET (`net8.0`) que implementa um motor de cálculo tributário baseado em:

- Objetos de domínio para **Motor**, **Nota Fiscal**, **Emitente**, **Destinatário** e **Produto** (`Models/`)
- Implementações de impostos/tributos (`Impostos/`)
- Componentes ligados à Reforma Tributária (IBS/CBS/ISE e auxiliares) (`RT/`)
- Pipeline simples de validações acumuladas e executadas ao final (`Validations/`)

## Como o projeto “roda” (alto nível)

Não existe `Program.cs`. O uso típico é:

1. Criar `ImpostoMotor`
2. Preencher dados em `Motor.NotaFiscal` (emitente, destinatário, totais e produtos)
3. Chamar `Motor.Processar()`

O método `ImpostoMotor.Processar()` chama `NotaFiscal.Processar()` e, em seguida, executa `NotaFiscal.ValidationPipes().Validate()`.

## O que é processado por produto

Cada `Produto`:

- Calcula rateios com base nos totais informados na `NotaFiscal` (frete embutido, seguro, despesas, acréscimo, desconto e outros)
- Processa impostos e resultados associados
- Acumula validações no `ValidationPipes` da nota fiscal (quando regras/validadores são aplicados)

## O que não está coberto aqui

Esta documentação descreve estrutura e fluxo **com base no código e testes do repositório**. Quando um comportamento não estiver validado por teste, ele é descrito como “inferido do código”.


