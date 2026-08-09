import { createFileRoute, Link } from "@tanstack/react-router";
import { HelpCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponseCard } from "@/components/ResponseCard";
import { TrustScoreCard } from "@/components/TrustScoreCard";
import { HallucinationStatusCard } from "@/components/HallucinationStatusCard";
import { EvidenceCard } from "@/components/EvidenceCard";
import { ExplanationCard } from "@/components/ExplanationCard";
import { ClaimCard } from "@/components/ClaimCard";
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

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function ResultsPage() {
  const r = placeholderResult;

  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 sm:px-6 sm:py-16">
      <div className="animate-rise grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Verification report
          </p>
          <h1 className="mt-2 text-2xl font-bold leading-snug sm:text-3xl">
            Explainable verification result
          </h1>
        </div>
        <Button asChild variant="outline" className="shrink-0 rounded-xl">
          <Link to="/verify">
            <RefreshCw />
            <span className="hidden sm:inline">New check</span>
          </Link>
        </Button>
      </div>

      <section className="surface-card animate-rise flex gap-4 p-6 sm:p-8">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          <HelpCircle className="size-5" />
        </span>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Question asked
          </h2>
          <p className="mt-2 text-lg font-semibold leading-snug">{r.question}</p>
        </div>
      </section>

      <div className="grid animate-rise gap-6 lg:grid-cols-2">
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

      <div className="grid animate-rise gap-6 lg:grid-cols-2 lg:items-start">
        <TrustScoreCard
          score={r.trustScore}
          confidence={r.confidence}
          sourceCount={r.sources.length}
          latencyMs={r.latencyMs}
        />
        <HallucinationStatusCard status={r.status} reason={r.statusReason} />
      </div>

      <section>
        <SectionHeading
          title="Claim breakdown"
          subtitle="Each extracted medical claim, judged individually against the evidence."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {r.claims.map((claim) => (
            <ClaimCard
              key={claim.id}
              claim={claim}
              source={r.sources.find((s) => s.id === claim.sourceId)}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          title="Evidence sources"
          subtitle="Every judgement is traceable to a citable clinical source."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {r.sources.map((source) => (
            <EvidenceCard key={source.id} source={source} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          title="Explainable analysis"
          subtitle="Claim-level reasoning behind the verdict."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {r.explanations.map((item) => (
            <ExplanationCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <p className="rounded-2xl border border-border bg-muted/60 p-5 text-sm text-muted-foreground">
        This report uses placeholder data for demonstration. TruthSense AI supports clinical
        judgement — it does not replace a qualified healthcare professional.
      </p>
    </div>
  );
}
