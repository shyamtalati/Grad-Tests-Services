'use client';

import { useState } from 'react';

interface Choice {
  label: string;
  text: string;
}

interface Question {
  id: string;
  number: number;
  passage_number?: number;
  stimulus: string | null;
  stem: string;
  choices: Choice[];
  answer: string;
  explanation: string;
}

interface Passage {
  passage_number: number;
  title: string;
  question_numbers: number[];
  text: string;
}

interface Section {
  section_number: number;
  section_label: string;
  title: string;
  type: string;
  time_minutes: number;
  status: string;
  question_count_expected: number;
  directions: string;
  passages: Passage[];
  questions: Question[];
}

interface Test {
  test_number: number;
  sections: Section[];
}

interface AnswerRecord {
  selected: string;
  correct: boolean;
}

type Screen = 'test-select' | 'section-select' | 'quiz';

export default function PracticeClient({ tests }: { tests: Test[] }) {
  const [screen, setScreen] = useState<Screen>('test-select');
  const [testIdx, setTestIdx] = useState(0);
  const [sectionIdx, setSectionIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, AnswerRecord>>({});
  const [revealed, setRevealed] = useState(false);

  const currentTest = tests[testIdx];
  const currentSection = currentTest?.sections[sectionIdx];
  const currentQuestion = currentSection?.questions[questionIdx];
  const totalQuestions = currentSection?.questions.length ?? 0;

  const currentPassage =
    currentSection?.passages.length > 0 && currentQuestion?.passage_number != null
      ? currentSection.passages.find(
          (p) => p.passage_number === currentQuestion.passage_number,
        ) ?? null
      : null;

  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const isAnswered = !!currentAnswer;
  const isLastQuestion = questionIdx === totalQuestions - 1;
  const isRC = currentSection?.type === 'Reading Comprehension';

  function navigateTo(idx: number) {
    const q = currentSection.questions[idx];
    const saved = q ? answers[q.id] : undefined;
    setQuestionIdx(idx);
    setSelected(saved?.selected ?? null);
    setRevealed(!!saved);
  }

  function startSection(tIdx: number, sIdx: number) {
    setTestIdx(tIdx);
    setSectionIdx(sIdx);
    setQuestionIdx(0);
    setSelected(null);
    setRevealed(false);
    setScreen('quiz');
  }

  function handleSubmit() {
    if (!selected || !currentQuestion || isAnswered) return;
    const correct = selected === currentQuestion.answer;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: { selected, correct },
    }));
    setRevealed(true);
  }

  function handleNext() {
    if (!isLastQuestion) {
      navigateTo(questionIdx + 1);
    } else {
      setScreen('section-select');
      setQuestionIdx(0);
      setSelected(null);
      setRevealed(false);
    }
  }

  // ── Test select ───────────────────────────────────────────────────────────
  if (screen === 'test-select') {
    return (
      <main className="min-h-screen bg-[#07111f] text-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[#79C9C5]">
            Apta Prep · LSAT
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">LSAT Practice</h1>
          <p className="mt-3 text-white/68">Choose a practice test to begin.</p>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {tests.map((test, i) => {
              const totalQ = test.sections.reduce(
                (sum, s) => sum + s.questions.length,
                0,
              );
              const answeredQ = test.sections.reduce(
                (sum, s) =>
                  sum + s.questions.filter((q) => answers[q.id]).length,
                0,
              );
              return (
                <button
                  key={i}
                  onClick={() => {
                    setTestIdx(i);
                    setScreen('section-select');
                  }}
                  className="rounded-[24px] border border-white/10 bg-white/5 p-6 text-left transition hover:border-[#79C9C5]/30 hover:bg-[#79C9C5]/10"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-[#79C9C5]">
                    Practice Test
                  </p>
                  <p className="mt-2 text-3xl font-bold">{test.test_number}</p>
                  <p className="mt-3 text-sm text-white/55">
                    {test.sections.length} sections · {totalQ} questions
                  </p>
                  {answeredQ > 0 && (
                    <p className="mt-1 text-xs text-[#79C9C5]">
                      {answeredQ}/{totalQ} answered
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          <a
            href="/"
            className="mt-10 inline-block text-sm text-white/40 transition hover:text-white/70"
          >
            ← Back to LSAT home
          </a>
        </div>
      </main>
    );
  }

  // ── Section select ────────────────────────────────────────────────────────
  if (screen === 'section-select') {
    const test = tests[testIdx];
    return (
      <main className="min-h-screen bg-[#07111f] text-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <button
            onClick={() => setScreen('test-select')}
            className="mb-8 text-sm text-white/55 transition hover:text-white"
          >
            ← Back to Tests
          </button>

          <h1 className="text-3xl font-semibold tracking-tight">
            Practice Test {test.test_number}
          </h1>
          <p className="mt-2 text-white/68">Choose a section to practice.</p>

          <div className="mt-8 space-y-4">
            {test.sections.map((section, i) => {
              const sectionAnswered = section.questions.filter(
                (q) => answers[q.id],
              ).length;
              const done =
                sectionAnswered === section.questions.length && sectionAnswered > 0;
              return (
                <button
                  key={i}
                  onClick={() => startSection(testIdx, i)}
                  className="flex w-full items-center justify-between rounded-[24px] border border-white/10 bg-white/5 p-6 text-left transition hover:border-[#79C9C5]/30 hover:bg-[#79C9C5]/10"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[#79C9C5]">
                      {section.section_label}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {section.title}
                    </p>
                    <p className="mt-1 text-sm text-white/55">
                      {section.questions.length} questions · {section.time_minutes} min
                      {section.status !== 'Scored' && (
                        <span className="ml-2 text-white/35">(unscored)</span>
                      )}
                    </p>
                  </div>
                  <div className="ml-6 flex shrink-0 flex-col items-end gap-1">
                    {sectionAnswered > 0 && (
                      <span
                        className={`text-sm ${done ? 'text-emerald-400' : 'text-[#79C9C5]'}`}
                      >
                        {done
                          ? '✓ Complete'
                          : `${sectionAnswered}/${section.questions.length}`}
                      </span>
                    )}
                    <span className="text-white/35">→</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    );
  }

  // ── Quiz ──────────────────────────────────────────────────────────────────
  if (!currentQuestion) return null;

  return (
    <main className="flex h-screen flex-col bg-[#07111f] text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 shrink-0 border-b border-white/10 bg-[#07111f]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setScreen('section-select')}
              className="shrink-0 text-sm text-white/55 transition hover:text-white"
            >
              ← Back
            </button>
            <span className="text-white/20">|</span>
            <span className="truncate text-sm text-white/72">
              Test {currentTest.test_number} · {currentSection.section_label}:{' '}
              {currentSection.title}
            </span>
          </div>
          <span className="ml-4 shrink-0 text-sm text-white/55">
            {questionIdx + 1} / {totalQuestions}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-px bg-white/10">
          <div
            className="h-full bg-[#79C9C5] transition-all duration-300"
            style={{ width: `${((questionIdx + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </header>

      {/* Body */}
      <div
        className={`flex min-h-0 flex-1 ${
          isRC && currentPassage ? 'flex-row' : 'flex-col overflow-y-auto'
        }`}
      >
        {/* Passage panel – Reading Comprehension only */}
        {isRC && currentPassage && (
          <div className="w-1/2 shrink-0 overflow-y-auto border-r border-white/10 px-8 py-8">
            <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[#79C9C5]">
              Passage {currentPassage.passage_number}
            </p>
            <h2 className="mb-5 text-sm font-semibold text-white">
              {currentPassage.title}
            </h2>
            <p className="whitespace-pre-wrap text-sm leading-8 text-white/72">
              {currentPassage.text}
            </p>
          </div>
        )}

        {/* Question panel */}
        <div
          className={`flex flex-col overflow-y-auto px-6 py-8 ${
            isRC && currentPassage ? 'w-1/2' : 'mx-auto w-full max-w-3xl'
          }`}
        >
          {/* Stimulus – Logical Reasoning */}
          {currentQuestion.stimulus && (
            <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/82">
              {currentQuestion.stimulus}
            </div>
          )}

          {/* Stem */}
          <p className="mb-5 text-base font-medium leading-7 text-white">
            <span className="mr-1 text-white/40">{questionIdx + 1}.</span>{' '}
            {currentQuestion.stem}
          </p>

          {/* Choices */}
          <div className="space-y-2.5">
            {currentQuestion.choices.map((choice) => {
              const isSelected = selected === choice.label;
              const isCorrectChoice = choice.label === currentQuestion.answer;
              const wasChosenWrong =
                isAnswered &&
                currentAnswer.selected === choice.label &&
                !isCorrectChoice;

              let ring = 'border-white/10 bg-white/5 text-white/72';
              let labelRing = 'border-white/20 text-white/40';

              if (isAnswered) {
                if (isCorrectChoice) {
                  ring = 'border-emerald-500/60 bg-emerald-500/10 text-white';
                  labelRing = 'border-emerald-400 text-emerald-400';
                } else if (wasChosenWrong) {
                  ring = 'border-red-500/60 bg-red-500/10 text-white/55';
                  labelRing = 'border-red-400 text-red-400';
                } else {
                  ring = 'border-white/5 bg-white/[0.02] text-white/30';
                  labelRing = 'border-white/15 text-white/25';
                }
              } else if (isSelected) {
                ring = 'border-[#79C9C5] bg-[#79C9C5]/10 text-white';
                labelRing = 'border-[#79C9C5] text-[#79C9C5]';
              } else {
                ring += ' hover:border-white/20 hover:bg-white/8';
              }

              return (
                <button
                  key={choice.label}
                  onClick={() => !isAnswered && setSelected(choice.label)}
                  disabled={isAnswered}
                  className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm transition ${ring} ${
                    isAnswered ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${labelRing}`}
                  >
                    {choice.label}
                  </span>
                  <span className="leading-6">{choice.text}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {revealed && currentAnswer && (
            <div
              className={`mt-6 rounded-2xl border p-5 ${
                currentAnswer.correct
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : 'border-amber-500/30 bg-amber-500/5'
              }`}
            >
              <p
                className={`mb-2 text-sm font-semibold ${
                  currentAnswer.correct ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {currentAnswer.correct
                  ? '✓ Correct'
                  : `✗ Incorrect - correct answer: ${currentQuestion.answer}`}
              </p>
              <p className="text-sm leading-7 text-white/72">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between pb-8">
            <button
              onClick={() => navigateTo(questionIdx - 1)}
              disabled={questionIdx === 0}
              className="rounded-2xl border border-white/15 px-5 py-2.5 text-sm text-white/72 transition hover:border-white/30 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
            >
              ← Previous
            </button>

            {!isAnswered ? (
              <button
                onClick={handleSubmit}
                disabled={!selected}
                className="rounded-2xl bg-[#79C9C5] px-6 py-2.5 text-sm font-semibold text-[#07111f] transition hover:bg-[#92d7d3] disabled:cursor-not-allowed disabled:opacity-30"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="rounded-2xl bg-[#79C9C5] px-6 py-2.5 text-sm font-semibold text-[#07111f] transition hover:bg-[#92d7d3]"
              >
                {isLastQuestion ? 'Finish Section →' : 'Next Question →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
