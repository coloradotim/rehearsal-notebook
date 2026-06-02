import Link from "next/link";
import { LoginForm } from "./login-form";

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

function safeNextPath(next: string | undefined) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/planning";
  }

  return next;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;
  const nextPath = safeNextPath(next);

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
          Sign in with the manually provisioned email and password for this
          private rehearsal notebook.
        </p>
        <LoginForm nextPath={nextPath} />
      </section>
    </main>
  );
}
