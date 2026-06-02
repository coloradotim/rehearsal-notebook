import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthShellState } from "@/lib/auth/session";
import { signOut } from "./actions";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await getAuthShellState();

  if (auth.status === "signed-out") {
    redirect("/login?next=/planning");
  }

  if (auth.status === "configuration-missing") {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-5 py-10">
        <section className="rounded-lg border border-[color:var(--panel-border)] bg-[color:var(--panel)] p-6 shadow-sm">
          <p className="text-sm font-semibold text-[color:var(--accent)]">
            Rehearsal Notebook
          </p>
          <h1 className="mt-3 text-3xl font-semibold">
            Supabase configuration needed
          </h1>
          <p className="mt-3 leading-7 text-[color:var(--muted)]">
            Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> to{" "}
            <code>.env.local</code> before using protected app routes.
          </p>
          <Link
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-[color:var(--accent)] px-5 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-strong)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2"
            href="/login"
          >
            Go to login
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
      <header className="flex flex-col gap-4 border-b border-[color:var(--panel-border)] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            className="text-sm font-semibold text-[color:var(--accent)]"
            href="/"
          >
            Rehearsal Notebook
          </Link>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Signed in as {auth.user.email ?? "authenticated user"}
          </p>
        </div>
        <form action={signOut}>
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-[color:var(--panel-border)] bg-white px-5 text-sm font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--accent-soft)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2"
            type="submit"
          >
            Sign out
          </button>
        </form>
      </header>

      {children}
    </main>
  );
}
