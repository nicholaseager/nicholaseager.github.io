/**
 * Converts a kebab-case string to Title Case
 * @param kebabStr - String in kebab-case format (e.g. "hello-world")
 * @returns Title Case string (e.g. "Hello World")
 */
export const kebabToTitleCase = (kebabStr: string): string => {
  return kebabStr
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
