import DOMPurify from "dompurify"; // For sanitizing HTML inputs
import { escape } from "sqlstring"; // For sanitizing SQL inputs

export function sanitizeInput<T>(data: T): T {
  const sanitizedData: any = {};
  for (const key in data) {
    if (typeof data[key] === "string") {
      sanitizedData[key] = DOMPurify.sanitize(escape(data[key])); // Sanitize HTML and SQL inputs
    } else {
      sanitizedData[key] = data[key];
    }
  }
  return sanitizedData as T;
}
