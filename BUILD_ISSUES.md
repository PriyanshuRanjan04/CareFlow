# Build & Runtime Issues Summary

During the development and deployment of **CareFlow**, we encountered several technical challenges that serve as great discussion points for interviews or future maintenance:

1. **Database Schema Sync (Postgres/Prisma)**:
   - **Issue**: The production Supabase database was initially out of sync with the Prisma schema, leading to `The table "public.User" does not exist` errors on Vercel.
   - **Solution**: Automated the sync process by updating the `package.json` `postinstall` script to `prisma generate && prisma db push`. This ensures that every deployment applies schema changes to the connected database automatically.

2. **Supabase Connection Pooling**:
   - **Issue**: Standard direct connections often fail in serverless environments (Vercel) due to connection limit exhaustion or IPv6/IPv4 mismatches.
   - **Solution**: Configured dual connection strings: `DATABASE_URL` for the Transaction Pooler (port 6543) and `DIRECT_URL` for session-based operations.

3. **Missing Shadcn UI Components**:
   - **Issue**: During implementation, several components like `Badge` and `Textarea` were found to be missing from the local library, leading to build errors.
   - **Solution**: Instead of interrupting the workflow, I implemented these using standard Tailwind CSS classes and vanilla HTML elements (e.g., `<textarea>` with specific Shadcn-like styling) to maintain a cohesive UI while ensuring the build remained stable.

4. **Clerk Authentication Sync**:
   - **Issue**: Authentication worked but the database didn't have the user records yet, causing `currentUser()` to return data that didn't match any database entries.
   - **Solution**: Implemented a `SyncUser` component and server-side logic to ensure that a corresponding `User` record is created in Prisma immediately after the first login.

5. **UI Redundancy & Refinement**:
   - **Issue**: Static placeholders (like a "Quick Appointment" button in the sidebar) were cluttering the UI once real functional buttons were added to the dashboard.
   - **Solution**: Cleaned up the `DashboardLayout` by removing hardcoded UI elements and replacing them with fully functional, data-driven components in their respective sections.

**Key Learning**: In production Next.js apps, strict environment variable management (Clerk/Supabase) and automated database schema synchronization are critical for a "zero-downtime" deployment experience.

