"use server";

import { redirect } from "next/navigation";
import { getSupabasePublicConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export type LoginActionState = {
  error: string | null;
};

function safeNextPath(value: FormDataEntryValue | null): string {
  if (typeof value !== "string" || !value.startsWith("/")) {
    return "/planning";
  }

  if (value.startsWith("//")) {
    return "/planning";
  }

  return value;
}

export async function signInWithPassword(
  _previousState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  if (!getSupabasePublicConfig()) {
    return {
      error:
        "Supabase is not configured yet. Add the public project URL and publishable key to .env.local.",
    };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = safeNextPath(formData.get("next"));

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Email or password did not match." };
  }

  redirect(next);
}
