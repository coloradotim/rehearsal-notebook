import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-10">
      <Link
        className="mb-8 text-sm font-semibold text-[color:var(--accent)]"
        href="/"
      >
        Rehearsal Notebook
      </Link>

      <section className="rounded-lg border border-[color:var(--panel-border)] bg-[color:var(--panel)] p-6 shadow-sm">
        <p className="text-sm font-semibold text-[color:var(--muted)]">
          Login placeholder
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Private access</h1>
        <p className="mt-3 leading-7 text-[color:var(--muted)]">
          Username and password authentication will be added with Supabase in a
          later issue.
        </p>
      </section>
    </main>
  );
}
