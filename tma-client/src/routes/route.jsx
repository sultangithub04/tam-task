import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Main from "../layout/Main";
import Register from "../pages/Register";
import AddTask from "../pages/AddTask";
import Edit from "../pages/Edit";
import PrivateRoute from "./PrivateRoute";

 const route = createBrowserRouter([
  {
    path: "/",
    element:<Main></Main> ,
    children: [
      {
        path: "/",
        element: <Login></Login>,

      },
      {
        path: "/login",
        element: <Login></Login>,

      },

      {
        path: "/register",
        element: <Register></Register>,

      },
      {
        path: "/task",
        element: <PrivateRoute><App></App></PrivateRoute>,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/add`)
      },
      {
        path: "/addtask",
        element: <PrivateRoute><AddTask></AddTask></PrivateRoute>,
      },
      {
        path: "/task/:id",
        element: <Edit/>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/task/${params.id}`)
      },
    ]
  },
]);

export default route;