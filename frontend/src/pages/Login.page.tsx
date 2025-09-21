import SubmitButton from "@/components/Global/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useActionState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/actions/userActions";
import type { AppDispatch } from "@/store/store";
import { motion } from "framer-motion";

// Wrap the Card component with motion()
const MotionCard = motion(Card);

type FormState = {
  enteredValues: {
    email: string;
    password: string;
  };
  error: string;
};

type LoginResult = {
  success: boolean;
  message?: string;
};

export default function LoginPage() {
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleFormAction = async (
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    console.log("inside formaction");

    const email = (formData.get("email") as string) ?? "";
    const password = (formData.get("password") as string) ?? "";

    if (!email || !password) {
      return {
        ...prevState,
        error: "Email and password are required.",
      };
    }

    const result: LoginResult = await dispatch(loginUser(email, password));

    if (result?.success) {
      navigation("/");
      return {
        enteredValues: { email: "", password: "" },
        error: "",
      };
    } else {
      return {
        enteredValues: {
          email,
          password: "",
        },
        error: result?.message || "Login failed.",
      };
    }
  };

  const [formState, formAction] = useActionState<FormState, FormData>(
    handleFormAction,
    {
      error: "",
      enteredValues: {
        email: "",
        password: "",
      },
    }
  );

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-amber-50">
      <MotionCard
        className="w-full hover:scale-105 shadow-black/40 shadow-sm max-w-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={formState.enteredValues.email}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  defaultValue={formState.enteredValues.password}
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </div>
            </div>
            <div className="flex-col mt-5 w-full gap-2">
              <SubmitButton>Login</SubmitButton>
              {formState.error && (
                <p className="text-red-500">{formState.error}</p>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="w-full">
          <Button
            onClick={() => navigation("/register")}
            variant="link"
            className="cursor-pointer hover:text-blue-600"
          >
            Don't have an account? Register here
          </Button>
        </CardFooter>
      </MotionCard>
    </div>
  );
}
