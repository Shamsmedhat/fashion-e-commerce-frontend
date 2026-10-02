# Project Rules & Conventions

This file is read automatically by Claude CLI.
Apply ALL rules in this file to every file you create or edit — no exceptions.

---

## Stack

- Framework: Next.js 14 (App Router)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS + shadcn/ui
- Data Fetching: TanStack React Query v5
- Forms: React Hook Form + Zod
- Auth: NextAuth v4
- i18n: next-intl v4
- Toasts: Sonner

---

## Folder Structure

```
src/
├── app/
│   ├── api/
│   │   └── <route>/
│   │       └── route.ts                  # Route Handler (avoid exposing tokens/API URL)
│   ├── <route>/                          # kebab-case always
│   │   ├── _actions/                     # Private server actions (not reused elsewhere)
│   │   │   └── <action-name>.action.ts
│   │   ├── _components/                  # Truly private, one-off components only
│   │   │   └── <component-name>.tsx      # NOT for feature sections — those go in features/
│   │   ├── _hooks/                       # Truly private, throwaway hooks only
│   │   │   └── <hook-name>.ts
│   │   ├── _utils/                       # Private utils (not reused elsewhere)
│   │   │   └── <utility-name>.ts
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── error.tsx
│   ├── global-error.tsx
│   ├── not-found.tsx
│   └── loading.tsx
│
├── components/
│   ├── shared/          # Generic UI, zero domain knowledge (EmptyState, ConfirmDialog...)
│   ├── features/        # Anything belonging to a feature domain, grouped by domain name
│   │   └── <feature>/   # (home/, products/, auth/, bag/, categories/...)
│   │                    # regardless of how many routes currently use it
│   ├── skeletons/
│   │   ├── shared/      # Base skeleton building blocks
│   │   └── <feature>/   # Feature skeletons — mirrors features/ folder names
│   ├── layout/
│   │   ├── app/         # Global persistent UI: Navbar, Footer
│   │   └── <feature>/   # Feature layout: sidebar, auth-header
│   ├── providers/
│   │   ├── app/
│   │   │   ├── index.tsx
│   │   │   └── components/
│   │   │       └── <provider>.provider.tsx
│   │   └── <feature>/
│   │       └── <provider>.provider.tsx
│   └── ui/              # shadcn generated — NEVER edit manually
│
├── hooks/
│   ├── shared/          # Non-feature-specific hooks
│   └── <feature>/       # Feature hooks — regardless of reuse count
│
├── lib/
│   ├── constants/       # <feature>.constant.ts
│   ├── schemes/         # Zod schemas — <feature>.schema.ts
│   ├── types/           # TypeScript types — <feature>.d.ts
│   ├── utils/           # Utility functions
│   ├── services/        # GET fetch wrappers for Server Components
│   └── actions/         # Global server actions reused across routes
│
├── messages/
│   └── <language>.json  # Flat, one-level translations only
│
├── i18n/
│   ├── request.ts
│   ├── routing.ts
│   └── navigation.ts
│
├── middleware.ts
└── auth.ts
```

---

## Naming Conventions

| Type            | Convention                  | Example                     |
| --------------- | --------------------------- | --------------------------- |
| Route folders   | kebab-case                  | `forgot-password/`          |
| Components      | PascalCase                  | `ProductCard.tsx`           |
| Hooks           | camelCase + `use` prefix    | `useProducts.ts`            |
| Schemas         | camelCase + `Schema` suffix | `loginSchema`               |
| Services        | feature name                | `auth.service.ts`           |
| Actions         | camelCase + `Action` suffix | `registerAction`            |
| Constants       | SCREAMING_SNAKE_CASE        | `JSON_HEADER`               |
| Type files      | camelCase + `.d.ts`         | `product.d.ts`              |
| Skeleton files  | end in `.skeleton.tsx`      | `product-card.skeleton.tsx` |
| Feature folders | always plural               | `products/`, `categories/`  |

---

## Code Style — CRITICAL — Apply to every file

