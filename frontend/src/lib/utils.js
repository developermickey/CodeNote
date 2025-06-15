export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short", // e.g., Jan
    day: "numeric", // e.g., 14
    year: "numeric", // e.g., 2025
  });
};