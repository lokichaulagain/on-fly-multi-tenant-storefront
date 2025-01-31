"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff, Loader, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .min(8, {
      message: "Vendor email must be at least 8 character.",
    })
    .max(40, {
      message: "Vendor email must be less than 40 characters.",
    })
    .email(),

  password: z
    .string()
    .min(7, {
      message: "Password must be at least 7 character.",
    })
    .max(22, {
      message: "Password must be less than 22 characters.",
    }),
});

export default function Page() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  // Define a submit handler
  const [isLoging, setILoging] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

  console.log(isLoging);

  const handleCreateSuperAdmin = async () => {
  
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8">
          <Card className="mx-auto max-w-sm  shadow-sm">
            <CardHeader>
              <div className=" flex flex-col items-center gap-1 text-lg text-primary">
                <Package size={40} />
                <p className=" text-2xl font-medium">Ecomifye</p>
              </div>

              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Enter your credentials below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="youremail@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className=" relative">
                      {/* <FormLabel>Password</FormLabel> */}
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="/forgot-my-password"
                          className="ml-auto inline-block text-sm underline ">
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      {showPassword ? (
                        <EyeOff
                          onClick={() => setShowPassword(false)}
                          size={18}
                          className="absolute top-1/2 right-2 transform cursor-pointer text-primary-400 "
                        />
                      ) : (
                        <Eye
                          onClick={() => setShowPassword(true)}
                          size={18}
                          className="absolute top-1/2 right-2 transform cursor-pointer text-primary-400 "
                        />
                      )}

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  disabled={isLoging}
                  type="submit"
                  className="w-full flex items-center">
                  {isLoging && (
                    <Loader
                      size={16}
                      className="animate-spin mr-2"
                    />
                  )}
                  Login
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full">
                  Login with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="#"
                  className="underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
