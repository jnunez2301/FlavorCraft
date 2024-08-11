/* eslint-disable react-hooks/rules-of-hooks */
import {
  Outlet,
  createRouter,
  createRoute,
  createRootRoute,
  useNavigate,
} from "@tanstack/react-router";
import { Home } from "../components/Home";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { useSession } from "../auth/SessionContext";
import { useEffect } from "react";
import { useResolveApi } from "../hooks/useResolveApi";
import User from "../model/User";

const rootRoute = createRootRoute({
  component: () => {
    const { userSession, setUserSession } = useSession();
    const { getApi } = useResolveApi();
    const navigate = useNavigate();
    useEffect(() => {
      const path = window.location.pathname;
      if(path === "/login" || path === "/register") return;
      getApi("auth/profile")
      .then(response => {
        if(response?.success) {
          const currentUser = response.session as unknown as User;
          setUserSession(currentUser);
        } else {
          navigate({
            to: "/login",
          });
        }
      })
      .catch(error => {
        console.error("Error fetching user profile", error);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userSession])
    return <Outlet />;
  },
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Home />,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
  component: () => <Login />,
});
const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "register",
  component: () => <Register />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
