import { AlertTriangle, BadgeCheck, Link2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ClaimBreakdown, EvidenceSource } from "@/lib/verification-data";

const statusConfig = {
  supported: { label: "Supported", badge: "bg-success-soft text-success", Icon: BadgeCheck },
  insufficient: {
    label: "Insufficient Evidence",
    badge: "bg-warning-soft text-warning-foreground",
    Icon: AlertTriangle,
  },
  contradicted: {
    label: "Contradicted",
    badge: "bg-destructive-soft text-destructive",
    Icon: XCircle,
  },
} as const;

export function ClaimCard({
  claim,
  source,
}: {
  claim: ClaimBreakdown;
  source?: EvidenceSource | undefined;
}) {
  const { label, badge, Icon } = statusConfig[claim.status];

  return (
    <article className="surface-card flex h-full flex-col gap-3 p-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <p className="min-w-0 text-base font-semibold leading-snug">“{claim.claim}”</p>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
            badge,
          )}
        >
          <Icon className="size-3.5" />
          {label}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Confidence</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-700"
            style={{ width: `${claim.confidence}%` }}
          />
        </div>
        <span className="text-xs font-semibold">{claim.confidence}%</span>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{claim.explanation}</p>
      {source && (
        <a
          href={source.url}
          target="_blank"
          rel="noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          <Link2 className="size-4 shrink-0" />
          <span className="truncate">
            {source.publisher} · {source.title}
          </span>
        </a>
      )}
    </article>
  );
}
