import moment from "moment";

export const safeRender = (value: any, fallback: string = "N/A") => {
  // Checks for null/undefined and empty strings, but allows 0 and false
  return value !== undefined && value !== null && value !== ""
    ? value
    : fallback;
};

export const formatDate = (date: Date | string | undefined): string => {
  if (!date) return "N/A";
  const m = moment(date);
  return m.isValid() ? m.format("MMMM D, YYYY") : "N/A";
};
