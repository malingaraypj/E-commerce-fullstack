import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserLoginButton from "./userLoginButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { logout } from "@/store/reducers/userSlice";

function UserOptionDropDown() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-none">
        <UserLoginButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user?.role === "customer" && (
          <DropdownMenuItem onClick={() => navigate("apply-seller")}>
            Apply for seller
          </DropdownMenuItem>
        )}
        {user?.role === "admin" && (
          <DropdownMenuItem onClick={() => navigate("seller-applications")}>
            seller applications
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => navigate("profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        {user?.role === "seller" && (
          <DropdownMenuItem onClick={() => navigate("create-product")}>
            Add new Product
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => dispatch(logout())}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserOptionDropDown;
