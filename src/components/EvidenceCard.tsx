import {
  ArrowUpRight,
  BookOpen,
  Building2,
  FlaskConical,
  HeartPulse,
  Landmark,
  MinusCircle,
  PlusCircle,
  Stethoscope,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

const orgIcons: Record<string, typeof BookOpen> = {
  WHO: HeartPulse,
  NIH: FlaskConical,
  PubMed: BookOpen,
  FDA: Landmark,
  NICE: Stethoscope,
  BMJ: BookOpen,
};

function iconFor(publisher: string) {
  const key = Object.keys(orgIcons).find((k) => publisher.toUpperCase().includes(k.toUpperCase()));
  return key ? orgIcons[key] : Building2;
}

export function EvidenceCard({ source }: { source: EvidenceSource }) {
  const { label, className, Icon } = agreementConfig[source.agreement];
  const OrgIcon = iconFor(source.publisher);

  return (
    <article className="surface-card group flex h-full flex-col gap-3 p-5 hover:-translate-y-0.5">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          <OrgIcon className="size-5" />
        </span>
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

      <p className="line-clamp-2 rounded-xl bg-muted/70 p-3 text-sm leading-relaxed text-muted-foreground">
        “{source.excerpt}”
      </p>

      <Button asChild variant="outline" size="sm" className="mt-auto w-fit rounded-xl">
        <a href={source.url} target="_blank" rel="noreferrer">
          View source
          <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Button>
    </article>
  );
}
