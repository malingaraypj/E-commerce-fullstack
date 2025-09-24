import { FaCartShopping } from "react-icons/fa6";
import SearchInput from "./SearchInput";
import IconButton from "../Global/IconButton";
import Logo from "../Global/Logo";
import UserLoginButton from "./userLoginButton";

function NavBar() {
  return (
    <nav className="w-full h-16 flex justify-between items-center px-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100 shadow-md sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Logo />
      </div>

      {/* Right: Search, User, Cart */}
      <div className="flex items-center gap-4">
        <SearchInput />

        <UserLoginButton />

        <IconButton
          Icon={FaCartShopping}
          className="relative bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105"
        >
          Cart
          {/* Example Badge (if you want to show cart items count) */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full shadow-sm">
            2
          </span>
        </IconButton>
      </div>
    </nav>
  );
}

export default NavBar;
