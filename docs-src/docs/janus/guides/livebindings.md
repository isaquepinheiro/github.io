---
title: Guia — LiveBindings (VCL)
displayed_sidebar: janusSidebar
---

O Janus oferece um engine de LiveBindings (R22+) baseado em atributos e em `TJanusBinder` para vincular propriedades de entidades a controles VCL automaticamente, sem código manual de binding, herança especial ou truques de ordenação no `uses`.

## TJanusBinder

O `TJanusBinder` lê os atributos `[Bind]` da entidade via RTTI, cria os vínculos e mantém os controles sincronizados.

```delphi
// FormCreate
FBinder := TJanusBinder.Create(Self);
FBinder.Bind(FEntidade);    // lê [Bind] via RTTI e cria os links
FBinder.Refresh;            // propaga valores iniciais para os controles

// FormDestroy
FBinder.Free;               // libere antes de liberar a entidade
```

- `Bind(AEntity)` percorre as propriedades via RTTI e cria um `TLinkPropertyToField` por anotação `[Bind]` encontrada.
- `Refresh` força a re-leitura do adapter. Chamar após alterações programáticas nas propriedades da entidade.
- `FBinder` deve ser liberado antes da entidade passada para `Bind`.

## Atributos disponíveis

| Atributo | Uso |
|----------|-----|
| `[Bind('controle', 'propriedade')]` | Vincula uma propriedade da entidade a um controle via `TLinkPropertyToField` |
| `[BindGrid('grid')]` | Declara que a propriedade alimenta uma grade |
| `[BindGridDetail('grid', 'propMestre')]` | Declara binding de detalhe |
| `[BindListControl('controle', 'campo')]` | Declara binding de lista |
| `[BindGridColumn('título', largura, visível)]` | Metadados de coluna para uso com `ConfigureGridColumns` |

## Exemplo: controles simples (VCL)

Entidade (PODO — sem herança especial):

```delphi
unit produto;

interface

uses Janus.Binder.Attributes;

type
  TProduto = class
  private
    FID: Integer;
    FPreco: Double;
    FSoma: Double;
    procedure SetID(const AValue: Integer);
    procedure SetPreco(const AValue: Double);
  public
    [Bind('EditID', 'Text')]
    [Bind('LabelID', 'Caption')]
    property ID: Integer read FID write SetID;

    [Bind('EditPreco', 'Text')]
    property Preco: Double read FPreco write SetPreco;

    [Bind('EditSoma', 'Text')]
    property Soma: Double read FSoma;  // campo computado: somente leitura
  end;
```

Formulário (trecho):

```delphi
uses Janus.Binder;

procedure TFormPrincipal.FormCreate(Sender: TObject);
begin
  FProduto := TProduto.Create;
  FBinder := TJanusBinder.Create(Self);
  FBinder.Bind(FProduto);
  FProduto.ID := 1;
  FProduto.Preco := 10;
  FBinder.Refresh;
  EditSoma.ReadOnly := True;
end;

procedure TFormPrincipal.BtnAtualizarClick(Sender: TObject);
begin
  FProduto.ID := FProduto.ID * 2;
  FProduto.Preco := FProduto.Preco * 4.5;
  FBinder.Refresh;
end;
```

## Exemplo: grade (VCL)

```delphi
type
  TPedido = class
  private
    FId: Integer;
    FDescricao: string;
  published
    [BindGridColumn('Código', 60)]
    property Id: Integer read FId write FId;

    [BindGridColumn('Descrição', 200)]
    property Descricao: string read FDescricao write FDescricao;
  end;

// No formulário
FBinder.BindGrid<TPedido>(LPedidos, 'GridPedidos');
FBinder.ConfigureGridColumns('GridPedidos', TPedido);
```

:::note
`ConfigureGridColumns` suporta `TStringGrid`. Grades do tipo `TDBGrid` ou de terceiros não são suportadas nesta versão.
:::

## Exemplo: controle de lista (VCL)

```delphi
FBinder.BindList<TPedido>(LPedidos, 'ListBoxPedidos', 'Descricao');
```

## FMX

O suporte a projetos FMX em `TJanusBinder` está previsto para um ciclo futuro. O engine FMX legado foi removido a partir de v2.22.0.
