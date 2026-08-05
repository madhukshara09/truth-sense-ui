export type Verdict = "verified" | "partial" | "hallucination";

export interface EvidenceSource {
  id: string;
  title: string;
  publisher: string;
  year: number;
  type: "Clinical guideline" | "Systematic review" | "RCT" | "Regulatory";
  excerpt: string;
  url: string;
  agreement: "supports" | "contradicts" | "context";
}

export interface ExplanationCard {
  id: string;
  title: string;
  detail: string;
  tone: "success" | "warning" | "destructive" | "neutral";
}

export interface VerificationResult {
  question: string;
  originalResponse: string;
  verifiedResponse: string;
  trustScore: number;
  verdict: Verdict;
  checkedClaims: number;
  flaggedClaims: number;
  latencyMs: number;
  sources: EvidenceSource[];
  explanations: ExplanationCard[];
}

export const sampleQuestions = [
  "Can I take ibuprofen with lisinopril for chronic back pain?",
  "Is a fasting glucose of 118 mg/dL considered diabetes?",
  "How long should antibiotics be given for uncomplicated cystitis?",
  "Does vitamin C shorten the duration of the common cold?",
];

export const placeholderResult: VerificationResult = {
  question: "Can I take ibuprofen with lisinopril for chronic back pain?",
  originalResponse:
    "Yes, ibuprofen is completely safe to combine with lisinopril and has no effect on blood pressure. You can take up to 3200 mg daily long-term without monitoring, and NSAIDs are the first-line choice for chronic back pain in patients with hypertension.",
  verifiedResponse:
    "Ibuprofen and lisinopril can interact. NSAIDs may blunt the antihypertensive effect of ACE inhibitors and, especially when combined with a diuretic, increase the risk of acute kidney injury. Short courses at the lowest effective dose may be acceptable under clinician supervision, with blood pressure and renal function monitoring. For chronic low back pain, guidelines favour non-pharmacological care first, with NSAIDs used as a time-limited option rather than an indefinite therapy. Discuss alternatives such as topical NSAIDs or acetaminophen with your prescriber.",
  trustScore: 38,
  verdict: "hallucination",
  checkedClaims: 5,
  flaggedClaims: 3,
  latencyMs: 2140,
  sources: [
    {
      id: "s1",
      title: "Hypertension in adults: diagnosis and management (NG136)",
      publisher: "NICE",
      year: 2023,
      type: "Clinical guideline",
      excerpt:
        "NSAIDs can reduce the effectiveness of antihypertensive therapy and should be used with caution in people taking ACE inhibitors.",
      url: "https://example.org/nice-ng136",
      agreement: "contradicts",
    },
    {
      id: "s2",
      title: "Triple whammy: NSAID + ACE inhibitor + diuretic and acute kidney injury",
      publisher: "BMJ",
      year: 2013,
      type: "Systematic review",
      excerpt:
        "Concurrent use of a diuretic, ACE inhibitor and NSAID was associated with a significantly increased rate of acute kidney injury.",
      url: "https://example.org/bmj-triple-whammy",
      agreement: "supports",
    },
    {
      id: "s3",
      title: "Noninvasive treatments for acute, subacute, and chronic low back pain",
      publisher: "American College of Physicians",
      year: 2017,
      type: "Clinical guideline",
      excerpt:
        "Clinicians should initially select nonpharmacologic treatment for chronic low back pain; NSAIDs are a first-line pharmacologic option only if nonpharmacologic therapy fails.",
      url: "https://example.org/acp-low-back-pain",
      agreement: "context",
    },
    {
      id: "s4",
      title: "Ibuprofen prescribing information — maximum dosing",
      publisher: "FDA",
      year: 2021,
      type: "Regulatory",
      excerpt:
        "Use the lowest effective dose for the shortest duration. Prescription maximum is 3200 mg/day, but chronic use requires monitoring of renal function and blood pressure.",
      url: "https://example.org/fda-ibuprofen",
      agreement: "contradicts",
    },
  ],
  explanations: [
    {
      id: "e1",
      title: "Interaction denied incorrectly",
      detail:
        "The original answer states there is no interaction. Guideline evidence documents a pharmacodynamic interaction where NSAIDs blunt ACE inhibitor efficacy.",
      tone: "destructive",
    },
    {
      id: "e2",
      title: "Unsafe dosing advice",
      detail:
        "\"Up to 3200 mg daily long-term without monitoring\" contradicts labelling that requires the lowest effective dose and renal monitoring.",
      tone: "destructive",
    },
    {
      id: "e3",
      title: "Guideline ordering reversed",
      detail:
        "NSAIDs were presented as first-line for chronic back pain; guidelines place non-pharmacological care first.",
      tone: "warning",
    },
    {
      id: "e4",
      title: "Correctly identified drug class",
      detail:
        "Lisinopril was accurately classified as an ACE inhibitor and ibuprofen as an NSAID — the entity grounding held up.",
      tone: "success",
    },
  ],
};

export const trustBands: Record<Verdict, { label: string; description: string }> = {
  verified: {
    label: "Verified",
    description: "All extracted claims matched high-quality medical evidence.",
  },
  partial: {
    label: "Partially supported",
    description: "Some claims are supported; others lack grounding or overstate certainty.",
  },
  hallucination: {
    label: "Hallucination detected",
    description: "One or more claims contradict authoritative medical evidence.",
  },
};
