import express from "express";
import { AuthRoute } from "./auth.route";
import { UserRoute } from "./user.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    routes: AuthRoute,
  },
  {
    path: "/user",
    routes: UserRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
