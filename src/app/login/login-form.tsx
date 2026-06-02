"use client";

import { useActionState } from "react";
import { signInWithPassword, type LoginActionState } from "./actions";

const initialState: LoginActionState = {
  error: null,
};

type LoginFormProps = {
  nextPath: string;
};

export function LoginForm({ nextPath }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(
    signInWithPassword,
    initialState,
  );

  return (
    <form action={formAction} className="mt-6 grid gap-4">
      <input name="next" type="hidden" value={nextPath} />

      <label className="grid gap-2 text-sm font-semibold">
        Email
        <input
          autoComplete="email"
          className="min-h-11 rounded-md border border-[color:var(--panel-border)] bg-white px-3 text-base font-normal outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)]"
          name="email"
          required
          type="email"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold">
        Password
        <input
          autoComplete="current-password"
          className="min-h-11 rounded-md border border-[color:var(--panel-border)] bg-white px-3 text-base font-normal outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)]"
          name="password"
          required
          type="password"
        />
      </label>

      {state.error ? (
        <p className="rounded-md border border-[#e6d8be] bg-[#fff8eb] px-3 py-2 text-sm font-semibold text-[#7a4d12]">
          {state.error}
        </p>
      ) : null}

      <button
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-[color:var(--accent)] px-5 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-strong)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
