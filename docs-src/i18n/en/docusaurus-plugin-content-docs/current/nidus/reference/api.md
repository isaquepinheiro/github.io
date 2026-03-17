---
displayed_sidebar: nidusSidebar
title: API (Reference)
---

Esta página lista a superfície pública principal do Nidus (por unidade), com foco em uso.

## Entrypoint

- Unit: `Nidus`
  - `function GetNidus: TNidus;`

## TNidus (runtime)

- Unit: `Nidus`
  - `function Start(const AModule: TModule; const AInitialRoutePath: string = '/'): TNidus;`
  - `function LoadRouteModule(const APath: string; const AReq: IRouteRequest = nil): TReturnPair;`
  - `procedure DisposeRouteModule(const APath: string);`
  - `procedure Finalize;`
  - `function Get<T: class, constructor>(ATag: string = ''): T;`
  - `function GetInterface<I: IInterface>(ATag: string = ''): I;`
  - `function Request: IRouteRequest;`

## Routes e módulos

- Unit: `Nidus.Module`
  - `function RouteModule(const APath: string; const AModule: TModuleClass): TRouteModule; overload;`
  - `function RouteModule(const APath: string; const AModule: TModuleClass; const AMiddlewares: TMiddlewares): TRouteModule; overload;`
  - `function RouteChild(const APath: string; const AModule: TModuleClass; const AMiddlewares: TMiddlewares = []): TRouteChild;`

## Middlewares (guards)

- Unit: `Nidus.Route.Abstract`
  - `IRouteMiddleware` (`Before/Call/After`)
  - `TRouteMiddleware` (implementação default)

## Cache de módulo

- Unit: `Nidus`
  - `function UseCache(const ACache: IModuleCache): TNidus; overload;`
  - `function UseCache(const ACache: IModuleCache; const AModules: array of TClass): TNidus; overload;`
- Implementação padrão:
  - Unit: `Nidus.Module.Cache` → `TModuleCacheManager`

## Pools

- Unit: `Nidus`
  - `function UsePools<T: class, constructor>(const AMaxSize: Integer = 256): TNidus; overload;`
  - `function UsePools<T: TComponent>(const AMaxSize: Integer = 32; const AOwner: TComponent = nil; const AReset: TProc<T> = nil): TNidus; overload;`
  - `procedure WithPool<T: class>(const AProc: TProc<T>); overload;`
- Registry/contratos:
  - Unit: `Nidus.Pooling.Interfaces` → `IPool`, `IPoolRegistry`

## Driver Horse

- Unit: `Nidus.Driver.Horse`
  - `function Nidus_Horse(const AAppModule: TModule): THorseCallback; overload;`
  - `function Nidus_Horse(const ACharset: String): THorseCallback; overload;`

## Response cache (Horse)

- Unit: `Horse.ResponseCache`
  - `function ResponseCache(const ATtlSeconds: Integer; const AMaxEntries: Integer = 5000; const AVaryAuthorization: Boolean = True): THorseCallback; overload;`
  - `function ResponseCache(const ACacheRoutes: array of string; const ATtlSeconds: Integer = 30; const AMaxEntries: Integer = 5000; const AVaryAuthorization: Boolean = True): THorseCallback; overload;`



