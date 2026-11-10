import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Rendered once at build time and exported as /og-image.png.
export const dynamic = "force-static";

export async function GET() {
  const logo = await readFile(join(process.cwd(), "public/images/fox-mark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 96px",
          gap: 72,
          background: "radial-gradient(90% 120% at 0% 0%, #13213f 0%, #0a0e1a 60%)",
          color: "#edf1f8",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={197} height={256} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: -2,
              backgroundImage: "linear-gradient(135deg, #3b82f6, #22d3ee)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Davide Volpe
          </div>
          <div style={{ fontSize: 40, marginTop: 12 }}>Backend Engineer</div>
          <div style={{ fontSize: 30, marginTop: 16, color: "#8b95ab" }}>
            Java · Spring Boot · Distributed systems · Cloud-native
          </div>
          <div style={{ fontSize: 28, marginTop: 48, color: "#3b82f6" }}>davidevolpe.dev</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
