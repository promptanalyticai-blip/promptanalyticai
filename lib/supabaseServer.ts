import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export function supabaseServer() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name) {
          const store = await cookies();
          return store.get(name)?.value;
        },
        async set(name, value, options) {
          const store = await cookies();
          store.set({ name, value, ...options });
        },
        async remove(name, options) {
          const store = await cookies();
          store.set({ name, value: "", ...options });
        },
      },
    }
  );
}
