import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>404 NOT FOUND</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function index() {
  return <RouterProvider router={router} />;
}

export default index;
