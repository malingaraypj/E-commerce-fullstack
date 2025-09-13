import { AlignStartVertical } from "lucide-react";
import { FaCartShopping } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import SearchInput from "./SearchInput";
import IconButton from "../Global/IconButton";

function NavBar() {
  return (
    <div className="w-full h-16 flex justify-between items-center border-b border-gray-200 bg-blue-50 shadow-sm">
      <div className="flex items-center ">
        <div className="bg-sky-200 w-12 h-12 flex justify-center items-center rounded-lg m-4">
          <AlignStartVertical color="blue" />
        </div>
        <div className="text-2xl font-bold text-blue-400">E-Commerce</div>
      </div>
      <div className="flex items-center gap-5">
        <SearchInput />
        <IconButton Icon={IoPersonOutline}>Sign In/Sign Up</IconButton>
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
