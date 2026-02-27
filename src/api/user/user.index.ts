import { createElysia } from "../../utils/createElysia";

import authRoute from "./auth/auth.route";
export const userRoutes = createElysia({ prefix: "/user" });
userRoutes.use(authRoute);
