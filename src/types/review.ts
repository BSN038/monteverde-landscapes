// src/types/review.ts

export type ReviewStatus = "pending" | "approved" | "rejected";

export type ReviewCreateInput = {
  fullName: string;
  email: string;

  rating: 1 | 2 | 3 | 4 | 5;
  message: string;

  // Optional context
  location?: string; // e.g. "Didsbury, Manchester"
  projectType?: string; // e.g. "Patio", "Turf", etc.
  source?: "website";
};

export type ReviewRecord = ReviewCreateInput & {
  id: string;
  createdAt: string; // ISO date
  status: ReviewStatus;
};
