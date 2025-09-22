import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoPersonOutline } from "react-icons/io5";

import type { RootState } from "@/store/store";
import IconButton from "../Global/IconButton";
import UserAvatar from "../Global/UserAvatar";
import type { JSX } from "react";

function UserLoginButton(): JSX.Element {
  const navigate = useNavigate();

  const { isLogged, user: userData } = useSelector(
    (state: RootState) => state.user
  );

  // If the user is not logged in, show the sign-in button.
  if (!isLogged) {
    return (
      <IconButton
        className="bg-blue-400 m-4 cursor-pointer text-white"
        onClick={() => navigate("/register")}
        Icon={IoPersonOutline}
      >
        Sign In/Sign Up
      </IconButton>
    );
  }

  // Otherwise, display the logged-in user's information.
  return (
    <div className="flex hover:scale-105 cursor-pointer justify-center items-center text-ellipsis bg-blue-400 rounded-md shadow-md text-white px-3 py-2 w-[150px] break-inside-avoid">
      <UserAvatar size={30} />

      <p className="text-sm font-medium text-ellipsis line-clamp-1">
        {userData?.name}
      </p>
    </div>
  );
}

export default UserLoginButton;
