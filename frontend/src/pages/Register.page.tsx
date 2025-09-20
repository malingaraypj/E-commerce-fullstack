import SubmitButton from "@/components/Global/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useActionState } from "react";
import { useNavigate } from "react-router-dom";

type FormState = {
  enteredValues: {
    email: string;
    password: string;
    "confirm-password": string;
  };
  error: string;
};

function RegisterPage() {
  const navigation = useNavigate();

  const handleFormAction = async (
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    console.log("inside");

    const email = (formData.get("email") as string) ?? "";
    const password = (formData.get("password") as string) ?? "";
    const confirmPassword = (formData.get("confirm-password") as string) ?? "";

    // Basic validation
    if (password !== confirmPassword) {
      return {
        ...prevState,
        error: "Passwords do not match",
        enteredValues: { email, password, "confirm-password": confirmPassword },
      };
    }

    return {
      ...prevState,
      error: "",
      enteredValues: { email, password, "confirm-password": confirmPassword },
    };
  };

  const [formState, formAction] = useActionState<FormState, FormData>(
    handleFormAction,
    {
      enteredValues: {
        email: "",
        password: "",
        "confirm-password": "",
      },
      error: "",
    }
  );

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-amber-50">
      <Card className="w-full max-w-sm shadow-black shadow-sm hover:scale-105">
        <CardHeader>
          <CardTitle>Register to your Account</CardTitle>
          <CardDescription>Register with basic details</CardDescription>
          <CardAction>
            <Button
              onClick={() => {
                navigation("/login");
              }}
              variant="link"
              className="cursor-pointer"
            >
              Login
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex justify-start flex-col my-3">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  defaultValue={formState.enteredValues.email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@gmail.com"
                  className="border border-black"
                />
              </div>
            </div>

            <Separator />

            <div className="flex justify-start flex-col">
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="border border-black"
                />
              </div>
            </div>

            <Separator />

            <div className="flex justify-start flex-col mt-3">
              <div className="grid gap-3">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  className="border border-black"
                />
              </div>
            </div>

            {formState.error && (
              <p className="text-red-600 text-sm mt-2">{formState.error}</p>
            )}

            <CardFooter className="mt-4 p-0">
              <SubmitButton>Register</SubmitButton>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterPage;
