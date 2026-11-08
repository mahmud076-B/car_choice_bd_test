import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export type StaffAuthResult =
  | { ok: true; demo?: boolean; email?: string }
  | { ok: false; error: string };

/**
 * Verifies that the current request has an authenticated Supabase session
 * AND that the user's email is in `public.staff_users` via `public.is_staff()`.
 * When Supabase is not configured (local demo mode), returns `{ ok: true, demo: true }`.
 */
export async function requireStaff(): Promise<StaffAuthResult> {
  if (!isSupabaseConfigured()) {
    return { ok: true, demo: true };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user?.email) {
      return {
        ok: false,
        error: "Unauthorized: Please sign in with a showroom staff account.",
      };
    }

    const { data: isStaff, error: staffError } = await supabase.rpc("is_staff");
    if (staffError || isStaff !== true) {
      return {
        ok: false,
        error: "Forbidden: Your account is not authorized for showroom staff actions.",
      };
    }

    return { ok: true, email: user.email };
  } catch {
    return {
      ok: false,
      error: "Authentication verification failed. Please sign in again.",
    };
  }
}

