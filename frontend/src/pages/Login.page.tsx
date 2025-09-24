import SubmitButton from "@/components/Global/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import Logo from "@/components/Global/Logo";

const MotionCard = motion.create(Card);

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
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200">
      <MotionCard
        className="w-full max-w-md rounded-2xl shadow-lg shadow-black/20 border border-gray-200 bg-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <CardHeader className="pb-2 text-center">
          <CardTitle className="flex justify-center">
            <Logo />
          </CardTitle>
          <p className="text-sm text-gray-500 mt-2">
            Welcome back! Please log in to continue
          </p>
        </CardHeader>

        <CardContent>
          <form action={formAction} className="space-y-5">
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={formState.enteredValues.email}
                placeholder="m@example.com"
                required
                className="border-gray-300 focus:ring-2 focus:ring-amber-400 rounded-lg"
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <a
                  href="#"
                  className="text-sm text-amber-600 hover:underline underline-offset-4"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                defaultValue={formState.enteredValues.password}
                required
                className="border-gray-300 focus:ring-2 focus:ring-amber-400 rounded-lg"
              />
            </div>

            {/* Error Message */}
            {formState.error && (
              <p className="text-red-600 text-sm">{formState.error}</p>
            )}

            {/* Submit */}
            <SubmitButton className="w-full rounded-lg bg-amber-500 hover:bg-amber-600 text-white shadow-md transition">
              Login
            </SubmitButton>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            onClick={() => navigation("/register")}
            variant="link"
            className="text-gray-600 hover:text-amber-600 transition"
          >
            Don’t have an account? <span className="ml-1">Register</span>
          </Button>
        </CardFooter>
      </MotionCard>
    </div>
  );
}
