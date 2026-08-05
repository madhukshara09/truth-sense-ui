import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  BookOpenCheck,
  BrainCircuit,
  FileSearch,
  Gauge,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TruthSense AI — Fact-verification for medical AI answers" },
      {
        name: "description",
        content:
          "Catch hallucinations in AI healthcare answers. TruthSense AI grounds every claim in clinical guidelines and returns a trust score.",
      },
      { property: "og:title", content: "TruthSense AI — Fact-verification for medical AI answers" },
      {
        property: "og:description",
        content:
          "Catch hallucinations in AI healthcare answers with evidence-grounded verification and trust scoring.",
      },
    ],
  }),
  component: Home,
});

const steps = [
  {
    Icon: FileSearch,
    title: "Claim extraction",
    body: "The AI answer is decomposed into discrete, checkable medical claims.",
  },
  {
    Icon: BookOpenCheck,
    title: "Evidence retrieval",
    body: "Each claim is matched against guidelines, systematic reviews, trials and labelling.",
  },
  {
    Icon: Gauge,
    title: "Trust scoring",
    body: "Agreement, source quality and recency combine into a single 0–100 trust score.",
  },
];

const features = [
  {
    Icon: ShieldCheck,
    title: "Hallucination detection",
    body: "Flags fabricated interactions, invented dosages and reversed guideline logic.",
  },
  {
    Icon: Stethoscope,
    title: "Clinically-grounded corpus",
    body: "NICE, ACP, Cochrane, FDA labelling and peer-reviewed literature.",
  },
  {
    Icon: BrainCircuit,
    title: "Model agnostic",
    body: "Paste output from any assistant — verification runs independently of the generator.",
  },
  {
    Icon: Activity,
    title: "Readable explanations",
    body: "Every deduction is explained in plain language, claim by claim.",
  },
];

function Home() {
  return (
    <>
      <section className="hero-surface border-b border-border/70">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
              <ShieldCheck className="size-4" />
              Evidence-grounded medical AI safety
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
              Trust an AI health answer only <span className="text-gradient-brand">after</span> it
              has been verified.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              TruthSense AI breaks any medical AI response into individual claims, checks each one
              against clinical guidelines and primary literature, and returns a corrected answer
              with a transparent trust score.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-xl">
                <Link to="/verify">Verify a response</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl">
                <Link to="/results">See a sample report</Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {[
                ["12k+", "Claims checked"],
                ["94%", "Flag precision"],
                ["2.1s", "Median latency"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-2xl font-bold text-primary">{value}</dt>
                  <dd className="text-xs text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="surface-card animate-rise p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Live verification preview
            </p>
            <div className="mt-4 rounded-xl border-2 border-destructive/40 bg-destructive-soft/50 p-4">
              <p className="text-xs font-semibold text-destructive">Original AI response</p>
              <p className="mt-2 text-sm leading-relaxed">
                “Ibuprofen is completely safe with lisinopril and has no effect on blood pressure.”
              </p>
            </div>
            <div className="mt-4 rounded-xl border-2 border-success/40 bg-success-soft/50 p-4">
              <p className="text-xs font-semibold text-success">Verified response</p>
              <p className="mt-2 text-sm leading-relaxed">
                “NSAIDs may blunt the antihypertensive effect of ACE inhibitors and raise acute
                kidney injury risk — use short courses with monitoring.”
              </p>
            </div>
            <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl bg-muted p-4">
              <p className="min-w-0 text-sm text-muted-foreground">
                3 of 5 claims contradicted authoritative sources.
              </p>
              <span className="shrink-0 rounded-full bg-destructive-soft px-3 py-1 text-sm font-bold text-destructive">
                38 / 100
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">How verification works</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Three deterministic stages between the model output and the answer a patient or clinician
          actually reads.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="surface-card p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary">
                <step.Icon className="size-5" />
              </span>
              <p className="mt-4 text-xs font-semibold text-muted-foreground">
                STEP {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/70 bg-card/60">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-bold sm:text-4xl">Built for clinical safety</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="surface-card flex gap-4 p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <f.Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="surface-card hero-surface p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold sm:text-4xl">Check your first answer</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Paste a medical question and the AI answer you received. TruthSense returns a verified
            rewrite, a trust score and the evidence behind every judgement.
          </p>
          <Button asChild size="lg" className="mt-7 rounded-xl">
            <Link to="/verify">Start verifying</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
