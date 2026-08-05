import { cn } from "@/lib/utils";

export function ResponseCard({
  label,
  badge,
  text,
  tone = "neutral",
  className,
}: {
  label: string;
  badge?: string;
  text: string;
  tone?: "neutral" | "flagged" | "verified";
  className?: string;
}) {
  const accent =
    tone === "flagged"
      ? "border-destructive/40"
      : tone === "verified"
        ? "border-success/40"
        : "border-border";

  const badgeTone =
    tone === "flagged"
      ? "bg-destructive-soft text-destructive"
      : tone === "verified"
        ? "bg-success-soft text-success"
        : "bg-secondary text-secondary-foreground";

  return (
    <section className={cn("surface-card border-2 p-5 sm:p-6", accent, className)}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h3 className="truncate text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </h3>
        {badge && (
          <span
            className={cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold", badgeTone)}
          >
            {badge}
          </span>
        )}
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">{text}</p>
    </section>
  );
}
