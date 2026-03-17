---
displayed_sidebar: nidusSidebar
title: Common Errors
---

## Response cache does not work

- Ensure `ResponseCache(...)` is registered before `Nidus_Horse`.
- Ensure the route is in the cache list (`ResponseCache([routes], ...)`) or `CacheAll` is enabled.

## Pool is not reusing

- Ensure the pool was registered with `GetNidus.UsePools<T>`.
- Ensure you are using `GetNidus.WithPool<T>` (or `Acquire/Release`) within the same process.





