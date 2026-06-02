import type { User } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export type AuthShellState =
  | {
      status: "configuration-missing";
    }
  | {
      status: "signed-out";
    }
  | {
      status: "signed-in";
      user: User;
      isAllowed: boolean;
      profileStatus: "pending-profiles-table";
    };

export async function getAuthShellState(): Promise<AuthShellState> {
  if (!getSupabasePublicConfig()) {
    return { status: "configuration-missing" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { status: "signed-out" };
  }

  return {
    status: "signed-in",
    user,
    isAllowed: true,
    profileStatus: "pending-profiles-table",
  };
}
