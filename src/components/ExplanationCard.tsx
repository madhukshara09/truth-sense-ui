import { CheckCircle2, CircleAlert, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExplanationCard as ExplanationCardType } from "@/lib/verification-data";

const toneConfig = {
  success: { className: "bg-success-soft text-success", Icon: CheckCircle2 },
  warning: { className: "bg-warning-soft text-warning-foreground", Icon: TriangleAlert },
  destructive: { className: "bg-destructive-soft text-destructive", Icon: CircleAlert },
  neutral: { className: "bg-primary-soft text-primary", Icon: Info },
} as const;

export function ExplanationCard({ item }: { item: ExplanationCardType }) {
  const { className, Icon } = toneConfig[item.tone];

  return (
    <article className="surface-card flex h-full gap-3 p-5">
      <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl", className)}>
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <h3 className="text-base font-semibold leading-snug">{item.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
      </div>
    </article>
  );
}
