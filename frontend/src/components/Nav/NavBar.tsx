import { FaCartShopping } from "react-icons/fa6";
import SearchInput from "./SearchInput";
import IconButton from "../Global/IconButton";
import Logo from "../Global/Logo";
import UserLoginButton from "./userLoginButton";

function NavBar() {
  return (
    <div className="w-full h-16 flex justify-between items-center border-b border-gray-200 bg-blue-50 shadow-sm">
      <Logo />
      <div className="flex items-center gap-5">
        <SearchInput />
        <UserLoginButton />
        <IconButton
          Icon={FaCartShopping}
          className="bg-blue-400 m-4 cursor-pointer text-white"
        >
          Cart
        </IconButton>
      </div>
    </div>
  );
}

export default NavBar;
