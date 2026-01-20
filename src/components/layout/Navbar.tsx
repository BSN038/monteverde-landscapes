"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header>
      <div className="navbar-shell">
        <nav className="container">
          <ul className="navbar-row">
            {/* BRAND / LOGO */}
            <li className="brand">
              <Link
                href="/"
                className="brand-link"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.35rem",
                  textDecoration: "none",
                }}
              >
                {/* Simple logo mark (NO outer circle wrapper) */}
                <img
                  src="/brand/logo-mark.png"
                  alt="Monteverde Landscaping"
                  style={{
                    width: 180,
                    height: 180,
                    objectFit: "contain",
                    display: "block",
                  }}
                />

                {/* Brand name (line 1) */}
                <span
                  style={{
                    marginTop: "0.2rem",
                    fontSize: "1.02rem",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    color: "rgba(22, 64, 48, 0.98)",
                    lineHeight: 1.1,
                  }}
                >
                  MONTEVERDE
                </span>

                {/* Brand descriptor (line 2) */}
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.26em",
                    color: "rgba(22, 64, 48, 0.92)",
                    marginTop: "-0.15rem",
                    lineHeight: 1.1,
                  }}
                >
                  LANDSCAPING
                </span>

                {/* Slogan (line 3) */}
                <span
                  style={{
                    marginTop: "0.35rem",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    color: "rgba(22, 64, 48, 0.72)",
                    textTransform: "uppercase",
                    textAlign: "center",
                    lineHeight: 1.2,
                    maxWidth: 220,
                  }}
                >
                  Premium Exterior Transformations
                </span>
              </Link>
            </li>

            {/* NAV LINKS */}
            <li className="navbar-nav">
              <ul className="nav-list">
                <li>
                  <Link
                    href="/"
                    className={`nav-link ${isActive("/") ? "nav-link-active" : ""}`}
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/projects"
                    className={`nav-link ${isActive("/projects") ? "nav-link-active" : ""
                      }`}
                  >
                    Projects
                  </Link>
                </li>

                <li>
                  <Link
                    href="/services"
                    className={`nav-link ${isActive("/services") ? "nav-link-active" : ""
                      }`}
                  >
                    Services
                  </Link>
                </li>

                <li>
                  <Link
                    href="/process"
                    className={`nav-link ${isActive("/process") ? "nav-link-active" : ""
                      }`}
                  >
                    Process
                  </Link>
                </li>

                <li>
                  <Link
                    href="/reviews"
                    className={`nav-link ${isActive("/reviews") ? "nav-link-active" : ""
                      }`}
                  >
                    Reviews
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className={`nav-link ${isActive("/contact") ? "nav-link-active" : ""
                      }`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
