import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Global/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { submitSellerApplication } from "@/api/seller";
import SubmitButton from "@/components/Global/SubmitButton";
import ErrorCard from "@/components/Global/ErrorCard";

export type SellerApplicationData = {
  businessName: string;
  businessType: string;
  businessDescription: string;
  contactPhone: string;
  governmentId: string;
  pickupAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  returnAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  taxId: string;
  intendedCategories: string[];
};

type FormStateType = {
  enteredValues: SellerApplicationData;
  error: null | string;
};

function ApplySeller() {
  const navigate = useNavigate();

  const handleFormAction = async (
    prevState: FormStateType,
    formData: FormData
  ): Promise<FormStateType> => {
    const data: SellerApplicationData = {
      businessName: formData.get("businessName") as string,
      businessType: formData.get("businessType") as string,
      businessDescription: formData.get("businessDescription") as string,
      contactPhone: formData.get("contactPhone") as string,
      governmentId: formData.get("governmentId") as string,
      pickupAddress: {
        street: formData.get("pickupAddress.street") as string,
        city: formData.get("pickupAddress.city") as string,
        state: formData.get("pickupAddress.state") as string,
        country: formData.get("pickupAddress.country") as string,
        postalCode: formData.get("pickupAddress.postalCode") as string,
      },
      returnAddress: {
        street: formData.get("returnAddress.street") as string,
        city: formData.get("returnAddress.city") as string,
        state: formData.get("returnAddress.state") as string,
        country: formData.get("returnAddress.country") as string,
        postalCode: formData.get("returnAddress.postalCode") as string,
      },
      taxId: formData.get("taxId") as string,
      intendedCategories: (formData.get("intendedCategories") as string)
        .split(",")
        .map((s) => s.trim()),
    };

    if (!data.businessName) {
      return {
        ...prevState,
        enteredValues: data,
        error: "business name must be specified",
      };
    }

    if (!data.governmentId) {
      return {
        ...prevState,
        enteredValues: data,
        error: "please specify your govt id",
      };
    }

    if (!data.pickupAddress || !data.returnAddress) {
      return {
        ...prevState,
        enteredValues: data,
        error: "please specify the address of your shop",
      };
    }

    try {
      await submitSellerApplication(data);
      navigate("/");
      return {
        ...prevState,
        error: null,
      };
    } catch {
      return {
        ...prevState,
        enteredValues: data,
        error: "Failed to submit application. Please try again.",
      };
    }
  };

  const [formState, formAction] = useActionState<FormStateType, FormData>(
    handleFormAction,
    {
      error: null,
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
        intendedCategories: [],
      },
    }
  );

  return (
    <div className="w-full bg-amber-50 min-h-screen p-6">
      <Card className="w-[80%] m-auto">
        <ScrollArea className="h-[90vh]">
          <CardHeader>
            <div className="flex items-center justify-center">
              <Logo />
            </div>
            <CardTitle className="text-center">Become a Seller</CardTitle>
            <CardDescription className="text-center">
              Fill out the form below to apply
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form action={formAction} className="space-y-6">
              {/* Business Information */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Business Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      defaultValue={formState.enteredValues.businessName}
                      placeholder="Your Business Name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select
                      name="businessType"
                      defaultValue={formState.enteredValues.businessType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
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
                <div>
                  <Label htmlFor="businessDescription">
                    Business Description
                  </Label>
                  <Textarea
                    id="businessDescription"
                    name="businessDescription"
                    defaultValue={formState.enteredValues.businessDescription}
                    placeholder="Tell us about your business"
                  />
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      defaultValue={formState.enteredValues.contactPhone}
                      placeholder="Your Phone Number"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="governmentId">Government ID</Label>
                    <Input
                      id="governmentId"
                      name="governmentId"
                      defaultValue={formState.enteredValues.governmentId}
                      placeholder="Your Government ID Number"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Pickup Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="pickupAddress.street"
                      defaultValue={
                        formState.enteredValues.pickupAddress.street
                      }
                      placeholder="Street"
                    />
                    <Input
                      name="pickupAddress.city"
                      defaultValue={formState.enteredValues.pickupAddress.city}
                      placeholder="City"
                    />
                    <Input
                      name="pickupAddress.state"
                      defaultValue={formState.enteredValues.pickupAddress.state}
                      placeholder="State"
                    />
                    <Input
                      name="pickupAddress.country"
                      defaultValue={
                        formState.enteredValues.pickupAddress.country
                      }
                      placeholder="Country"
                    />
                    <Input
                      name="pickupAddress.postalCode"
                      defaultValue={
                        formState.enteredValues.pickupAddress.postalCode
                      }
                      placeholder="Postal Code"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Return Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="returnAddress.street"
                      defaultValue={
                        formState.enteredValues.returnAddress.street
                      }
                      placeholder="Street"
                    />
                    <Input
                      name="returnAddress.city"
                      defaultValue={formState.enteredValues.returnAddress.city}
                      placeholder="City"
                    />
                    <Input
                      name="returnAddress.state"
                      defaultValue={formState.enteredValues.returnAddress.state}
                      placeholder="State"
                    />
                    <Input
                      name="returnAddress.country"
                      defaultValue={
                        formState.enteredValues.returnAddress.country
                      }
                      placeholder="Country"
                    />
                    <Input
                      name="returnAddress.postalCode"
                      defaultValue={
                        formState.enteredValues.returnAddress.postalCode
                      }
                      placeholder="Postal Code"
                    />
                  </div>
                </div>
              </div>

              {/* Tax and Categories */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="taxId">Tax ID</Label>
                    <Input
                      id="taxId"
                      name="taxId"
                      defaultValue={formState.enteredValues.taxId}
                      placeholder="Your Tax ID (Optional)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="intendedCategories">
                      Intended Categories
                    </Label>
                    <Input
                      id="intendedCategories"
                      name="intendedCategories"
                      defaultValue={formState.enteredValues.intendedCategories.join(
                        ", "
                      )}
                      placeholder="e.g., electronics, clothing"
                    />
                  </div>
                </div>
              </div>

              {!!formState.error && <ErrorCard errorMsg={formState.error} />}

              <div className="flex justify-end">
                <SubmitButton>Submit Application</SubmitButton>
              </div>
            </form>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}

export default ApplySeller;
