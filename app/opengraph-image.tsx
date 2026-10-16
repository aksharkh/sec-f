import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "SecureKnots, Many frameworks. One secure knot.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/secureknots-logo-512.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#16243f", color: "#f3f0e8", padding: 72 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: "#9fb5ff" }}>SECUREKNOTS</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 96, lineHeight: 0.95, letterSpacing: -4 }}>
            <span>Many frameworks.</span>
            <span style={{ color: "#9fb5ff" }}>One secure knot.</span>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "rgba(243,240,232,0.6)" }}>SOC 2 · ISO 27001 · FedRAMP · CMMC · PCI DSS · ISO 42001</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> */}
        <img src={src} width={340} height={340} alt="" />
      </div>
    ),
    size,
  );
}
