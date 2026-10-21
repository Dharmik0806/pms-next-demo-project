# PMS – Project Management System

Two separate apps:

| Folder | Stack |
| --- | --- |
| `pms-frontend/` | Next.js 16.4.2 (App Router), TypeScript, Tailwind v4, shadcn/ui, React Hook Form, TanStack Query, Axios |
| `pms-backend/`  | Express 5, TypeScript, Mongoose 9 (MongoDB), JWT auth |

## 1. Requirements
- Node.js 20.9 or newer (22 recommended)
- MongoDB 6+ running locally (`mongodb://127.0.0.1:27017`) **or** a free MongoDB Atlas connection string

## 2. Start the backend
```bash
cd pms-backend
npm install
# .env is already created – edit MONGODB_URI / JWT_SECRET if needed
npm run seed     # optional: demo users + projects
npm run dev      # http://localhost:5000/api
```
Demo logins created by the seed:

| Role | Email | Password |
| --- | --- | --- |
| Admin | admin@pms.dev | Admin@123 |
| Manager | manager@pms.dev | Manager@123 |
| Member | member@pms.dev | Member@123 |

If you skip the seed, register in the UI. **The first account becomes the admin.**

## 3. Start the frontend
```bash
cd pms-frontend
npm install
# .env.local is already created – NEXT_PUBLIC_API_URL must point to the backend
npm run dev      # http://localhost:3000
```
Production: `npm run build && npm start` (frontend) and `npm run build && npm start` (backend).

## 4. What you can do
- Register / log in (JWT), stay logged in, log out
- **Dashboard** – totals, overdue count, status + priority breakdown, latest projects
- **Projects** – create, edit, delete, search, filter by status/priority, pagination, team members, progress
- **Users** – list + search + role filter; admins can change roles, disable/enable, delete
- **Profile** – change name/avatar and password
- Light / dark theme, responsive layout

### Permissions
| Action | Admin | Manager / Member |
| --- | --- | --- |
| See projects | all | only ones they own or belong to |
| Edit / delete project | any | only their own |
| Change roles, disable, delete users | yes | no |

## 5. API overview (`/api`)
| Method | Path | Notes |
| --- | --- | --- |
| POST | `/auth/register`, `/auth/login` | public |
| GET / PATCH | `/auth/me` | current user / update profile |
| PATCH | `/auth/password` | change password |
| GET | `/users?search=&role=&page=&limit=` | list |
| PATCH | `/users/:id/role`, `/users/:id/active` | admin only |
| DELETE | `/users/:id` | admin only |
| GET | `/projects?search=&status=&priority=&page=&limit=` | list |
| GET | `/projects/stats` | dashboard numbers |
| POST / PATCH / DELETE | `/projects`, `/projects/:id` | owner or admin for PATCH/DELETE |

## 6. SEO checklist (frontend)
- Metadata API with title template, description, Open Graph, Twitter, canonical (`src/app/layout.tsx` + per-page `metadata`)
- JSON-LD structured data (`WebApplication`) in the root layout
- `robots.ts`, `sitemap.ts`, `manifest.ts`, `icon.svg`, generated `opengraph-image.tsx`
- Public pages are server-rendered; private pages (`(authorized)`) are `noindex` and blocked in robots.txt
- One `<h1>` per page, semantic landmarks, skip link, labelled form fields
- **Before deploying set `NEXT_PUBLIC_SITE_URL` to your real domain**

## 7. Backend folder map
```
src/
  server.ts       starts DB + HTTP server
  app.ts          express app (middleware + routes)
  config/         env.ts, db.ts
  routes/         URL → controller
  controllers/    read request, call service, send response
  services/       business logic (talks to models)
  models/         Mongoose schemas
  middleware/     auth (JWT/roles), validation, errors
  validators/     express-validator rules
  utils/          ApiError, token, pagination
  seed.ts         demo data
```
