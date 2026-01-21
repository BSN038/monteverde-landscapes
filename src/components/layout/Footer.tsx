/* =========================================================
   Footer – Monteverde Landscapes
   Global footer for marketing pages.
   ========================================================= */

import Link from "next/link";

function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M13.5 22v-8h2.7l.5-3H13.5V9.2c0-.9.4-1.6 1.7-1.6H16.8V5.1c-.3 0-1.4-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8V11H6.7v3h2.6v8h4.2z"
      />
    </svg>
  );
}

function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4z"
      />
      <path
        fill="currentColor"
        d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
      />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function IconNextdoor(props: React.SVGProps<SVGSVGElement>) {
  // Simple "n" mark (brand-ish, neutral)
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M8.4 18.6c-1.9 0-3.4-1.5-3.4-3.4V8.8c0-1.9 1.5-3.4 3.4-3.4h.3c1.9 0 3.4 1.5 3.4 3.4v6.4c0 .8.6 1.4 1.4 1.4h.1c.8 0 1.4-.6 1.4-1.4V8.8c0-1.9 1.5-3.4 3.4-3.4h.2c1.9 0 3.4 1.5 3.4 3.4v6.4c0 1.9-1.5 3.4-3.4 3.4h-.2c-1.9 0-3.4-1.5-3.4-3.4v-.6c-.6 1.3-1.9 2.2-3.5 2.2h-.1c-2.2 0-4-1.8-4-4V8.8c0-.8-.6-1.4-1.4-1.4h-.3c-.8 0-1.4.6-1.4 1.4v6.4c0 .8.6 1.4 1.4 1.4H9v2H8.4z"
      />
    </svg>
  );
}

function IconGoogle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 10.2v3.7h5.2c-.8 2.3-2.9 3.9-5.2 3.9A5.8 5.8 0 1 1 12 6.2c1.4 0 2.6.5 3.6 1.4l2.6-2.6A9.5 9.5 0 1 0 21.5 12c0-.6-.1-1.2-.2-1.8H12z"
      />
    </svg>
  );
}
function IconPhone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M6.6 2.8c.6-.6 1.5-.6 2.1 0l2.2 2.2c.6.6.6 1.5 0 2.1l-1.2 1.2c-.2.2-.3.6-.2.9.7 2 2.6 3.9 4.6 4.6.3.1.7 0 .9-.2l1.2-1.2c.6-.6 1.5-.6 2.1 0l2.2 2.2c.6.6.6 1.5 0 2.1l-1.1 1.1c-1 1-2.5 1.4-3.9 1.1-6.1-1.4-10.9-6.2-12.3-12.3-.3-1.4.1-2.9 1.1-3.9l1.1-1.1z"
      />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // ✅ Edita aquí si cambian datos
  const phoneDisplay = "07304 164994";
  const phoneHref = "tel:+447304164994";
  const email = "info@monteverdelandscapers.com";

  // Pon aquí los enlaces reales cuando los tengas.
  // Si aún no tienes el link exacto de alguno, déjalo como "#" por ahora.
  const socials = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/16nXWbEgku/?mibextid=wwXIfr",
      Icon: IconFacebook,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/monteverdelandscapers?igsh=YjNtMDI1M3VjMjky&utm_source=qr",
      Icon: IconInstagram,
    },
    {
      name: "Nextdoor",
      href: "https://nextdoor.co.uk/p/B4ZmPy9HYZQ9?utm_source=share&extras=MTc1OTIyMzk2ODg0NTA%3D&share_platform=10&utm_campaign=1769009645052&share_action_id=f97ea36c-9392-4fc2-89aa-57a98eee3934",
      Icon: IconNextdoor,
    },
    {
      name: "Google",
      href: "#",
      Icon: IconGoogle,
    },
    
  ] as const;

  const linkStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
  };

  const iconButtonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.12)",
    color: "inherit",
    textDecoration: "none",
  };

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
          alignItems: "flex-start",
          padding: "2rem 0",
          flexWrap: "wrap",
          gap: "1.25rem",
        }}
      >
        {/* Left: brand + copyright */}
        <div style={{ display: "grid", gap: "0.5rem" }}>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>
            © {currentYear} Monteverde Landscapes. All rights reserved.
          </p>

          {/* Contact */}
          <div style={{ display: "grid", gap: "0.35rem", fontSize: "0.875rem" }}>
            <a href={phoneHref} style={linkStyle} aria-label={`Call ${phoneDisplay}`}>
              <IconPhone style={{ opacity: 0.9 }} />
              <span>{phoneDisplay}</span>
            </a>

            <a href={`mailto:${email}`} style={linkStyle} aria-label={`Email ${email}`}>
              <span style={{ opacity: 0.9 }}>Email:</span>
              <span>{email}</span>
            </a>
          </div>
        </div>

        {/* Right: socials + legal */}
        <div
          style={{
            display: "grid",
            gap: "0.9rem",
            justifyItems: "end",
            width: "min(520px, 100%)",
          }}
        >
          {/* Social icons */}
          <div
            aria-label="Social links"
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            {socials.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target={href === "#" ? undefined : "_blank"}
                rel={href === "#" ? undefined : "noreferrer noopener"}
                aria-label={name}
                title={name}
                style={iconButtonStyle}
              >
                <Icon />
              </a>
            ))}
          </div>

          {/* Legal nav (kept from original) */}
          <nav aria-label="Footer legal">
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
      </div>
    </footer>
  );
}
