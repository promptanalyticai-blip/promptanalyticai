# PromptAnalyticAI Enterprise v2

Arquitectura:

- Next.js 14 (App Router)
- TailwindCSS
- Supabase Postgres
- Drizzle ORM
- Auditoría interna (`audit_logs`)

## Setup

1. Copia estos archivos en `C:\projects\promptanalyticai`.
2. Crea `.env` con:

   - `NEXT_PUBLIC_SUPABASE_URL=...`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
   - `DATABASE_URL=postgres://...`

3. En Ubuntu:

   ```bash
   cd /mnt/c/projects/promptanalyticai
   npm install
   npm run dev
