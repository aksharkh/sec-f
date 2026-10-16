import { STORIES_ARE_SAMPLES } from "@/lib/stories";

/** Marks placeholder case studies until approved ones replace them. */
export function SampleTag({ className, dark }: { className?: string; dark?: boolean }) {
  if (!STORIES_ARE_SAMPLES) return null;
  return (
    <span
      title="Placeholder story. Replace with an approved, permission-cleared case study before launch."
      className={`eyebrow inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[0.58rem] ${
        dark ? "border-ivory/25 text-ivory/70" : "border-ink/15 text-muted"
      } ${className ?? ""}`}
    >
      <span className={`size-1 rounded-full ${dark ? "bg-ivory/60" : "bg-ink/40"}`} />
      Sample
    </span>
  );
}
