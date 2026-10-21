# Project rules (read before changing code)

- No `features/` folder. Keep page-specific components and types next to their route.
- Reusable components go in `src/components/common/`; shadcn primitives live in `src/components/ui/`.
- Import icons from `@/icons`, never directly from `lucide-react`.
- Organise services and hooks by domain (auth, users, projects ...).
- The Axios instance and both interceptors live in `src/lib/axios.ts`.
- Forms use React Hook Form. Validation rules live in `src/rules/` (no Zod).
- Server state uses TanStack Query. Query keys live in `src/constants/query-keys.ts`.
- Keep `.env.local` at the project root. Never expose secrets in `NEXT_PUBLIC_*` variables.
- Write a short comment above non-obvious code.
- Create files/folders only when needed (no empty ones).
