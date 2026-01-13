"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <header>
      <div className="navbar-shell">
        <nav className="container">
          <ul className="navbar-row">
            {/* LOGO */}
            <li className="brand">
              <Link href="/" className="brand-link">
                <img
                  src="/brand/logo-round.png"
                  alt="Monteverde Landscaping"
                  className="brand-logo"
                />
              </Link>
            </li>

            {/* NAV LINKS */}
            <li className="navbar-nav">
              <ul className="nav-list">
                <li>
                  <Link
                    href="/projects"
                    className={`nav-link ${isActive("/projects") ? "nav-link-active" : ""}`}
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className={`nav-link ${isActive("/services") ? "nav-link-active" : ""}`}
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/process"
                    className={`nav-link ${isActive("/process") ? "nav-link-active" : ""}`}
                  >
                    Process
                  </Link>
                </li>
                <li>
                  <Link
                    href="/reviews"
                    className={`nav-link ${isActive("/reviews") ? "nav-link-active" : ""}`}
                  >
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className={`nav-link ${isActive("/contact") ? "nav-link-active" : ""}`}
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
