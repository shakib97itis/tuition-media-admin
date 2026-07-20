import type { TAdmin } from "./admin.types";
import type { TLead } from "./lead.types";
import type { TTeacher } from "./teacher.types";

// ==========================================
// Enums & Literal Types
// ==========================================
export type TStudentGender = "male" | "female" | "other";
export type TTutoringType = "home" | "online" | "batch";
export type TRateType = "monthly" | "per_class" | "per_week";
export type TTutorGender = "male" | "female" | "any";
export type TJobStatus =
  | "draft"
  | "open"
  | "assigned"
  | "demo"
  | "follow-up"
  | "confirmed"
  | "cancelled";

// ==========================================
// Main Tuition Job Interface (Frontend DTO)
// ==========================================
export interface ITuitionJob<
  TLead = string,
  TPostedBy = string,
  TAssignedTutor = string | null,
  TAssignedAdmin = string | null,
> {
  _id: string;

  // --- Source & Internal Meta ---
  lead_from: TLead;
  posted_by: TPostedBy;
  assigned_admin?: TAssignedAdmin;
  assigned_tutor?: TAssignedTutor;
  serial_number?: string;
  conversion_note?: string;

  // --- Public Posting Data ---
  title: string;
  job_description?: string;

  // --- Student Information ---
  student_gender: TStudentGender;
  number_of_students: number;
  tutoring_type: TTutoringType;
  student_education: {
    category: string; // Matched to schema (single string)
    course: string; // Matched to schema (single string)
    subjects: string[];
  };
  location: {
    full_address: string;
    country: string;
    city: string;
    area: string;
    latitude?: number;
    longitude?: number;
  };
  contact: string;
  additional_contact?: string;

  // --- Schedule & Timing ---
  days_per_week: number;
  preferred_time: string;

  // --- Financial ---
  salary: {
    min?: number;
    max?: number;
    negotiable: boolean;
    rate_type: TRateType;
    actual_salary?: number;
  };

  // --- Tutor Requirements ---
  tutor_gender: TTutorGender;
  tutor_qualification: string[];
  special_requirements?: string;

  // --- Overall Job Status ---
  status: TJobStatus;

  // --- Timestamps ---
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// Usage Types
// ==========================================
export type TTuitionJobListItem = ITuitionJob;
export type TTuitionJobDetail = ITuitionJob<TLead, TAdmin, TTeacher, TAdmin>;
