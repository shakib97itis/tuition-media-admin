import locationDataRaw from "../constants/bangladesh_tuition_locations.json";
import educationDataRaw from "../constants/tutoring_category_courses_subjects.json";

// --- Interfaces ---
export interface SelectOption {
  label: string;
  value: string;
}

export interface CityData {
  name: string;
  areas: string[];
}

export interface CountryLocationData {
  country: string;
  cities: CityData[];
}

export interface SubjectData {
  subject_name: string;
}

export interface CourseData {
  course_name: string;
  subjects: SubjectData[];
}

export interface EducationCategoryData {
  name: string;
  courses: CourseData[];
}

export interface EducationJsonStructure {
  data: EducationCategoryData[];
}

// Type assertions for imported JSON modules
const locationData = locationDataRaw as CountryLocationData[];
const educationCategoryData = (educationDataRaw as EducationJsonStructure).data;

// --- UTILITIES ---

/** Normalizes single strings or arrays into a clean string array */
const ensureArray = (input?: string | string[] | null): string[] => {
  if (!input) return [];
  return Array.isArray(input) ? input : [input];
};

/**
 * Standardizes array inputs into consistent label/value objects.
 * Deduplicates based on the lowercase value to prevent key collisions.
 */
const toUniqueOptions = (
  values: (string | undefined | null)[],
): SelectOption[] => {
  const map = new Map<string, SelectOption>();

  values.forEach((val) => {
    if (typeof val === "string" && val.trim() !== "") {
      const label = val.trim();
      const value = label.toLowerCase();

      if (!map.has(value)) {
        map.set(value, { label, value });
      }
    }
  });

  return Array.from(map.values());
};

/** Validates whether user-selected values exist within available options (case-insensitive). */
export const areValidOptionValues = (
  values: string[] | undefined,
  options: SelectOption[],
): boolean => {
  if (!values?.length) return true;
  const validSet = new Set(options.map((opt) => opt.value));
  return values.every((val) => validSet.has(val.toLowerCase()));
};

// --- LOCATION HELPERS ---

export const COUNTRY_OPTIONS: SelectOption[] = toUniqueOptions(
  locationData.map((loc) => loc.country),
);

const getCitiesByCountry = (countryName?: string): CityData[] => {
  const filteredCountries = countryName
    ? locationData.filter(
        (loc) => loc.country.toLowerCase() === countryName.toLowerCase(),
      )
    : locationData;
  return filteredCountries.flatMap((loc) => loc.cities);
};

export const getCityOptions = (countryName?: string): SelectOption[] =>
  toUniqueOptions(getCitiesByCountry(countryName).map((city) => city.name));

export const getAreaOptions = (
  cityName?: string,
  countryName?: string,
): SelectOption[] => {
  if (!cityName) return [];
  const matchedAreas = getCitiesByCountry(countryName).flatMap((city) =>
    city.name.toLowerCase() === cityName.toLowerCase() ? city.areas : [],
  );
  return toUniqueOptions(matchedAreas);
};

// --- EDUCATION HELPERS ---

export const CATEGORY_OPTIONS: SelectOption[] = toUniqueOptions(
  educationCategoryData.map((cat) => cat.name),
);

/** Helper to filter master categories down to selected items */
const getFilteredCategories = (
  categoryNames?: string | string[],
): EducationCategoryData[] => {
  const names = ensureArray(categoryNames);
  if (!names.length) return [];

  const categorySet = new Set(names.map((name) => name.toLowerCase()));
  return educationCategoryData.filter((cat) =>
    categorySet.has(cat.name.toLowerCase()),
  );
};

export const getCourseOptions = (
  selectedCategories?: string | string[],
): SelectOption[] => {
  const categories = getFilteredCategories(selectedCategories);
  const courses = categories.flatMap((cat) =>
    cat.courses.map((course) => course.course_name),
  );
  return toUniqueOptions(courses);
};

export const getSubjectOptions = (
  selectedCategories?: string | string[],
  selectedCourses?: string | string[],
): SelectOption[] => {
  const coursesArr = ensureArray(selectedCourses);
  if (!coursesArr.length) return [];

  const courseSet = new Set(coursesArr.map((c) => c.toLowerCase()));
  const categories = getFilteredCategories(selectedCategories);

  const subjects = categories.flatMap((cat) =>
    cat.courses.flatMap((course) =>
      courseSet.has(course.course_name.toLowerCase())
        ? course.subjects.map((sub) => sub.subject_name)
        : [],
    ),
  );
  return toUniqueOptions(subjects);
};

// --- STATIC FORM OPTIONS ---

export const GENDER_OPTIONS: SelectOption[] = toUniqueOptions([
  "Male",
  "Female",
  "Other",
]);

export const RELIGION_OPTIONS: SelectOption[] = toUniqueOptions([
  "Islam",
  "Christianity",
  "Hinduism",
  "Buddhism",
  "Judaism",
  "Other",
]);

export const BLOOD_GROUP_OPTIONS: SelectOption[] = toUniqueOptions([
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
]);

export const MARITAL_STATUS_OPTIONS: SelectOption[] = toUniqueOptions([
  "Single",
  "Married",
  "Divorced",
]);

export const JOB_STATUS_OPTIONS: SelectOption[] = toUniqueOptions([
  "Draft",
  "Open",
  "Assigned",
  "Demo",
  "Follow-up",
  "Confirmed",
  "Cancelled",
]);

export const TUTORING_TYPE_OPTIONS: SelectOption[] = toUniqueOptions([
  "Home",
  "Online",
  "Batch",
]);

export const TUTOR_QUALIFICATION_OPTIONS: SelectOption[] = toUniqueOptions([
  "Public University",
  "Professor",
  "Any",
]);
