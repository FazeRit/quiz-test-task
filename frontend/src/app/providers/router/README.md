# 🧭 Application centralized routing system

## 📚 Navigation

- [Description](#description)
- [📌 Core Concepts](#-core-concepts)
- [🔒 Protected Routes](#-example-protected-route-with-role)
- [🧩 Nested Routes](#-example-nested-route-with-layout)
- [➕ Adding a Route](#-adding-a-route)
- [💡 Tips](#-tips)
- [⚠️ Fallback and Error Handling](#-fallback-and-error-handling)
- [✨ Dynamic Route Paths](#-dynamic-route-paths-and-url-building)
- [🔗 Integration with Routes](#integration-with-routes)

## Description

The routing system is built in a **modular and scalable way**, where each domain (auth, admin, public, etc.) defines its own routes.  
The `routeConfig` acts as the **single source of truth** and entry point for application routes.

---

## 📌 Core Concepts

### 1. **Typed Routes**

Defines route identifiers used in configs. Keys to routeConfig

```ts
export enum AppRoutes {
  HOME = 'HOME',
  AUTH_SPI_SIGN_IN = 'AUTH_SPI_SIGN_IN'
  ...
}
```

### 2. **RouterKeys Constants**

Defines URL paths for application pages

```typescript
export class RouterKeys {
    static readonly HOME = '/home';
    static readonly AUTH_SPI_SIGN_IN = '/auth/spi/sign-in';
...
}
```

> **Important:**  
> In the config, the `path` attribute can always only be a key from RouterKeys

### 3. **Route Configuration**

Each route in `routeConfig` follows the `AppRouteProps` interface,
which provides full control over access, layout, and nesting.

```typescript
interface AppRouteProps {
  path: RouterPath;
  roles?: UserRole[];
  element: ReactNode;
  layout?: ComponentType<{ children: ReactNode }>;
  guestOnly?: boolean;
  authOnly?: boolean;
  children?: AppRouteProps[];
}
```

| Property     | Type                                     | Description                                                                                                           |
| ------------ | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `path`       | `RouterPath`                             | The URL path for the route. Must be one of the constants from `RouterKeys`.                                           |
| `element`    | `ReactNode`                              | The main component rendered for the route.                                                                            |
| `layout?`    | `ComponentType<{ children: ReactNode }>` | Optional layout component to wrap the route's `element`. Useful for auth flows, dashboards, etc.                      |
| `roles?`     | `UserRole[]`                             | Optional list of allowed user roles. If provided, route is restricted to those roles.                                 |
| `guestOnly?` | `boolean`                                | If `true`, route is only available to unauthenticated users (e.g., sign-in/sign-up pages).                            |
| `authOnly?`  | `boolean`                                | If `true`, route is only accessible to authenticated users. Used for protected pages.                                 |
| `children?`  | `AppRouteProps[]`                        | Nested routes (React Router's nested routing). These routes inherit access flags from their parent unless overridden. |

### 🔒 Example: Protected Route with Role

```typescript
{
  path: RouterKeys.ADMIN_HOME_SP,
  element: <AdminSp />,
  authOnly: true,
  roles: [UserRole.ADMIN],
}
```

Requires authentication. Only accessible to users with ADMIN role.

### 🧩 Example: Nested Route with Layout

```typescript
{
  path: RouterKeys.HOME,
  element: <Home />,
  authOnly: true,
  layout: MainLayout,
  children: [
    {
      path: RouterKeys.DASHBOARD,
      element: <DashboardPage />,
    },
  ],
}
```

The **/home/dashboard** page is wrapped with MainLayout.

### 💡 Inheritance

`authOnly`, `guestOnly`, and `roles` cascade to children, unless explicitly overridden.

> You can override access control per nested route for fine-grained logic.

#### For Example:

```typescript
{
  path: RouterKeys.HOME,
  element: <Home />,
  authOnly: true,
  roles: [UserRole.ADMIN],
  children: [
    {
      authOnly: false,
      path: RouterKeys.DASHBOARD,
      element: <DashboardPage />,
    },
  ],
}
```

Now authorization is not needed to access the URL - `RouterKeys.DASHBOARD`.

## ➕ Adding a Route

To add a new route to the application, follow these steps:

---

### 1. **Define the Path**

Add a new path constant to `RouterKeys`. This acts as the single source of truth for route strings:

```ts
// src/shared/constants/router.keys.ts
export class RouterKeys {
  public static readonly DASHBOARD = '/dashboard';
}
```

### 2. **Add Route Identifier**

Declare a new key in the AppRoutes enum:

```typescript
// src/providers/router/enum/app-router.enum.ts
export enum AppRoutes {
  DASHBOARD = 'DASHBOARD',
}
```

### 3. **Add Route Configuration**

Configure the route in your modularized route config (e.g., dashboard.routes.ts):

```typescript
// src/app/providers/router/config/routes/dashboard-routes.config.tsx
import { AppRoutes } from '../enum/app-router.enum';
import { RouterKeys } from '@/shared/constants/router.keys';
import DashboardPage from '@/modules/dashboard/dashboard.page';

export const dashboardRoutes = {
  [AppRoutes.DASHBOARD]: {
    path: RouterKeys.DASHBOARD,
    element: <DashboardPage />,
    authOnly: true,
    roles: [UserRole.ADMIN],
  },
};

```

### 3. **Register the Route**

Include the new route in the core routeConfig file:

```typescript
// src/app/providers/router/route.config.ts
import { dashboardRoutes } from './routes/dashboard-routes.config.tsx';

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  ...dashboardRoutes,
  // other routes...
};
```

### 4. **Done! ✅**

You can now use your route:

```typescript
<Link to={RouterKeys.DASHBOARD}>Dashboard</Link>
```

```typescript
navigate(RouterKeys.DASHBOARD);
```

---

## **💡 Tips**

1. Use layout to wrap pages with a custom UI shell.

2. Keep layout components lightweight and reusable across modules.

3. Prefer lazy-loaded components for large routes using React.lazy().
   **For example:**

```typescript
export const AuthSpiLoginInitPageAsync = lazy(async () => {
  return import('./auth-spi-login-init.page');
});
```

```typescript
export { AuthSpiLoginPageAsync as AuthSpiLoginPage } from './auth-spi-login/auth-spi-login.page.async';
```

---

## ⚠️️ Fallback and Error Handling

You must always include a catch-all route at the bottom of `routeConfig`:

```typescript
{
    other routes...

    [AppRoutes.NOT_FOUND]: {
        path: RouterKeys.ALL_MATCH,
        element: <NotFoundPage />,
    }
}
```

## ✨ Dynamic Route Paths and URL Building

### To safely construct URLs with such dynamic segments,use the `PathBuilder` utility. It helps to:

1. Extract required parameters from path templates

2. Validate presence of parameters before building URLs

3. Build URLs by injecting parameter values into path

4. Support partial or strict URL building

### Methods and Use Cases:

| Method                        | Purpose                                                                                   | Use Case                                                                                          |
| ----------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `requiredParams(path)`        | Returns all parameter keys (e.g., `['userId', 'postId']`) from a path.                    | To introspect which parameters a route expects.                                                   |
| `missingParams(path, params)` | Returns keys missing in `params` but declared in `path`.                                  | To validate if all required parameters are provided before building a URL.                        |
| `build(path, params)`         | Builds a URL by injecting all parameters. Throws error if any required parameter missing. | Use when you want a guaranteed fully constructed URL.                                             |
| `safe(path, params)`          | Injects provided parameters only; missing parameters remain as placeholders.              | Use for partial URL construction or when you want to avoid throwing errors on missing parameters. |

### Example Usage

```typescript
const template = '/users/:userId/posts/:postId';

// Extract required parameters
const paramsRequired = PathBuilder.requiredParams(template);
// ['userId', 'postId']

// Check for missing parameters
const missing = PathBuilder.missingParams(template, { userId: '123' });
// ['postId']

// Build full URL (throws if params missing)
const fullPath = PathBuilder.build(template, { userId: '123', postId: 456 });
// '/users/123/posts/456'

// Build URL safely (missing params stay)
const safePath = PathBuilder.safe(template, { userId: '123' });
// '/users/123/posts/:postId'
```

### Integration with Routes

1. Route paths in RouterKeys can contain dynamic segments, e.g.,

```typescript
static readonly USER_PROFILE = '/users/:userId/profile';
```

2. Use PathBuilder.build() to generate URLs from these paths with runtime parameters:

```typescript
const url = PathBuilder.build(RouterKeys.USER_PROFILE, { userId: '42' });
// '/users/42/profile'
```
