// Define roles centrally to reuse them
export type TAdminRole =
  | "tele_marketing"
  | "tele_sales"
  | "admin"
  | "super_admin";

export type TAdmin = {
  _id: string;
  full_name: string;
  email: string;
  phone: string;
  role: TAdminRole;
  profile_picture?: string;
  isActive: boolean;
  isDeleted: boolean;
  allowed_ip?: string[];
  last_login?: string;
  createdAt?: string;
  updatedAt?: string;
};

// Use this for short summary views (like a user card or dropdown)
export type TPopulatedAdmin = Pick<
  TAdmin,
  "_id" | "full_name" | "email" | "phone" | "role"
>;
