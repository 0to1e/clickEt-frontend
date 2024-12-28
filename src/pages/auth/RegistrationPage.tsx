import * as React from "react";

import { Card, CardContent, CardHeader } from "@/components/shadcn/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { toast } from "sonner";

import { Eye, EyeOff } from "lucide-react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/shadcn/label";
import { Link } from "react-router-dom";

const FormSchema = z.object({
  fullname: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." })
    .max(50, { message: "Full name must be at most 50 characters." }),

  username: z
    .string()
    .min(1, { message: "Username must be at least 1 character." })
    .max(10, { message: "Username must be at most 10 characters." })
    .refine((val) => !val.includes("@"), {
      message: "Username cannot contain '@'.",
    }),

  email: z
    .string()
    .email({ message: "Invalid email format." })
    .min(2, { message: "Email must be at least 2 characters." }),

  phone: z.string().regex(/^(98|97)\d{8}$/, {
    message: "Phone number must be a valid Nepali mobile number.",
  }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      {
        message:
          "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
      }
    ),
});

const RegistrationPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      phone: "",
      password: "",
    },
    mode: "onSubmit",
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("Event has been created", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-background dark:bg-dark_bg text-foreground">
      <Card className="w-[60vw] flex justify-center items-stretch rounded-md">
        <CardContent className="flex flex-col gap-3 basis-[60%] justify-center items-center p-6">
          <CardHeader className="flex justify-between items-center p-4">
            <h2 className="text-2xl font-semibold">Register</h2>
          </CardHeader>
          <CardContent className="w-full flex flex-col gap-3 ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 flex flex-col justify-center"
              >
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="E-mail address"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Phone number"
                          type="number"
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
                    <FormItem>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mx-auto flex flex-col gap-6">
                  <Button type="submit" className="px-10">
                    Register
                  </Button>

                  <Label htmlFor="navigateLogin">
                    Already have an account?{" "}
                    <Link to={"/login"}>
                      <span className="underline">Login</span>
                    </Link>
                  </Label>
                </div>
              </form>
            </Form>
          </CardContent>
        </CardContent>
        <div className="flex basis-[40%] isolate rounded-r-md">
          <div
            className="z-0 w-full rounded-r-md"
            style={{
              backgroundImage: "url(/src/assets/auth/login.png)",
              objectFit: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default RegistrationPage;
