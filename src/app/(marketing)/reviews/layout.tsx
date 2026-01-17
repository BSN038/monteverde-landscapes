import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Reviews | Monteverde Landscapes",
  description:
    "Read published customer reviews for Monteverde Landscapes in Manchester and share your experience. All reviews are moderated before publication.",
};

export default function ReviewsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
