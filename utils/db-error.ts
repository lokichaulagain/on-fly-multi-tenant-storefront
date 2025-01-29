import postgres from "postgres";

// Helper function to handle PostgreSQL errors
export function handleDbError(error: unknown): string {
    if (error instanceof postgres.PostgresError) {
      switch (error.code) {
        case "23505": {
          // Unique constraint violation
          // Extract the field name from the error details
          const detailMatch = /Key \((.*?)\)=\((.*?)\)/.exec(error.detail || "");
          const field = detailMatch?.[1] || "value";
          const value = detailMatch?.[2] || "";
          return `The ${field} '${value}' is already taken. Please choose a different one.`;
        }
        case "23503": // Foreign key violation
          return "A related record is missing. Please check your input.";
        case "23502": {
          // Not-null constraint violation
          const field = error.detail || "A required field";
          return `${field} is missing. Please fill it out.`;
        }
        case "22P02": // Invalid input format
          return "Invalid input provided. Please check your data.";
        default:
          return "An error occurred while processing your request. Please try again.";
      }
    }
    return "An unexpected error occurred. Please try again later.";
  }