// src/types/lead.ts

export type LeadSource = "quote" | "contact" | "review" | "unknown";

export type LeadStatus = "new" | "in_progress" | "won" | "lost";

export type LeadCreateInput = {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;

  message?: string;

  // Quote-specific (optional for other sources)
  service?: string;
  budget?: string;
  timeline?: string;

  source?: LeadSource;

  // Lightweight metadata (optional)
  pagePath?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
};

export type LeadRecord = LeadCreateInput & {
  id: string;
  createdAt: string; // ISO date
  status: LeadStatus;
};
