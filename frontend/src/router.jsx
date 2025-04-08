import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import About from "./components/About";
import Friends from "./components/Friends";
import Chat from "./components/Chat";
import OAuthSuccess from "./pages/OAuthSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/oauth-success",
    element: <OAuthSuccess />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "friends",
        element: <Friends />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
    ],
  },
]);

export default router;
