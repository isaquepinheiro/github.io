---
displayed_sidebar: nidusSidebar
title: Installation
---

## Prerequisites

- Delphi with support for **Generics**, **RTTI**, and **anonymous methods**.
- If you are using HTTP: an external server/framework (e.g., **Horse**).

## Install in your project

This repository does not expose a Delphi installer/package (DPM/Boss) here. The supported path evidenced by the code is adding sources to your project.

1. Add `d:\Ecossistema-Delphi\Nidus\Source` to your project Search Path.
2. Ensure your app external dependencies are installed (e.g., Horse, InjectorBr/ModernSyntax, etc.).

## Quick validation

- Compile the sample project: `d:\Ecossistema-Delphi\Nidus\Examples\Compiler.dproj`.

:::tip
The `Compiler.dproj` sample references Nidus units through relative paths (`..\Source\...`) and is a good compilation smoke test.
:::




