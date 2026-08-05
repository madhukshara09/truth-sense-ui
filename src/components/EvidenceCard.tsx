import { ArrowUpRight, MinusCircle, PlusCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EvidenceSource } from "@/lib/verification-data";

const agreementConfig = {
  supports: { label: "Supports", className: "bg-success-soft text-success", Icon: PlusCircle },
  contradicts: {
    label: "Contradicts",
    className: "bg-destructive-soft text-destructive",
    Icon: XCircle,
  },
  context: { label: "Context", className: "bg-primary-soft text-primary", Icon: MinusCircle },
} as const;

export function EvidenceCard({ source }: { source: EvidenceSource }) {
  const { label, className, Icon } = agreementConfig[source.agreement];

  return (
    <article className="surface-card group flex h-full flex-col gap-3 p-5 hover:-translate-y-0.5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold leading-snug">{source.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {source.publisher} · {source.year} · {source.type}
          </p>
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
            className,
          )}
        >
          <Icon className="size-3.5" />
          {label}
        </span>
      </div>

      <p className="rounded-xl bg-muted/70 p-3 text-sm leading-relaxed text-muted-foreground">
        “{source.excerpt}”
      </p>

      <a
        href={source.url}
        target="_blank"
        rel="noreferrer"
        className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        View source
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </article>
  );
}
