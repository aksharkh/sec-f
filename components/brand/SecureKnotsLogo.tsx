"use client";

import { useId } from "react";
import { CRESCENTS, FRAME, KNOT_BOX, NAVY, STRANDS, VIEWBOX } from "@/lib/brand/logo-data";

type Props = {
  /** "badge": the registered mark (navy hexagon, metallic knot). "knot": the knot alone, in currentColor. */
  variant?: "badge" | "knot";
  className?: string;
  /** Accessible name. Omit when the logo sits next to a visible "SecureKnots" wordmark. */
  title?: string;
  /** Hairline keyline so the navy badge separates from dark backgrounds. */
  onDark?: boolean;
  /** Render the extra layers used by the knotting animation and start hidden (see knotTimeline). */
  animated?: boolean;
};

const pts = (poly: [number, number][]) => poly.map(([x, y]) => `${x},${y}`).join(" ");

/** The SecureKnots mark. Geometry lives in lib/brand/logo-data.ts. */
export function SecureKnotsLogo({ variant = "badge", className, title, onDark, animated }: Props) {
  const uid = "sk" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const mono = variant === "knot";
  const [, , vw, vh] = VIEWBOX;
  const box = mono ? KNOT_BOX : VIEWBOX;
  const ref = (s: string) => `url(#${uid}-${s})`;
  const pad = { x: -60, y: -60, w: vw + 120, h: vh + 120 };

  return (
    <svg
      viewBox={box.join(" ")}
      className={className}
      style={{ aspectRatio: `${box[2]} / ${box[3]}` }}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      data-knot-intro={animated ? "" : undefined}
      overflow="visible"
    >
      {title && <title>{title}</title>}
      <defs>
        {!mono &&
          [...STRANDS, ...CRESCENTS].map((s) => (
            <linearGradient key={s.id} id={`${uid}-${s.id}-g`} gradientUnits="userSpaceOnUse" x1={s.grad.x1} y1={s.grad.y1} x2={s.grad.x2} y2={s.grad.y2}>
              {s.grad.stops.map(([o, c]) => (
                <stop key={o} offset={o} stopColor={c} />
              ))}
            </linearGradient>
          ))}
        {STRANDS.filter((s) => s.cuts.length).map((s) => (
          <mask key={s.id} id={`${uid}-${s.id}-m`} maskUnits="userSpaceOnUse" x={pad.x} y={pad.y} width={pad.w} height={pad.h}>
            <rect x={pad.x} y={pad.y} width={pad.w} height={pad.h} fill="#fff" />
            {s.cuts.map((c, i) => (
              <polygon key={i} points={pts(c)} fill="#000" />
            ))}
          </mask>
        ))}
        {CRESCENTS.map((c) => (
          <g key={c.id}>
            <clipPath id={`${uid}-${c.id}-p`}>
              <polygon points={pts(c.plane)} />
            </clipPath>
            {c.c3 && (
              <clipPath id={`${uid}-${c.id}-c`}>
                <circle cx={c.c3[0]} cy={c.c3[1]} r={c.c3[2]} />
              </clipPath>
            )}
            {c.c2 && (
              <mask id={`${uid}-${c.id}-m`} maskUnits="userSpaceOnUse" x={pad.x} y={pad.y} width={pad.w} height={pad.h}>
                <rect x={pad.x} y={pad.y} width={pad.w} height={pad.h} fill="#fff" />
                <circle cx={c.c2[0]} cy={c.c2[1]} r={c.c2[2]} fill="#000" />
              </mask>
            )}
          </g>
        ))}
        {animated && !mono && (
          <>
            <linearGradient id={`${uid}-shine`} x1="0" y1="0" x2="1" y2="0.35">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id={`${uid}-shine-m`} maskUnits="userSpaceOnUse" x={pad.x} y={pad.y} width={pad.w} height={pad.h}>
              <use href={`#${uid}-knot`} />
            </mask>
          </>
        )}
      </defs>

      {!mono && (
        <path
          data-knot-frame
          d={FRAME}
          fill={NAVY}
          stroke={onDark ? "rgb(255 255 255 / 0.16)" : undefined}
          strokeWidth={onDark ? 3 : undefined}
        />
      )}
      {animated && !mono && (
        <path data-knot-frame-line d={FRAME} fill="none" stroke={NAVY} strokeWidth={4} pathLength={1} opacity={0} />
      )}

      <g id={`${uid}-knot`} data-knot-strands>
        {CRESCENTS.map((c) => {
          let shape = (
            <circle cx={c.c1[0]} cy={c.c1[1]} r={c.c1[2]} fill={mono ? "currentColor" : ref(`${c.id}-g`)} mask={c.c2 ? ref(`${c.id}-m`) : undefined} />
          );
          if (c.c3) shape = <g clipPath={ref(`${c.id}-c`)}>{shape}</g>;
          return (
            <g key={c.id} data-knot-piece data-layer={c.layer} data-out={c.out.join(",")}>
              <g clipPath={ref(`${c.id}-p`)}>{shape}</g>
            </g>
          );
        })}
        {STRANDS.map((s) => (
          <g key={s.id} data-knot-piece data-layer={s.layer} data-out={s.out.join(",")} data-dir={s.dir}>
            <path
              data-knot-draw
              d={s.d}
              fill="none"
              stroke={mono ? "currentColor" : ref(`${s.id}-g`)}
              strokeWidth={s.w}
              strokeLinecap="round"
              mask={s.cuts.length ? ref(`${s.id}-m`) : undefined}
              pathLength={1}
            />
          </g>
        ))}
      </g>

      {animated && !mono && (
        <g mask={ref("shine-m")} pointerEvents="none">
          <rect data-knot-shine x={-vw} y={0} width={vw * 0.6} height={vh} fill={ref("shine")} opacity={0} />
        </g>
      )}
    </svg>
  );
}
