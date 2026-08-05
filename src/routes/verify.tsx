import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, Sparkles, Stethoscope, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sampleQuestions, placeholderResult } from "@/lib/verification-data";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "Verify a medical AI answer — TruthSense AI" },
      {
        name: "description",
        content:
          "Paste a medical question and an AI-generated answer to fact-check every claim against clinical evidence.",
      },
      { property: "og:title", content: "Verify a medical AI answer — TruthSense AI" },
      {
        property: "og:description",
        content: "Fact-check AI healthcare answers claim by claim against clinical evidence.",
      },
    ],
  }),
  component: VerifyPage,
});

const stages = [
  "Extracting medical claims…",
  "Retrieving clinical evidence…",
  "Scoring agreement and source quality…",
];

function VerifyPage() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);

  const canSubmit = question.trim().length > 4 && !loading;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setStage(0);
    // Placeholder verification flow — replaced by the API later.
    const t1 = setTimeout(() => setStage(1), 700);
    const t2 = setTimeout(() => setStage(2), 1400);
    const t3 = setTimeout(() => {
      clearTimeout(t1);
      clearTimeout(t2);
      navigate({ to: "/results" });
    }, 2100);
    return () => clearTimeout(t3);
  }

  return (
    <div className="hero-surface min-h-full border-b border-border/70">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="animate-rise text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
            <Stethoscope className="size-4" />
            Medical claim verification
          </span>
          <h1 className="mt-5 text-3xl font-bold sm:text-4xl">Verify a healthcare AI response</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Enter the clinical question and, optionally, the AI answer you want checked. Every
            claim is grounded against guidelines and primary literature.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="surface-card mt-10 animate-rise p-6 sm:p-8">
          <div className="space-y-2">
            <Label htmlFor="question" className="text-sm font-semibold">
              Medical question
            </Label>
            <Textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. Can I take ibuprofen with lisinopril for chronic back pain?"
              rows={3}
              disabled={loading}
              className="resize-none rounded-xl text-base"
            />
          </div>

          <div className="mt-5 space-y-2">
            <Label htmlFor="answer" className="text-sm font-semibold">
              AI response to verify{" "}
              <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Paste the answer produced by ChatGPT, Gemini, Claude or your own model…"
              rows={6}
              disabled={loading}
              className="resize-none rounded-xl text-base"
            />
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Try an example
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sampleQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setQuestion(q);
                    if (q === placeholderResult.question) setAnswer(placeholderResult.originalResponse);
                  }}
                  className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/40 hover:bg-primary-soft hover:text-primary disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={!canSubmit}
            className="mt-8 w-full rounded-xl text-base"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Verifying…
              </>
            ) : (
              <>
                <Wand2 />
                Verify response
              </>
            )}
          </Button>

          {loading && (
            <div className="mt-6 space-y-3 rounded-xl bg-muted/70 p-4">
              {stages.map((s, i) => (
                <div key={s} className="flex items-center gap-3 text-sm transition-opacity">
                  {i < stage ? (
                    <Sparkles className="size-4 shrink-0 text-success" />
                  ) : i === stage ? (
                    <Loader2 className="size-4 shrink-0 animate-spin text-primary" />
                  ) : (
                    <span className="size-4 shrink-0 rounded-full border border-border" />
                  )}
                  <span className={i <= stage ? "text-foreground" : "text-muted-foreground"}>
                    {s}
                  </span>
                </div>
              ))}
              <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
                  style={{ width: `${((stage + 1) / stages.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Demo mode: results use placeholder data. TruthSense AI is not medical advice.
          </p>
        </form>
      </div>
    </div>
  );
}
