import { cn } from "@/lib/utils";
import type { Verdict } from "@/lib/verification-data";

const bandFor = (score: number): Verdict =>
  score >= 80 ? "verified" : score >= 55 ? "partial" : "hallucination";

const toneClass: Record<Verdict, { ring: string; text: string }> = {
  verified: { ring: "text-success", text: "text-success" },
  partial: { ring: "text-warning", text: "text-warning" },
  hallucination: { ring: "text-destructive", text: "text-destructive" },
};

export function TrustScoreRing({
  score,
  size = 148,
  label = "Trust score",
}: {
  score: number;
  size?: number;
  label?: string;
}) {
  const band = bandFor(score);
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" role="img" aria-label={`${label}: ${score} out of 100`}>
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
            className={cn("transition-[stroke-dashoffset] duration-1000 ease-out", toneClass[band].ring)}
            stroke="currentColor"
            strokeDasharray={c}
            strokeDashoffset={c - (c * score) / 100}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-display text-3xl font-bold", toneClass[band].text)}>
            {score}
          </span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
}
