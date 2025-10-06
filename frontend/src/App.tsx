import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/Landing.page";
import NavBarWrapper from "./components/Nav/NavBarWrapper";
import ProductDetails from "./pages/productDetails";
import RegisterPage from "./pages/Register.page";
import LoginPage from "./pages/Login.page";
import ApplySeller from "./pages/ApplySeller.page";
import ProtectedRoute from "./components/ProtectedRoute";
import SellerApplicationsPage from "./pages/adminDashBoard";
import Profile from "./pages/profile";
import UserProfileUpdatePage from "./pages/profileUpdate";
import CreateProductPage from "./pages/CreateProduct.page";
import { NotificationProvider } from "./context/providers/NotificationProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      // Wrap the main layout with ProtectedRoute
      element: (
        <ProtectedRoute>
          <NavBarWrapper />
        </ProtectedRoute>
      ),
      // All children of this route are now protected
      children: [
        { index: true, element: <LandingPage /> },
        { path: "products/:id", element: <ProductDetails /> },
        { path: "apply-seller", element: <ApplySeller /> },
        { path: "seller-applications", element: <SellerApplicationsPage /> },
        { path: "profile", element: <Profile /> },
        { path: "profile/edit", element: <UserProfileUpdatePage /> },
        { path: "create-product", element: <CreateProductPage /> },
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

  return (
    <NotificationProvider>
      <RouterProvider router={router} />
    </NotificationProvider>
  );
}

export default App;
