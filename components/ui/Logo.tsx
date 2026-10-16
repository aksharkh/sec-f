import { SecureKnotsLogo } from "@/components/brand/SecureKnotsLogo";

/**
 * The SecureKnots knot on its own, drawn in currentColor. Used for decorative
 * marks (marquees, watermarks). For the full badge use <SecureKnotsLogo />.
 * `strokeWidth` and `pathClassName` are accepted for older call sites and ignored.
 */
export function KnotMark({
  className,
}: {
  className?: string;
  strokeWidth?: number;
  pathClassName?: string;
}) {
  return <SecureKnotsLogo variant="knot" className={className} />;
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <SecureKnotsLogo className="h-8 w-auto" />
      <span className="text-[1.15rem] font-semibold tracking-[-0.04em]">
        Secure<span className="em text-brand-3">Knots</span>
      </span>
    </span>
  );
}
