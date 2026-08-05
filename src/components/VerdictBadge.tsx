import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { trustBands, type Verdict } from "@/lib/verification-data";

const config: Record<Verdict, { className: string; Icon: typeof CheckCircle2 }> = {
  verified: { className: "bg-success-soft text-success", Icon: CheckCircle2 },
  partial: { className: "bg-warning-soft text-warning-foreground", Icon: AlertTriangle },
  hallucination: { className: "bg-destructive-soft text-destructive", Icon: ShieldAlert },
};

export function VerdictBadge({
  verdict,
  className,
  withDescription = false,
}: {
  verdict: Verdict;
  className?: string;
  withDescription?: boolean;
}) {
  const { className: tone, Icon } = config[verdict];
  const band = trustBands[verdict];

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <span
        className={cn(
          "inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold",
          tone,
        )}
      >
        <Icon className="size-4 shrink-0" />
        {band.label}
      </span>
      {withDescription && <p className="text-sm text-muted-foreground">{band.description}</p>}
    </div>
  );
}
