import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Home/Home";
import Login from "./Login/Login";

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
]);

function index() {
  return <RouterProvider router={router} />;
}

export default index;
