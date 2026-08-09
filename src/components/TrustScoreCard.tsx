import { BookMarked, Clock, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConfidenceLevel } from "@/lib/verification-data";

const confidenceTone: Record<ConfidenceLevel, { ring: string; text: string; soft: string }> = {
  High: { ring: "text-success", text: "text-success", soft: "bg-success-soft text-success" },
  Medium: {
    ring: "text-warning",
    text: "text-warning-foreground",
    soft: "bg-warning-soft text-warning-foreground",
  },
  Low: {
    ring: "text-destructive",
    text: "text-destructive",
    soft: "bg-destructive-soft text-destructive",
  },
};

export function TrustScoreCard({
  score,
  confidence,
  sourceCount,
  latencyMs,
  className,
}: {
  score: number;
  confidence: ConfidenceLevel;
  sourceCount: number;
  latencyMs: number;
  className?: string;
}) {
  const tone = confidenceTone[confidence];
  const size = 172;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  const stats = [
    { Icon: Gauge, label: "Confidence level", value: confidence },
    { Icon: BookMarked, label: "Evidence sources", value: String(sourceCount) },
    { Icon: Clock, label: "Verification time", value: `${(latencyMs / 1000).toFixed(1)}s` },
  ];

  return (
    <section
      className={cn(
        "surface-card flex flex-col items-center gap-6 p-6 sm:p-8",
        className,
      )}
    >
      <div className="w-full text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Trust score
        </p>
      </div>

      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
          role="img"
          aria-label={`Trust score: ${score} out of 100`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            strokeWidth={stroke}
            className="stroke-secondary"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            stroke="currentColor"
            className={cn("transition-[stroke-dashoffset] duration-1000 ease-out", tone.ring)}
            strokeDasharray={c}
            strokeDashoffset={c - (c * score) / 100}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-display text-4xl font-bold", tone.text)}>{score}%</span>
          <span className="mt-1 text-xs text-muted-foreground">trust score</span>
        </div>
      </div>

      <span
        className={cn("rounded-full px-3.5 py-1.5 text-sm font-semibold", tone.soft)}
      >
        {confidence} confidence
      </span>

      <dl className="grid w-full gap-3 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-muted/70 p-4 text-center sm:text-left">
            <dt className="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground sm:justify-start">
              <s.Icon className="size-4" />
              {s.label}
            </dt>
            <dd className="mt-1 font-display text-xl font-bold">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
