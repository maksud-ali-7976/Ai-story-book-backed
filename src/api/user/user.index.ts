import { createElysia } from "../../utils/createElysia";

import authRoute from "./auth/auth.route";
import cartRoutes from "./cart/cart.routes";
import planRoutes from "./plan/plan.routes";

export const userRoutes = createElysia({ prefix: "/user" });

userRoutes.use(authRoute);
userRoutes.use(cartRoutes);
userRoutes.use(planRoutes);
