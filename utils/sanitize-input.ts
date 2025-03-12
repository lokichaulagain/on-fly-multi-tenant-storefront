import * as DOMPurifyModule from "dompurify";
import { escape } from "sqlstring";

// Handle different module formats
const DOMPurify = (DOMPurifyModule as any).default || DOMPurifyModule;

export function sanitizeInput<T extends Record<string, any>>(data: T): T {
  // Deep clone the input to avoid modifying the original
  const sanitizedData: any = Array.isArray(data) ? [] : {};
  
  try {
    // If DOMPurify isn't available, fall back to basic sanitization
    const hasDOMPurify = typeof DOMPurify === 'object' && typeof DOMPurify.sanitize === 'function';
    
    for (const key in data) {
      if (typeof data[key] === "string") {
        // SQL sanitization
        const sqlEscaped = escape(data[key] as string);
        // Remove the quotes that escape() adds around strings
        const cleanSqlString = sqlEscaped.substring(1, sqlEscaped.length - 1);
        
        // HTML sanitization (if DOMPurify is available)
        if (hasDOMPurify) {
          sanitizedData[key] = DOMPurify.sanitize(cleanSqlString);
        } else {
          // Basic fallback sanitization
          sanitizedData[key] = cleanSqlString
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        }
      } else if (typeof data[key] === 'object' && data[key] !== null) {
        // Recursively sanitize nested objects and arrays
        sanitizedData[key] = sanitizeInput(data[key]);
      } else {
        sanitizedData[key] = data[key];
      }
    }
  } catch (error) {
    console.error("Error in sanitizeInput:", error);
    // Fallback to returning the original data if sanitization fails
    return data;
  }
  
  return sanitizedData as T;
}