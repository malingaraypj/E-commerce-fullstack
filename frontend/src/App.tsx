import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/Landing.page";
import NavBarWrapper from "./components/Nav/NavBarWrapper";
import ProductDetails from "./pages/productDetails";
import RegisterPage from "./pages/Register.page";
import LoginPage from "./pages/Login.page";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBarWrapper />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: "products/:id", element: <ProductDetails /> },
      ],
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
