const LSAT_URL = process.env.NEXT_PUBLIC_LSAT_URL ?? "http://localhost:3001";

const exams = [
  {
    name: "LSAT",
    status: "Live now",
    description:
      "Practice logical reasoning, reading comprehension, and timed LSAT-style drills.",
    highlight: true,
    href: LSAT_URL,
  },
  {
    name: "GRE",
    status: "Coming soon",
    description:
      "Verbal and quantitative practice modules are planned for a future release.",
    highlight: false,
    href: null,
  },
  {
    name: "GMAT",
    status: "Coming soon",
    description:
      "Focused prep for quant, verbal, and data-driven business school practice.",
    highlight: false,
    href: null,
  },
  {
    name: "MCAT",
    status: "Coming soon",
    description:
      "Science-heavy practice sets and review tools are planned for later phases.",
    highlight: false,
    href: null,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#79C9C5]">
              Apta Prep
            </p>
            <p className="mt-1 text-sm text-white/60">
              Unofficial grad school test practice
            </p>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a href="#exams" className="transition hover:text-white">
              Exams
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#legal" className="transition hover:text-white">
              Legal
            </a>
          </nav>
        </header>

        <section className="grid flex-1 items-center gap-14 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-[#3F9AAE]/30 bg-[#3F9AAE]/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-[#79C9C5]">
              LSAT first · GRE, GMAT, and MCAT next
            </p>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Prepare with a calmer, cleaner study flow.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Apta Prep is a focused practice platform for graduate school test prep.
              Start with LSAT drills and review, then expand into GRE, GMAT, and
              MCAT practice as the platform grows.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#exams"
                className="rounded-2xl bg-[#79C9C5] px-5 py-3 text-sm font-semibold text-[#07111f] transition hover:bg-[#92d7d3]"
              >
                Explore exams
              </a>

              <a
                href="#about"
                className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                View roadmap
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">Timed drills</p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Short practice sessions designed for repeat study habits.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">Review mode</p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Revisit mistakes and organize question performance over time.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">Built to expand</p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Structured for LSAT now, with GRE, GMAT, and MCAT to follow.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-full bg-[#F96E5B]/18 blur-3xl lg:block" />
            <div className="absolute -right-8 bottom-6 hidden h-32 w-32 rounded-full bg-[#79C9C5]/18 blur-3xl lg:block" />

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0c1828] p-5 shadow-2xl shadow-black/30">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#79C9C5]">
                    LSAT session
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">
                    Logical Reasoning Drill
                  </h2>
                </div>

                <div className="rounded-full border border-[#79C9C5]/30 bg-[#79C9C5]/10 px-3 py-1 text-xs font-medium text-[#79C9C5]">
                  12 min
                </div>
              </div>

              <div className="space-y-4 py-5">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm uppercase tracking-[0.18em] text-white/45">
                    Prompt
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/82">
                    The argument depends on assuming that a short-term increase in
                    test volume will lead to long-term score improvement for the same
                    student rather than temporary familiarity alone.
                  </p>
                </div>

                <div className="grid gap-3">
                  {["A", "B", "C", "D"].map((choice, index) => (
                    <div
                      key={choice}
                      className={`rounded-2xl border px-4 py-3 text-sm ${
                        index === 1
                          ? "border-[#79C9C5]/40 bg-[#79C9C5]/10 text-white"
                          : "border-white/10 bg-white/5 text-white/72"
                      }`}
                    >
                      <span className="mr-3 font-semibold">{choice}.</span>
                      <span>
                        {index === 0 &&
                          "The author provides historical evidence from official test makers."}
                        {index === 1 &&
                          "The habit of repeated practice improves reasoning performance beyond simple repetition."}
                        {index === 2 &&
                          "Most students prefer digital platforms to printed materials."}
                        {index === 3 &&
                          "Students study more effectively in the morning than at night."}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                    Accuracy
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">78%</p>
                  <p className="mt-2 text-sm text-white/60">
                    Last 20 logical reasoning questions
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                    Focus area
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    Assumptions
                  </p>
                  <p className="mt-2 text-sm text-white/60">
                    Review weak spots and repeat missed question types
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="exams" className="border-t border-white/10 py-14">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-[#79C9C5]">
              Exam tracks
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              One platform, multiple graduate exams.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/68">
              The platform is launching with LSAT-first functionality while GRE,
              GMAT, and MCAT sections are held as planned placeholders for future
              development.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {exams.map((exam) =>
              exam.href ? (
                <a
                  key={exam.name}
                  href={exam.href}
                  className="block rounded-[24px] border border-[#79C9C5]/35 bg-[#79C9C5]/10 p-5 transition hover:bg-[#79C9C5]/15"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold text-white">{exam.name}</h3>
                    <span className="rounded-full bg-[#79C9C5] px-2.5 py-1 text-xs font-medium text-[#07111f]">
                      {exam.status}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/68">
                    {exam.description}
                  </p>
                  <p className="mt-5 text-sm font-medium text-[#79C9C5]">
                    Start practice →
                  </p>
                </a>
              ) : (
                <div
                  key={exam.name}
                  className="rounded-[24px] border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold text-white">{exam.name}</h3>
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/70">
                      {exam.status}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/68">
                    {exam.description}
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        <section
          id="about"
          className="grid gap-6 border-t border-white/10 py-14 lg:grid-cols-[1fr_1fr]"
        >
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-[#79C9C5]">
              Product direction
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white">
              Designed for repeat practice, not clutter.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/68">
              The goal is a focused study experience with short drills, progress
              review, and a cleaner workflow than a traditional test-prep dashboard.
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-[#79C9C5]">
              Current scope
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white">
              Prototype stage with LSAT as the first live track.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/68">
              This version focuses on establishing the landing page, practice flow,
              and content structure before the broader multi-exam rollout.
            </p>
          </div>
        </section>

        <footer
          id="legal"
          className="border-t border-white/10 py-8 text-sm text-white/55"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="font-medium text-white/78">
                © 2026 Apta Prep. All rights reserved.
              </p>
              <p className="mt-2 max-w-3xl leading-7">
                This website provides unofficial educational practice materials and
                prototype study tools. It is not affiliated with or endorsed by
                LSAC, ETS, GMAC, AAMC, or any official testing organization.
              </p>
            </div>

            <div className="flex gap-4 text-white/60">
              <a href="#" className="transition hover:text-white">
                Privacy
              </a>
              <a href="#" className="transition hover:text-white">
                Terms
              </a>
              <a href="#" className="transition hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}