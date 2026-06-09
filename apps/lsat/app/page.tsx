import Link from 'next/link';

const MAIN_URL = process.env.NEXT_PUBLIC_MAIN_URL ?? 'http://localhost:3001';

const sections = [
  {
    title: "Logical Reasoning",
    description: "Practice argument analysis, assumptions, flaws, and inference questions.",
  },
  {
    title: "Reading Comprehension",
    description: "Work through dense passages and improve speed, retention, and accuracy.",
  },
  {
    title: "Timed Drills",
    description: "Simulate short LSAT practice sessions and build consistency under pressure.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-16">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#79C9C5]">
              Apta Prep
            </p>
            <p className="mt-1 text-sm text-white/60">LSAT practice track</p>
          </div>
          <a
            href={MAIN_URL}
            className="text-sm text-white/55 transition hover:text-white"
          >
            ← All exams
          </a>
        </header>

        <div className="flex flex-1 flex-col justify-center py-14">
          <p className="mb-5 inline-flex rounded-full border border-[#3F9AAE]/30 bg-[#3F9AAE]/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-[#79C9C5]">
            LSAT
          </p>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            LSAT Practice
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/68">
            A focused practice environment for LSAT students. Build skills through
            timed drills, section-by-section review, and detailed explanations.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/practice"
              className="rounded-2xl bg-[#79C9C5] px-5 py-3 text-sm font-semibold text-[#07111f] transition hover:bg-[#92d7d3]"
            >
              Start Practice
            </Link>
            <a
              href={MAIN_URL}
              className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              ← Back to Apta Prep
            </a>
          </div>
        </div>

        <div className="grid gap-5 pb-8 md:grid-cols-3">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-[24px] border border-white/10 bg-white/5 p-6"
            >
              <p className="text-sm font-medium text-white">{section.title}</p>
              <p className="mt-3 text-sm leading-6 text-white/60">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
