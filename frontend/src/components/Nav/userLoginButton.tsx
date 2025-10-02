import { useSelector } from "react-redux";
import UserAvatar from "../Global/UserAvatar";
import type { JSX } from "react";
import type { RootState } from "@/store/store";
import type { User } from "@/models/User";

function UserLoginButton(): JSX.Element {
  const user = useSelector((state: RootState) => state.user.user) as User;

  return (
    <div className="flex hover:scale-105 cursor-pointer justify-center items-center text-ellipsis bg-blue-400 rounded-md shadow-md text-white px-3 py-2 w-[150px] break-inside-avoid">
      <UserAvatar size={30} />

      <p className="text-sm font-medium text-ellipsis line-clamp-1">
        {user.name}
      </p>
    </div>
  );
}

export default UserLoginButton;
