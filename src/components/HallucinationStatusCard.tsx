import { AlertTriangle, CheckCircle2, Search, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HallucinationStatus } from "@/lib/verification-data";

const statusConfig: Record<
  HallucinationStatus,
  { label: string; badge: string; border: string; Icon: typeof CheckCircle2 }
> = {
  verified: {
    label: "Verified",
    badge: "bg-success-soft text-success",
    border: "border-success/40",
    Icon: CheckCircle2,
  },
  "partially-supported": {
    label: "Partially Supported",
    badge: "bg-warning-soft text-warning-foreground",
    border: "border-warning/50",
    Icon: AlertTriangle,
  },
  "needs-review": {
    label: "Needs Review",
    badge: "bg-accent text-accent-foreground",
    border: "border-accent",
    Icon: Search,
  },
  "high-risk": {
    label: "High Hallucination Risk",
    badge: "bg-destructive-soft text-destructive",
    border: "border-destructive/40",
    Icon: ShieldAlert,
  },
};

export function HallucinationStatusCard({
  status,
  reason,
  className,
}: {
  status: HallucinationStatus;
  reason: string;
  className?: string;
}) {
  const { label, badge, border, Icon } = statusConfig[status];

  return (
    <section className={cn("surface-card border-2 p-6 sm:p-8", border, className)}>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Hallucination status
      </p>
      <span
        className={cn(
          "mt-4 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
          badge,
        )}
      >
        <Icon className="size-4 shrink-0" />
        {label}
      </span>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{reason}</p>
    </section>
  );
}
