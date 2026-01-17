import type { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main style={{ padding: "2rem" }}>
      {children}
    </main>
  );
}
