/* =========================================================
   Footer – Monteverde Landscapes
   Global footer for marketing pages.
   ========================================================= */

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(0,0,0,0.08)",
        marginTop: "4rem",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2rem 0",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p style={{ margin: 0, fontSize: "0.875rem" }}>
          © {currentYear} Monteverde Landscapes. All rights reserved.
        </p>

        <nav>
          <ul
            style={{
              display: "flex",
              gap: "1.25rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
              fontSize: "0.875rem",
            }}
          >
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
