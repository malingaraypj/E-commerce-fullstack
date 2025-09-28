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
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Logo from "@/components/Global/Logo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Define an address type for reuse
type Address = {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};

//  FormState to match the sellerSchema
type FormState = {
  enteredValues: {
    businessName: string;
    businessType: string;
    businessDescription: string;
    contactPhone: string;
    governmentId: string;
    pickupAddress: Address;
    returnAddress: Address;
    taxId: string;
    intendedCategories: string;
  };
  error: string;
  success: boolean;
};

const MotionCard = motion.create(Card);

function ApplySeller() {
  const navigation = useNavigate();
  const [useSameAddress, setUseSameAddress] = useState(true);

  const handleFormAction = async (
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    // --- 1. Basic Business Information ---
    const businessName = (formData.get("businessName") as string) ?? "";
    const businessType = (formData.get("businessType") as string) ?? "";
    const businessDescription =
      (formData.get("businessDescription") as string) ?? "";

    // --- 2. Personal Information ---
    const contactPhone = (formData.get("contactPhone") as string) ?? "";
    const governmentId = (formData.get("governmentId") as string) ?? "";

    // --- 3. Address Details ---
    const pickupAddress: Address = {
      street: (formData.get("pickupStreet") as string) ?? "",
      city: (formData.get("pickupCity") as string) ?? "",
      state: (formData.get("pickupState") as string) ?? "",
      country: (formData.get("pickupCountry") as string) ?? "",
      postalCode: (formData.get("pickupPostalCode") as string) ?? "",
    };

    const returnAddress: Address = useSameAddress
      ? pickupAddress
      : {
          street: (formData.get("returnStreet") as string) ?? "",
          city: (formData.get("returnCity") as string) ?? "",
          state: (formData.get("returnState") as string) ?? "",
          country: (formData.get("returnCountry") as string) ?? "",
          postalCode: (formData.get("returnPostalCode") as string) ?? "",
        };

    // --- 4. Other Information ---
    const taxId = (formData.get("taxId") as string) ?? "";
    const intendedCategories =
      (formData.get("intendedCategories") as string) ?? "";

    const enteredValues = {
      businessName,
      businessType,
      businessDescription,
      contactPhone,
      governmentId,
      pickupAddress,
      returnAddress,
      taxId,
      intendedCategories,
    };

    // --- Validation ---
    if (!businessName || !contactPhone || !governmentId) {
      return {
        ...prevState,
        error: "Business name, phone number, and Government ID are required.",
        success: false,
        enteredValues,
      };
    }

    // --- API Payload ---
    const apiPayload = {
      ...enteredValues,
      // Convert categories string to array for the API
      intendedCategories: intendedCategories
        .split(",")
        .map((cat) => cat.trim())
        .filter((cat) => cat.length > 0),
    };

    try {
      // Uncomment and use your actual API endpoint
      // await axios.post(
      //   `${import.meta.env.VITE_BACKEND_URL}/seller/apply`,
      //   apiPayload
      // );
      console.log("API Payload:", apiPayload);

      return {
        ...prevState,
        error: "",
        success: true,
        enteredValues,
      };
    } catch (error) {
      let errorMessage = "Application submission failed";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      return {
        ...prevState,
        error: errorMessage,
        success: false,
        enteredValues,
      };
    }
  };

  const [formState, formAction] = useActionState<FormState, FormData>(
    handleFormAction,
    {
      enteredValues: {
        businessName: "",
        businessType: "individual",
        businessDescription: "",
        contactPhone: "",
        governmentId: "",
        pickupAddress: {
          street: "",
          city: "",
          state: "",
          country: "",
          postalCode: "",
        },
        returnAddress: {
          street: "",
          city: "",
          state: "",
          country: "",
          postalCode: "",
        },
        taxId: "",
        intendedCategories: "",
      },
      error: "",
      success: false,
    }
  );

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200">
      <MotionCard
        className="w-full max-w-3xl rounded-2xl shadow-lg shadow-black/20 border border-gray-200 bg-white overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <CardHeader className="pb-4 text-center">
          <CardTitle className="flex justify-center">
            <Logo />
          </CardTitle>
          <p className="text-sm text-gray-500 mt-2">
            Apply to become a seller on our platform
          </p>
        </CardHeader>

        <CardContent>
          {formState.success ? (
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold text-green-600 mb-4">
                Application Submitted!
              </h3>
              <p className="text-gray-600 mb-6">
                Thank you for applying. We'll review your application and get
                back to you soon.
              </p>
              <Button
                onClick={() => navigation("/")}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                Return to Home
              </Button>
            </div>
          ) : (
            <form action={formAction} className="space-y-6">
              {/* --- Section: Basic Business Information --- */}
              <fieldset className="space-y-4 border-t pt-4">
                <legend className="text-lg font-semibold text-gray-800 -mt-8 px-2 bg-white">
                  Business Information
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Business Name */}
                  <div className="grid gap-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      defaultValue={formState.enteredValues.businessName}
                      name="businessName"
                      id="businessName"
                      placeholder="Your business name"
                    />
                  </div>
                  {/* Business Type */}
                  <div className="grid gap-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select
                      name="businessType"
                      defaultValue={formState.enteredValues.businessType}
                    >
                      <SelectTrigger id="businessType">
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="manufacturer">
                          Manufacturer
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {/* Business Description */}
                <div className="grid gap-2">
                  <Label htmlFor="businessDescription">
                    Business Description
                  </Label>
                  <Textarea
                    defaultValue={formState.enteredValues.businessDescription}
                    name="businessDescription"
                    id="businessDescription"
                    placeholder="Tell us about your business and products"
                  />
                </div>
              </fieldset>

              {/* --- Section: Personal Information --- */}
              <fieldset className="space-y-4 border-t pt-4">
                <legend className="text-lg font-semibold text-gray-800 -mt-8 px-2 bg-white">
                  Personal Information
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Contact Phone */}
                  <div className="grid gap-2">
                    <Label htmlFor="contactPhone">Contact Phone *</Label>
                    <Input
                      defaultValue={formState.enteredValues.contactPhone}
                      type="tel"
                      name="contactPhone"
                      id="contactPhone"
                      placeholder="Your contact number"
                    />
                  </div>
                  {/* Government ID */}
                  <div className="grid gap-2">
                    <Label htmlFor="governmentId">Government ID *</Label>
                    <Input
                      defaultValue={formState.enteredValues.governmentId}
                      type="text"
                      name="governmentId"
                      id="governmentId"
                      placeholder="e.g., Aadhaar, PAN, etc."
                    />
                  </div>
                </div>
              </fieldset>

              {/* --- Section: Address Details --- */}
              <fieldset className="space-y-4 border-t pt-4">
                <legend className="text-lg font-semibold text-gray-800 -mt-8 px-2 bg-white">
                  Address Details
                </legend>
                {/* Pickup Address */}
                <div className="space-y-2 p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-700">Pickup Address</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="pickupStreet"
                      placeholder="Street"
                      defaultValue={
                        formState.enteredValues.pickupAddress.street
                      }
                    />
                    <Input
                      name="pickupCity"
                      placeholder="City"
                      defaultValue={formState.enteredValues.pickupAddress.city}
                    />
                    <Input
                      name="pickupState"
                      placeholder="State"
                      defaultValue={formState.enteredValues.pickupAddress.state}
                    />
                    <Input
                      name="pickupCountry"
                      placeholder="Country"
                      defaultValue={
                        formState.enteredValues.pickupAddress.country
                      }
                    />
                    <Input
                      name="pickupPostalCode"
                      placeholder="Postal Code"
                      defaultValue={
                        formState.enteredValues.pickupAddress.postalCode
                      }
                    />
                  </div>
                </div>

                {/* Same Address Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="same-address"
                    checked={useSameAddress}
                    onCheckedChange={(checked) =>
                      setUseSameAddress(checked as boolean)
                    }
                  />
                  <Label htmlFor="same-address">
                    Return address is the same as pickup address
                  </Label>
                </div>

                {/* Return Address */}
                {!useSameAddress && (
                  <div className="space-y-2 p-4 border rounded-lg">
                    <h4 className="font-medium text-gray-700">
                      Return Address
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input name="returnStreet" placeholder="Street" />
                      <Input name="returnCity" placeholder="City" />
                      <Input name="returnState" placeholder="State" />
                      <Input name="returnCountry" placeholder="Country" />
                      <Input
                        name="returnPostalCode"
                        placeholder="Postal Code"
                      />
                    </div>
                  </div>
                )}
              </fieldset>

              {/* --- Section: Tax & Categories --- */}
              <fieldset className="space-y-4 border-t pt-4">
                <legend className="text-lg font-semibold text-gray-800 -mt-8 px-2 bg-white">
                  Other Information
                </legend>
                {/* Tax ID */}
                <div className="grid gap-2">
                  <Label htmlFor="taxId">
                    Tax ID / Business Registration Number
                  </Label>
                  <Input
                    defaultValue={formState.enteredValues.taxId}
                    name="taxId"
                    id="taxId"
                    placeholder="Your tax ID or business registration"
                  />
                </div>
                {/* Intended Categories */}
                <div className="grid gap-2">
                  <Label htmlFor="intendedCategories">
                    Intended Product Categories
                  </Label>
                  <Textarea
                    defaultValue={formState.enteredValues.intendedCategories}
                    name="intendedCategories"
                    id="intendedCategories"
                    placeholder="List categories separated by commas (e.g., Electronics, Clothing)"
                  />
                </div>
              </fieldset>

              {formState.error && (
                <p className="text-red-600 text-sm">{formState.error}</p>
              )}

              <CardFooter className="p-0 pt-4">
                <SubmitButton className="w-full">
                  Submit Application
                </SubmitButton>
              </CardFooter>
            </form>
          )}
        </CardContent>

        {!formState.success && (
          <CardFooter className="flex justify-center pt-0">
            <Button onClick={() => navigation("/")} variant="link">
              Cancel and return to home
            </Button>
          </CardFooter>
        )}
      </MotionCard>
    </div>
  );
}

export default ApplySeller;
