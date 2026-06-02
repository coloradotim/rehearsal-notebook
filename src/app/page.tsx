import Link from "next/link";

const modes = [
  {
    name: "Planning Mode",
    text: "Prepare the next rehearsal with repertoire, warmups, and time in view.",
  },
  {
    name: "Execution Mode",
    text: "Keep the current block focused and phone-friendly during rehearsal.",
  },
  {
    name: "Review Mode",
    text: "Capture what happened and carry useful context forward.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
      <header className="flex flex-col gap-4 border-b border-[color:var(--panel-border)] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[color:var(--accent)]">
            Harmony Road
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal sm:text-4xl">
            Rehearsal Notebook
          </h1>
        </div>
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-[color:var(--accent)] px-5 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-strong)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2"
          href="/login"
        >
          Login
        </Link>
      </header>

      <section className="grid flex-1 gap-8 py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase text-[color:var(--muted)]">
            Private director workspace
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-normal sm:text-5xl">
            Plan, run, and review rehearsals without losing the musical thread.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[color:var(--muted)]">
            This scaffold sets up the responsive web app foundation for the
            rehearsal cycle. Product workflows and data persistence will be
            added in later issues.
          </p>
        </div>

        <div className="grid gap-4">
          {modes.map((mode) => (
            <article
              className="rounded-lg border border-[color:var(--panel-border)] bg-[color:var(--panel)] p-5 shadow-sm"
              key={mode.name}
            >
              <h3 className="text-lg font-semibold">{mode.name}</h3>
              <p className="mt-2 leading-7 text-[color:var(--muted)]">
                {mode.text}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
