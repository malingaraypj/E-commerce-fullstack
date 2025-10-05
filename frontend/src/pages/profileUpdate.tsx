import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "@/store/actions/userActions";
import type { User } from "@/models/User";

const UserProfileUpdatePage = () => {
  const { user: userProfile } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const updatedData: Partial<User> = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: {
        street: formData.get("street") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        zip: formData.get("zip") as string,
      },
    };

    const result = await dispatch(updateUserProfile(updatedData));

    if (result.success === true) {
      navigate("/profile");
    } else {
      console.error("Failed to update profile:", result.message);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-4 sm:p-6 md:p-8">
      <Card className="max-w-4xl mx-auto shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="p-6">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Edit Profile
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4 mb-8">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-gray-200">
                  <AvatarImage
                    src={userProfile?.profilePicture}
                    alt={userProfile?.name}
                  />
                  <AvatarFallback>
                    {userProfile?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  type="button"
                  className="absolute bottom-0 right-0 rounded-full"
                >
                  <Camera className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" defaultValue={userProfile?.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  defaultValue={userProfile?.email}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  name="phone"
                  id="phone"
                  defaultValue={userProfile?.phone}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  name="street"
                  id="street"
                  defaultValue={userProfile?.address?.street}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  name="city"
                  id="city"
                  defaultValue={userProfile?.address?.city}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  name="state"
                  id="state"
                  defaultValue={userProfile?.address?.state}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  name="zip"
                  id="zip"
                  defaultValue={userProfile?.address?.zip}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4 p-6">
            <Button variant="outline" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UserProfileUpdatePage;
