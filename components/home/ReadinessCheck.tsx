"use client";

import { useState, type ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

type Q = { q: string; options: string[]; scored: boolean };

const questions: Q[] = [
  { q: "Which framework is your first priority?", options: ["SOC 2", "ISO 27001", "FedRAMP / CMMC", "Several at once"], scored: false },
  { q: "Do you have documented, approved security policies?", options: ["Not yet", "Drafts exist", "Yes, reviewed annually"], scored: true },
  { q: "How is access to production systems reviewed?", options: ["Ad hoc", "Occasionally", "Quarterly, with evidence"], scored: true },
  { q: "Have you completed a risk assessment in the last 12 months?", options: ["No", "In progress", "Yes, documented"], scored: true },
  { q: "How do you collect audit evidence today?", options: ["Screenshots when asked", "Shared drive", "Automated / GRC tool"], scored: true },
  { q: "When do you need to be audit-ready?", options: ["Under 3 months", "3-6 months", "Just exploring"], scored: false },
];

const maxScore = questions.filter((q) => q.scored).length * 2;

function band(pct: number) {
  if (pct >= 75) return { label: "Audit-ready soon", body: "Your foundations are solid. A focused gap assessment and mock audit could get you to fieldwork within weeks." };
  if (pct >= 40) return { label: "Developing", body: "You have the building blocks. A structured remediation sprint will close the gaps auditors care about most." };
  return { label: "Early stage", body: "Perfect time to design it right: build one unified control set now instead of retrofitting three later." };
}

/** Six-question readiness quiz: an instant score, no email required to see it. */
export function ReadinessCheck({ eyebrow = "Readiness check" }: { eyebrow?: ReactNode }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const done = step >= questions.length;

  const score = answers.reduce((n, a, i) => n + (questions[i].scored ? a : 0), 0);
  const pct = Math.round((score / maxScore) * 100);
  const result = band(pct);
  const priority = answers[0] !== undefined ? questions[0].options[answers[0]] : "";

  const choose = (idx: number) => {
    setAnswers((a) => {
      const next = [...a];
      next[step] = idx;
      return next;
    });
    setTimeout(() => setStep((s) => s + 1), 260);
  };

  const reset = () => {
    setAnswers([]);
    setStep(0);
  };

  const R = 70;
  const C = 2 * Math.PI * R;

  return (
    <section id="readiness" data-rail="Readiness" className="relative overflow-hidden bg-paper py-16 md:py-24 lg:py-28">
      <div className="container-x">
        <div className="grid gap-8 border-t border-line pt-5 md:gap-14 md:pt-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="eyebrow text-muted">{eyebrow}</div>
            <Reveal as="h2" className="wide mt-5 text-[clamp(2.3rem,5vw,5.2rem)] leading-[0.98] md:mt-8">
              How ready are you? <span className="em text-brand">Find out in 60 seconds.</span>
            </Reveal>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink/65 md:mt-8 md:text-lg">
              Six questions. An instant readiness score and the fastest path to audit-ready, no email required to see it.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="relative min-h-[26rem] overflow-hidden rounded-[6px] border border-line bg-ivory p-5 md:min-h-[30rem] md:p-6 shadow-[0_30px_80px_-50px_rgb(15_23_41/0.35)] md:p-10">
              {/* progress */}
              <div className="flex items-center justify-between">
                <span className="eyebrow text-muted" aria-live="polite">
                  {done ? "Your result" : `Question ${String(step + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`}
                </span>
                {step > 0 && (
                  <button type="button" onClick={done ? reset : () => setStep((s) => s - 1)} className="eyebrow link-sweep text-ink/60">
                    {done ? "Start over" : "← Back"}
                  </button>
                )}
              </div>
              <div className="mt-4 flex gap-1.5">
                {questions.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i < step || done ? "bg-brand" : i === step ? "bg-ink/35" : "bg-ink/10"}`}
                  />
                ))}
              </div>

              {!done ? (
                <div key={step} className="mt-8 animate-[fadeUp_0.7s_var(--ease-out)] md:mt-12">
                  <p className="serif text-[clamp(1.7rem,2.6vw,2.4rem)] leading-tight">{questions[step].q}</p>
                  <div className="mt-6 grid gap-2 md:mt-8 md:gap-2.5">
                    {questions[step].options.map((o, idx) => {
                      const picked = answers[step] === idx;
                      return (
                        <button
                          key={o}
                          type="button"
                          onClick={() => choose(idx)}
                          className={`group flex items-center justify-between rounded-[6px] border px-4 py-3.5 text-left text-[0.95rem] transition-all duration-500 ease-out-expo md:px-5 md:py-4 md:text-base ${
                            picked ? "border-ink bg-ink text-ivory" : "border-ink/12 hover:border-ink/40 hover:bg-paper"
                          }`}
                        >
                          <span className="flex items-center gap-4">
                            <span className="eyebrow opacity-50">{String.fromCharCode(65 + idx)}</span>
                            {o}
                          </span>
                          <span className="translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">→</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="mt-10 grid animate-[fadeUp_0.8s_var(--ease-out)] items-center gap-8 sm:grid-cols-[auto_1fr]">
                  <div className="relative mx-auto size-44">
                    <svg viewBox="0 0 160 160" className="size-full -rotate-90" aria-hidden>
                      <circle cx="80" cy="80" r={R} stroke="rgb(15 23 41 / 0.08)" strokeWidth="6" fill="none" />
                      <circle
                        cx="80"
                        cy="80"
                        r={R}
                        stroke="var(--brand)"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={C}
                        strokeDashoffset={C * (1 - pct / 100)}
                        style={{ transition: "stroke-dashoffset 1.6s var(--ease-out)" }}
                      />
                    </svg>
                    <div className="absolute inset-0 grid place-items-center text-center">
                      <p className="num text-6xl">
                        {pct}
                        <span className="text-2xl">%</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="eyebrow text-brand">{result.label}</p>
                    <p className="serif mt-3 text-[1.7rem] leading-snug">{result.body}</p>
                    {priority && <p className="mt-3 text-sm text-muted">Priority: {priority}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <Button href="#book" book={priority && priority !== "Several at once" && priority !== "FedRAMP / CMMC" ? priority : undefined}>
                      Get your full gap assessment
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
