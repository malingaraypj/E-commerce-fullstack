import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/reducers/userSlice";

const UserProfilePage = () => {
  const { user: userProfile } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-4 sm:p-6 md:p-8">
      <Card className="max-w-4xl mx-auto shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24 border-4 border-white">
              <AvatarImage
                src={userProfile?.profilePicture}
                alt={userProfile?.name}
              />
              <AvatarFallback>
                {userProfile?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl font-bold">
                {userProfile?.name}
              </CardTitle>
              <p className="text-blue-200">{userProfile?.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Personal Information
            </h2>
            <Button
              onClick={() => navigate("edit")}
              variant="outline"
              size="sm"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <User className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-semibold">{userProfile?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-semibold">{userProfile?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                {userProfile?.phone ? (
                  <p className="font-semibold">{userProfile?.phone}</p>
                ) : (
                  <p>please provide phone number</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Shipping Address</p>
                {userProfile?.address && (
                  <p className="font-semibold">
                    {`${userProfile?.address?.street}, ${userProfile?.address?.city}, ${userProfile?.address?.state} ${userProfile?.address?.zip}`}
                  </p>
                )}
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Account Actions
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary">Change Password</Button>
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfilePage;
