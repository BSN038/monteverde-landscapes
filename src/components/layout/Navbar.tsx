/* =========================================================
   Navbar – Monteverde Landscapes
   Primary navigation for marketing pages.
   ========================================================= */

import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <nav className="container">
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 0",
            listStyle: "none",
            margin: 0,
          }}
        >
          {/* Logo */}
          <li>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              <img
                src="/brand/logo-round.png"
                alt="Monteverde Landscaping"
                style={{
                  width: "56px",
                  height: "56px",
                  objectFit: "contain",
                  display: "block",
                }}
              />

              <span>Monteverde</span>
            </Link>
          </li>

          {/* Navigation Links */}
          <li>
            <ul
              style={{
                display: "flex",
                gap: "0.75rem",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              <li>
                <Link href="/projects" className="nav-link">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/services" className="nav-link">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/process" className="nav-link">
                  Process
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="nav-link">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
