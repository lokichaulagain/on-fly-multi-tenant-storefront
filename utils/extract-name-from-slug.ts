export function extractCategoryNameFromSlug(slug: string) {
  const parts = slug.split("-");

    // Remove the last part which contains random characters
    parts.pop();
    
    // Capitalize each word and join with spaces
    return parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
