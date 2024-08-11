import {
  Outlet,
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { Home } from "../components/Home";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
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
