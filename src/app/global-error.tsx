"use client";

// Last-resort boundary: it replaces the root layout, so no provider (translations, theme,
// fonts) is available here and the page must stand on its own.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {/* Headline */}
          <h1 role="alert" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
            Something went wrong
          </h1>

          {/* Action */}
          <button
            type="button"
            onClick={reset}
            style={{ padding: "0.5rem 1.25rem", border: "1px solid #111", cursor: "pointer" }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
