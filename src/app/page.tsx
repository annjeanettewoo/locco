import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-cream">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-12">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-tomato shadow-sm">
            Singapore food plans, filtered by people you trust
          </p>
          <h1 className="text-5xl font-black tracking-normal text-ink sm:text-6xl">
            Dora Food Map
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-700">
            Find food near where you are going, but only from friends whose taste you already trust.
            Start with mock lists, map pins, and a rule-based recommendation chat.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/app/map"
              className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5"
            >
              Open Food Map
            </Link>
            <Link
              href="/app/lists"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-ink shadow-sm ring-1 ring-stone-200 transition hover:-translate-y-0.5"
            >
              View Lists
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            ["Trust-first", "Toggle friends' lists and only see food from selected people."],
            ["Map-first", "Explore clustered Singapore pins with mobile bottom sheets."],
            ["Chat-ready", "Ask for dessert near Orchard or cheap dinner near Bugis."]
          ].map(([title, body]) => (
            <article key={title} className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-stone-200">
              <h2 className="font-bold text-ink">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">{body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