### Blank lines between sections

Always leave a blank line after:

- `"use client"` directive
- import block
- each logical section inside a component or function

### Section comments

Add a short concise comment before each logical section inside every component.
Never remove existing section comments.
Never write long or obvious comments.

```typescript
// ✅ Correct
"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function MyComponent() {
  // Translation
  const t = useTranslations();

  // State
  const [open, setOpen] = useState(false);

  // Queries
  const { data } = useProducts();

  // Functions
  function handleOpen() { setOpen(true); }

  return <></>;
}
```

### Component internal order — always follow this sequence

```
// Translation
// Navigation
// State
// Ref
// Context
// Hooks
// Queries
// Mutation
// Form & validation
// Variables
// Functions
// Effects
```

### Form field comment structure — always use inside every FormField

```tsx
{
  /* Field name */
}
<FormField
  control={form.control}
  name="fieldName"
  render={({ field }) => (
    <FormItem>
      {/* Label */}
      <FormLabel>{t("label")}</FormLabel>

      {/* Field */}
      <FormControl>
        <Input {...field} />
      </FormControl>

      {/* Feedback */}
      <FormMessage />
    </FormItem>
  )}
/>;
```

---

## Code Quality

- No `console.log` anywhere — use `console.error` only in catch blocks
- No commented-out code — remove dead code entirely
- No unused imports — every import must be used
- No `any` type — use `unknown` and narrow it
- Named exports for all components — default export only for pages and layouts
- One component per file
- Stable keys in lists — use item ID, never array index
  - Exception: static skeleton placeholder arrays may use index

---

## Import Order

```typescript
// 1. React / Next.js core
import { useState } from "react";

// 2. Third-party libraries
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

// 3. Internal aliases
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/lib/schemes/auth.schema";

// 4. Relative
import { ProductCard } from "./ProductCard";
import type { ProductCardProps } from "./types";
```

---

## TypeScript

- Never use `any` — use `unknown` and narrow it
- Always derive types from Zod schemas: `z.infer<typeof schema>`
- Type all function return values explicitly
- Prefer discriminated unions over boolean flags
- Zod schemas must be static module-level exports — never inside hooks or components

```typescript
// ✅ Good
export const loginSchema = z.object({ ... });
export type LoginFields = z.infer<typeof loginSchema>;

// ❌ Bad — schema inside a hook
export function useLoginSchema() {
  return z.object({ ... });
}
```

---

## Next.js Rules

- Default to Server Components — add `"use client"` only when needed
- NEVER place `"use client"` on page.tsx or layout.tsx
- Extract interactive parts into `_components/` child files
- Suspense child must be `async` — non-async components in Suspense have no effect
- Every async Server Component must be wrapped in `<Suspense>` by its parent
- Use `next/image` everywhere — never `<img>`
- Never use Axios — use native `fetch()`

```typescript
// ✅ page.tsx stays Server Component
export default async function ProductsPage() {
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductList />  {/* async Server Component */}
    </Suspense>
  );
}
```

---

## Data Fetching

- Server-side fetching is the default — call services in async Server Components
- Client-side fetching only when data depends on interactivity or client state
- Never fetch in `useEffect`
- Never filter or sort data on the client if the server can do it

### Services (GET — Server Components)

```typescript
// lib/services/product.service.ts
export async function getProductsService(params?: QueryParams): Promise<ProductsResponse> {
  const response = await fetch(`${process.env.API_URL}/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json().catch(() => ({
      status: "error" as const,
      message: `Request failed with status ${response.status}`,
    }));
    throw new AppError(errorData.message, response.status);
  }

  return response.json();
}
```

### Actions (mutations — Server Actions)

Actions never throw to the client: Next.js replaces a thrown error's message with a generic one
in production builds. They return an `ActionResult<T>` (`lib/utils/action-result.ts`), and the
mutation hook turns a failure back into an `AppError` with `unwrapActionResult`.

```typescript
// lib/actions/bag.action.ts
"use server";

