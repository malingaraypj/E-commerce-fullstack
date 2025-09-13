import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function NavBarWrapper() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default NavBarWrapper;
