---
displayed_sidebar: developerFriendsSidebar
title: Introdução
---

O **Framework Axial** resolve um problema específico de produtividade: construir sistemas ERP completos em Flutter sem reescrever do zero a infraestrutura de dados, formulários, permissões e navegação — funcionalidades que o Delphi com FireDAC e DBComponents já oferecia de forma madura.

O framework encapsula esses padrões em contratos e componentes reutilizáveis, permitindo que um desenvolvedor adicione uma nova rotina ERP (lista + formulário + permissões) escrevendo apenas metadados e a lógica de negócio específica.

O monorepo `developer-friends` hospeda o framework e os apps que o consomem, gerenciado com [Melos](https://melos.invertase.dev/).

## Conceitos-chave

- **IDataSet:** Contrato central de gestão de dados. Gerencia o ciclo de vida `Browse → Edit → Insert → Saving → Closed` com comandos (`First`, `Next`, `Post`, `Cancel`, `Delete`) e hooks (`BeforePost`, `AfterScroll`, `OnNewRecord`). Equivalente ao `TDataSet` do Delphi.
- **FieldMetadata:** Metadado de campo que carrega validações, máscaras, valores padrão, visibilidade dinâmica e lookups — independente do widget de UI.
- **RoutinePermissions:** Modelo central de permissões que controla ações (`canView`, `canInsert`, `canEdit`, `canDelete`, `canPrint`) e visibilidade de campos (`hiddenFields`, `readOnlyFields`).
- **WorkbenchShell:** Host de UI multi-abas estilo Desktop (Windows/Web) que renderiza rotinas como abas independentes, desacoplado do framework de dados.
- **BasePages:** Conjunto de telas genéricas (`BaseListPage`, `BaseFormPage`, `BaseDetailPage`) que consomem `IDataSet` e `RoutinePermissions` diretamente.

## Público-alvo

- Desenvolvedores Flutter que precisam construir sistemas ERP, administrativos ou fiscais
- Times migrando sistemas Delphi para plataformas modernas
- Desenvolvedores que querem um padrão arquitetural estável para rotinas CRUD complexas

## Por que usar

- Reduz o código boilerplate de cada rotina a definições de metadados e lógica de negócio
- Permissões granulares em 3 camadas (UI, ViewModel, Data) sem duplicação de código
- Telas base prontas com suporte a filtros, ordenação, paginação e ações em lote
- Separação de camadas auditada automaticamente por guardrail tests
- Compatível com Windows, Web (Chrome) e expansível para outras plataformas Flutter
