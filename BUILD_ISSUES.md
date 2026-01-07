# Build & Runtime Issues Summary

During the development and deployment of **CareFlow** we encountered a handful of problems that are useful to mention in interviews:

1. **Missing Shadcn UI components** – The initial `npm i shadcn/ui` step stopped at an overwrite prompt, leaving `form`, `input`, `select`, etc. missing. This caused module‑not‑found errors in `AddPatientModal`.
2. **Prisma migration mismatch** – The production Supabase database did not contain the `User` table defined in `prisma/schema.prisma`. The diagnostic route (`/api/test-db`) returned:
   ```
   PrismaClientKnownRequestError: The table `public.User` does not exist.
   ```
   The fix was to generate a migration locally (`npx prisma migrate dev`) and ensure it runs on Vercel (`prisma migrate deploy` in `postinstall`).
3. **Environment variable configuration** – Vercel required both `DATABASE_URL` (port 6543 with `?pgbouncer=true`) and `DIRECT_URL` (port 5432). Missing or malformed URLs caused `PrismaClientInitializationError`.
4. **Clerk secret keys** – Without `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` set in Vercel, `currentUser()` threw a server‑side exception after sign‑up, resulting in the generic "Application error" page.
5. **Runtime error after sign‑up** – The combination of the missing `User` table and absent Clerk keys manifested as a server‑side exception when the dashboard tried to fetch data.

**Takeaway:** Always verify that migrations are applied to the production DB, keep UI component installations atomic, and double‑check all required environment variables (especially when using server‑side services like Prisma and Clerk).
