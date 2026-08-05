import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <ShieldCheck className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="font-display font-semibold">TruthSense AI</p>
            <p className="text-sm text-muted-foreground">
              Evidence-grounded verification for medical AI answers. Not a substitute for
              professional care.
            </p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Link to="/verify" className="transition-colors hover:text-foreground">
            Verify
          </Link>
          <Link to="/results" className="transition-colors hover:text-foreground">
            Results
          </Link>
          <Link to="/about" className="transition-colors hover:text-foreground">
            About
          </Link>
        </nav>
      </div>
      <div className="border-t border-border/70 px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} TruthSense AI · Demo data shown; live verification API coming
        soon.
      </div>
    </footer>
  );
}