export async function addToBagAction(data: AddToBagRequest): Promise<ActionResult<BagResponse>> {
  return runAction(() =>
    authedFetch<BagResponse>("/users/bag/add", { method: "POST", body: JSON.stringify(data) }),
  );
}
```

`authedFetch` (`lib/utils/authed-fetch.ts`) is the one place that calls the API on behalf of the
logged-in shopper; it throws `AppError` with the API's message and status.

---

## Mutations Flow

Always follow this three-layer pattern:

```
Server Action → Custom Hook (useMutation) → Form / Client Component
```

- Custom hook wraps every `useMutation` and `useQuery` — never call them raw in components
- Always handle `onError` inside the mutation hook with `toast.error()`
- Query keys centralized in `lib/constants/query-keys.constant.ts`

```typescript
// hooks/auth/use-register.ts
export default function useRegister() {
  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: RegistrationFields) => registerAction(fields),
    onSuccess: () => {
      router.push(`/auth/login?${searchParams.toString()}`);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  return { isPending, error, register: mutate };
}
```

---

## Error Handling

- Services throw `AppError(message, statusCode)` — never generic `Error`
- Always parse the error response body to get the message
- Actions return failures as data (`ActionResult`) — a thrown error loses its message in production
- Mutations handle errors in `onError` with `toast.error()`
- `error.tsx` files reset via the `reset` prop — always include a retry button

```typescript
// AppError usage in services
if (!response.ok) {
  const errorData: ErrorResponse = await response.json().catch(() => ({
    status: "error" as const,
    message: `Request failed with status ${response.status}`,
  }));
  throw new AppError(errorData.message, response.status);
}
```

---

## Forms

- Define Zod schema first in `lib/schemes/<feature>.schema.ts`
- Derive type with `z.infer` — never write types manually for form fields
- Always use shadcn `<Form>` + `<FormField>` — never raw HTML forms
- Use `zodResolver` — never manual validation
- Disable submit button with `isPending` or `form.formState.isSubmitting`

---

## Styling

- `cn()` for all conditional classNames — never string concatenation
- shadcn CSS variable tokens only — no hardcoded color values (`text-gray-500` etc.)
- Tailwind utility scale only — no arbitrary static values (`w-[1280px]`)
- Text casing via CSS classes (`uppercase`, `capitalize`) — never hardcode content
- Always accept and forward `className` prop in reusable components
- NEVER edit files inside `components/ui/` — shadcn owned
- UI must be pixel-perfect — match Figma design exactly at all breakpoints

---

## i18n

- Flat (one-level) translation keys only — never nested objects
- All user-facing strings through `useTranslations()` — zero hardcoded text
- `useRouter`, `usePathname`, `Link` → import from `@/i18n/navigation`
- `useSearchParams` → import from `next/navigation` (this one is correct)
- RTL-aware classes in shared components: `ms-*`, `ps-*`, `text-start`, `text-end`
- Never use `text-left` / `text-right` in shared/reusable components

---

## Components

- Every data-driven component handles: loading + error + empty states
- Every data-driven component has a matching skeleton in `components/skeletons/<feature>/`
- Skeletons contain only `<Skeleton>` from shadcn — no logic, no data fetching
- `components/shared/` only for components with zero domain knowledge
- NEVER import from a sibling feature folder — promote to `shared/` instead

---

## Auth

- Auth config in `auth.ts` at project root
- Use `auth()` in Server Components for session
- Use `useSession()` in Client Components for session
- Protect routes in `middleware.ts` — not inside pages

---

## Toast (Sonner)

- `toast.success()` in `onSuccess` callbacks
- `toast.error()` in `onError` callbacks
- Never call toast inside render
- `toast.promise()` for async operations with loading state

---

## Providers

- All global providers grouped in `components/providers/app/index.tsx`
- Never scatter providers across layout files

---

## Performance

- `next/dynamic` for heavy client-only components with a skeleton fallback
- Set `staleTime` explicitly on every `useQuery` call
- Server-side filtering/sorting always preferred over client-side
