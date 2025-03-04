import { SignIn } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";

export default function SignInCard() {
  return (
    <div className=" min-h-screen py-8 w-full flex items-center justify-center  ">
      <SignIn
        fallback={
          <LoaderCircle
            size={16}
            className="animate-spin"
          />
        }
        routing="hash"
        appearance={{
          variables: {
            colorPrimary: "#2563eb",
            borderRadius: "0.2rem",
          },
        }}
      />
    </div>
  );
}
