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
import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// api functions
import { registerUser } from "@/api/auth";
import { motion } from "framer-motion";
import Logo from "@/components/Global/Logo";

type FormState = {
  enteredValues: {
    name: string;
    email: string;
    password: string;
    "confirm-password": string;
  };
  error: string;
};
const MotionCard = motion.create(Card);

function RegisterPage() {
  const navigation = useNavigate();

  const handleFormAction = async (
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const email = (formData.get("email") as string) ?? "";
    const password = (formData.get("password") as string) ?? "";
    const confirmPassword = (formData.get("confirm-password") as string) ?? "";
    const name = (formData.get("name") as string) ?? "";

    if (password !== confirmPassword) {
      return {
        ...prevState,
        error: "Passwords do not match",
        enteredValues: {
          name,
          email,
          password: "",
          "confirm-password": "",
        },
      };
    }

    try {
      await registerUser({ name, email, password });
      navigation("/login");
    } catch (error) {
      let errorMessage = "Registration failed";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message;
      }
      return {
        ...prevState,
        error: errorMessage,
        enteredValues: {
          name,
          email,
          password,
          "confirm-password": confirmPassword,
        },
      };
    }

    return {
      ...prevState,
      error: "",
      enteredValues: {
        name,
        email,
        password,
        "confirm-password": confirmPassword,
      },
    };
  };

  const [formState, formAction] = useActionState<FormState, FormData>(
    handleFormAction,
    {
      enteredValues: {
        name: "",
        email: "",
        password: "",
        "confirm-password": "",
      },
      error: "",
    }
  );

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200">
      <MotionCard
        animate={{ scale: 1, opacity: 1 }}
        initial={{ scale: 0.9, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 22,
        }}
        className="w-full max-w-md rounded-2xl shadow-lg shadow-black/20 border border-gray-200 bg-white"
      >
        <CardHeader className="pb-2 text-center">
          <CardTitle className="flex justify-center">
            <Logo />
          </CardTitle>
          <p className="text-sm text-gray-500 mt-2">
            Create an account to get started
          </p>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-5">
            {/* Name */}
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Name
              </Label>
              <Input
                defaultValue={formState.enteredValues.name}
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                className="border-gray-300 focus:ring-2 focus:ring-amber-400 rounded-lg"
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                defaultValue={formState.enteredValues.email}
                type="email"
                name="email"
                id="email"
                placeholder="example@gmail.com"
                className="border-gray-300 focus:ring-2 focus:ring-amber-400 rounded-lg"
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="border-gray-300 focus:ring-2 focus:ring-amber-400 rounded-lg"
              />
            </div>

            {/* Confirm Password */}
            <div className="grid gap-2">
              <Label
                htmlFor="confirm-password"
                className="text-gray-700 font-medium"
              >
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="••••••••"
                className="border-gray-300 focus:ring-2 focus:ring-amber-400 rounded-lg"
              />
            </div>

            {/* Error Message */}
            {formState.error && (
              <p className="text-red-600 text-sm">{formState.error}</p>
            )}

            {/* Submit Button */}
            <CardFooter className="p-0">
              <SubmitButton className="w-full rounded-lg bg-amber-500 hover:bg-amber-600 text-white shadow-md transition">
                Register
              </SubmitButton>
            </CardFooter>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            onClick={() => {
              navigation("/login");
            }}
            variant="link"
            className="text-gray-600 hover:text-amber-600 transition"
          >
            Already have an account? <span className="ml-1">Login</span>
          </Button>
        </CardFooter>
      </MotionCard>
    </div>
  );
}

export default RegisterPage;
