/* eslint-disable react-hooks/rules-of-hooks */
import {
  Outlet,
  createRouter,
  createRoute,
  createRootRoute,
  useNavigate,
} from "@tanstack/react-router";
import { Home } from "../pages/Home";
import { useSession } from "../auth/SessionContext";
import { useEffect } from "react";
import { useResolveApi } from "../hooks/useResolveApi";
import User from "../model/User";
import { Authenticate } from "../auth/Authenticate";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import RecipeById from "../pages/recipes/RecipeById";
import RecipeEditor from "../pages/editor/RecipeEditor";

const rootRoute = createRootRoute({
  component: () => {
    const { setUserSession } = useSession();
    const { getApi } = useResolveApi();
    const navigate = useNavigate();
    useEffect(() => {
      const path = window.location.pathname;
      if (path.split("/").includes("auth")) return;
      getApi("auth/profile")
        .then((response) => {
          if (response?.success) {
            const currentUser = response.session as unknown as User;
            setUserSession(currentUser);
          } else {
            navigate({
              to: "/auth",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching user profile", error);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <Outlet />;
  },
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Home />,
});
const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: () => <Authenticate />,
});
const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/",
  component: () => <Login />,
  
});
const registerRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/register",
  component: () => <Register />,
});
const recipeRouteById = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$recipeId",
  component: () => <RecipeById/>,
});
const recipeEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/editor",
  component: () => <RecipeEditor/>,
});
const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute.addChildren([loginRoute, registerRoute]),
  recipeRouteById,
  recipeEditRoute
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
