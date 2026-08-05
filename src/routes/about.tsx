import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpenCheck, HeartPulse, ScanSearch, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About TruthSense AI — Medical AI safety layer" },
      {
        name: "description",
        content:
          "How TruthSense AI grounds medical AI answers in clinical evidence, who builds it, and the limits of the system.",
      },
      { property: "og:title", content: "About TruthSense AI — Medical AI safety layer" },
      {
        property: "og:description",
        content: "Our mission, methodology and limitations for verifying AI healthcare answers.",
      },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  {
    Icon: ScanSearch,
    title: "Transparency over confidence",
    body: "A verified answer is only useful if you can see the sources and reasoning that produced it.",
  },
  {
    Icon: BookOpenCheck,
    title: "Guidelines first",
    body: "We weight national and specialty guidelines above isolated studies, and recency above volume.",
  },
  {
    Icon: HeartPulse,
    title: "Patient safety bias",
    body: "When evidence conflicts, TruthSense reports the more conservative clinical position.",
  },
  {
    Icon: Users,
    title: "Clinician in the loop",
    body: "Reports are designed to be reviewed, disputed and corrected by healthcare professionals.",
  },
];

const faqs = [
  {
    q: "Which sources are used?",
    a: "National guidelines (NICE, ACP, WHO), Cochrane and other systematic reviews, randomized trials, and regulatory drug labelling.",
  },
  {
    q: "How is the trust score computed?",
    a: "Each extracted claim receives an agreement score weighted by source tier and recency. The report score is the weighted mean, penalised heavily by any direct contradiction.",
  },
  {
    q: "Does it work with any model?",
    a: "Yes. Verification runs on text, so any assistant's output can be checked without integration.",
  },
  {
    q: "Is this medical advice?",
    a: "No. TruthSense AI is a decision-support and safety tool, not a diagnosis or treatment service.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="hero-surface border-b border-border/70">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
            <ShieldCheck className="size-4" />
            About TruthSense AI
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
            A verification layer between medical AI and the people who rely on it
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Language models sound most convincing exactly when they are wrong. In healthcare that
            gap is dangerous. TruthSense AI exists to close it — by checking every claim against
            what the evidence actually says.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-bold">What we optimise for</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className="surface-card flex gap-4 p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <p.Icon className="size-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/70 bg-card/60">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-bold">Frequently asked</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="surface-card p-6">
                <h3 className="text-base font-semibold">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h2 className="text-3xl font-bold">See it on a real answer</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Run a question through the verifier and read the full evidence report.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-xl">
            <Link to="/verify">Verify a response</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-xl">
            <Link to="/results">View sample report</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
