---
displayed_sidebar: nidusSidebar
title: Instalação
---

## Pré-requisitos

- Delphi com suporte a **Generics**, **RTTI** e **anonymous methods**.
- Se você for usar HTTP: um servidor/framework externo (ex.: **Horse**).

## Instalar no projeto

Este repositório não expõe um instalador/pacote Delphi (DPM/Boss) aqui. A forma suportada por evidência no código é adicionar os sources ao seu projeto.

1. Adicione `d:\Ecossistema-Delphi\Nidus\Source` ao Search Path do seu projeto.
2. Garanta que as dependências externas do seu app estejam instaladas (ex.: Horse, InjectorBr/ModernSyntax, etc.).

## Validar rapidamente

- Compile o projeto de exemplo: `d:\Ecossistema-Delphi\Nidus\Examples\Compiler.dproj`.

:::tip
O exemplo `Compiler.dproj` referencia units do Nidus por caminho relativo (`..\Source\...`) e é um bom “smoke test” de compilação.
:::

