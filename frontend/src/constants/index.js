export const navItems = [
  {
    name: "Product",
    path: "/products",
  },
  {
    name: "Explore",
    path: "/explore",
  },
];

const badgeColors = [
  "badge-primary",
  "badge-secondary",
  "badge-accent",
  "badge-info",
  "badge-success",
  "badge-warning",
  "badge-error",
  "badge-ghost",
];

export const getBadgeColor = (categoryName) => {
  if (!categoryName || typeof categoryName !== "string") {
    return "badge-outline"; // fallback color
  }
  let sum = 0;
  for (let i = 0; i < categoryName.length; i++) {
    sum += categoryName.charCodeAt(i);
  }
  const index = sum % badgeColors.length;
  return badgeColors[index];
};
