import type { TPopulatedAdmin } from "./admin.types";

export type TLeadStatus =
  | "new"
  | "assigned"
  | "interested"
  | "converted"
  | "canceled"
  | "blocked";

export type TFollowUp = {
  note: string;
  // doneBy (Populated)
  doneBy: TPopulatedAdmin;
  createdAt?: string;
  updatedAt?: string;
};

export type TLead = {
  _id: string;
  name: string;
  contact: string;
  details?: string;
  lead_source: string;
  status: TLeadStatus;

  // References (Populated)
  assignedTo?: TPopulatedAdmin;
  referredBy?: TPopulatedAdmin;
  convertedBy?: TPopulatedAdmin;

  followUps: TFollowUp[];
  createdAt?: string;
  updatedAt?: string;
};
