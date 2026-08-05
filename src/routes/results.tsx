import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, FileCheck2, Flag, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponseCard } from "@/components/ResponseCard";
import { TrustScoreRing } from "@/components/TrustScoreRing";
import { VerdictBadge } from "@/components/VerdictBadge";
import { EvidenceCard } from "@/components/EvidenceCard";
import { ExplanationCard } from "@/components/ExplanationCard";
import { placeholderResult } from "@/lib/verification-data";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Verification report — TruthSense AI" },
      {
        name: "description",
        content:
          "A full verification report: original answer, corrected answer, trust score, evidence sources and claim-level explanations.",
      },
      { property: "og:title", content: "Verification report — TruthSense AI" },
      {
        property: "og:description",
        content: "Trust score, evidence sources and claim-level explanations for an AI health answer.",
      },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const r = placeholderResult;

  const stats = [
    { Icon: FileCheck2, label: "Claims checked", value: r.checkedClaims },
    { Icon: Flag, label: "Claims flagged", value: r.flaggedClaims },
    { Icon: Clock, label: "Latency", value: `${(r.latencyMs / 1000).toFixed(1)}s` },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="animate-rise grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Verification report
          </p>
          <h1 className="mt-2 text-2xl font-bold leading-snug sm:text-3xl">{r.question}</h1>
        </div>
        <Button asChild variant="outline" className="shrink-0 rounded-xl">
          <Link to="/verify">
            <RefreshCw />
            <span className="hidden sm:inline">New check</span>
          </Link>
        </Button>
      </div>

      <section className="surface-card mt-8 grid animate-rise gap-8 p-6 sm:p-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center">
        <TrustScoreRing score={r.trustScore} />
        <div className="min-w-0">
          <VerdictBadge verdict={r.verdict} withDescription />
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-muted/70 p-4">
                <dt className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <s.Icon className="size-4" />
                  {s.label}
                </dt>
                <dd className="mt-1 font-display text-xl font-bold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mt-8 grid animate-rise gap-6 lg:grid-cols-2">
        <ResponseCard
          label="Original AI response"
          badge={`${r.flaggedClaims} claims flagged`}
          tone="flagged"
          text={r.originalResponse}
        />
        <ResponseCard
          label="Verified response"
          badge="Evidence-grounded"
          tone="verified"
          text={r.verifiedResponse}
        />
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">Why the score dropped</h2>
        <p className="mt-2 text-muted-foreground">Claim-level reasoning behind the verdict.</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {r.explanations.map((item) => (
            <ExplanationCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">Evidence sources</h2>
        <p className="mt-2 text-muted-foreground">
          Every judgement is traceable to a citable clinical source.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {r.sources.map((source) => (
            <EvidenceCard key={source.id} source={source} />
          ))}
        </div>
      </section>

      <p className="mt-12 rounded-2xl border border-border bg-muted/60 p-5 text-sm text-muted-foreground">
        This report uses placeholder data for demonstration. TruthSense AI supports clinical
        judgement — it does not replace a qualified healthcare professional.
      </p>
    </div>
  );
}
