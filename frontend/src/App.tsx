import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/Landing.page";
import NavBarWrapper from "./components/Nav/NavBarWrapper";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBarWrapper />,
      children: [{ index: true, element: <LandingPage /> }],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
