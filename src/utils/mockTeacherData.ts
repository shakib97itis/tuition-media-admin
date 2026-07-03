import type { TTeacher } from "../types/teacher.types";

export const mockTeacherData: TTeacher = {
  _id: "1",
  full_name: "Arif Rahman",
  email: "arif.rahman@example.com",
  phone: "01712345678",
  additional_phone: "01912345678",
  date_of_birth: "1994-08-15",
  gender: "male",
  religion: "Islam",
  blood_group: "A+",
  marital_status: "married",
  about_me:
    "Passionate mathematics and physics tutor with over 5 years of experience helping English medium and National curriculum students excel.",
  present_address: "House 45, Road 10, Dhanmondi, Dhaka",
  permanent_address: "Village: Puran Para, P.O: Ghoramara, Rajshahi",
  years_of_experience: 2,
  preferred_tutoring: {
    categories: ["School", "College"],
    courses: ["HSC", "O Levels"],
    subjects: ["Physics", "Higher Math"],
    tutoring_types: ["home-tutoring", "online-tutoring"],
    salary_range: { min: 8000, max: 20000 },
  },
  tutoring_availability: {
    days: ["saturday", "monday", "wednesday"],
  },
  preferred_teaching_locations: {
    country: "Bangladesh",
    city: "Dhaka",
    area: ["Dhanmondi", "Lalmatia", "Mohammadpur"],
  },
  education: {
    school: {
      name: "Dhanmondi Govt. Boys High School",
      group: "Science",
      curriculum: "National",
      board: "Dhaka",
      grade: "5.00",
      year_of_passing: 2010,
    },
    college: {
      name: "Dhaka College",
      group: "Science",
      curriculum: "National",
      board: "Dhaka",
      grade: "5.00",
      year_of_passing: 2012,
    },
    graduation: {
      name: "Bangladesh University of Engineering and Technology (BUET)",
      department: "Mechanical Engineering",
      type: "public",
      grade: "3.78",
      status: "graduation completed",
      year_of_passing: 2017,
    },
    post_graduation: {
      name: "University of Dhaka",
      department: "Applied Physics",
      type: "public",
      grade: "3.85",
      status: "graduation completed",
      year_of_passing: 2020,
    },
  },
  parents_info: {
    father_name: "Fazlur Rahman",
    father_phone: "01511223344",
    mother_name: "Rasheda Begum",
    mother_phone: "01811223344",
    other_contact_name: "Fazlur Rahman",
    other_contact_phone: "01511223344",
  },
  identification: {
    type: "nid",
    number: "1994269261199",
    front_image: "https://example.com/nid-front.jpg",
    back_image: "https://example.com/nid-back.jpg",
  },
  certifications: [
    {
      type: "IELTS Academic",
      certificate_url: "https://example.com/ielts.pdf",
    },
  ],

  profile_picture: "https://example.com/profile.jpg",
  role: "teacher",
  is_active: true,
  is_verified: true,
  is_deleted: false,
  serial_number: "1",
  profile_completion: {
    is_completed: false,
    percentage: 60,
  },

  created_at: "2023-01-01T00:00:00.000Z",
  updated_at: "2023-01-01T00:00:00.000Z",
};
