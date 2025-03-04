import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <LoaderCircle
        size={16}
        className="animate-spin"
      />
    </div>
  );
}
