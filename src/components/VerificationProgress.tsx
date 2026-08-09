import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { verificationSteps } from "@/lib/verification-data";

export function VerificationProgress({ current }: { current: number }) {
  const pct = Math.min(100, ((current + 1) / verificationSteps.length) * 100);

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary-soft/50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        Verification in progress
      </p>

      <ol className="mt-4 space-y-1">
        {verificationSteps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={step} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full border-2 transition-colors duration-300",
                    done
                      ? "border-success bg-success text-success-foreground"
                      : active
                        ? "border-primary bg-card text-primary"
                        : "border-border bg-card text-muted-foreground",
                  )}
                >
                  {done ? (
                    <Check className="size-4" />
                  ) : active ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <span className="text-[11px] font-semibold">{i + 1}</span>
                  )}
                </span>
                {i < verificationSteps.length - 1 && (
                  <span
                    className={cn(
                      "my-1 w-0.5 flex-1 rounded-full transition-colors duration-500",
                      done ? "bg-success" : "bg-border",
                    )}
                  />
                )}
              </div>
              <p
                className={cn(
                  "pb-4 pt-1 text-sm transition-colors duration-300",
                  done
                    ? "text-foreground"
                    : active
                      ? "font-medium text-primary"
                      : "text-muted-foreground",
                )}
              >
                {step}
                {active && <span className="animate-pulse">…</span>}
              </p>
            </li>
          );
        })}
      </ol>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
