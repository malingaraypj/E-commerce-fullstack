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

function UserOptionDropDown() {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-none">
        <UserLoginButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("apply-seller")}>
          Apply for seller
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("seller-applications")}>
          seller applications
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("create-product")}>
          Add new Product
        </DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserOptionDropDown;
