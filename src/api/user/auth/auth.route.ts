import { createElysia } from "../../../utils/createElysia";
import { R } from "../../../utils/response-helpers";
import { customError } from "../../../utils/AppErr";
import { generateUserToken } from "../../../utils/common";
import User from "src/models/User";
import authSchema from "./auth.schema";
import { HashPassword, VerifyPassword } from "src/utils/auth";
import jwt from "src/utils/jwt";

export default createElysia({ prefix: "/auth" }).guard(
  {
    detail: {
      tags: ["AuthRoute"],
    },
  },
  (app) =>
    app
      .post(
        "/login",
        async ({ body }) => {
          console.log("jasiufw")
          const user = await User.findOne({
            email: body.email,
          });

          if (!user) {
            return customError("Invalid credentials.");
          }
          if (!VerifyPassword(body.password, user.password)) {
            return customError("Invalid Password");
          }

          let u: Record<string, any> = user.toObject();

          u.token = jwt.sign({ _id: u._id, email: u.email, phone: u.phone });

          return R("Logged in successfully.", u);
        },

        authSchema.login,
      )
      .post(
        "/me",
        async ({ user: loggedInUser }) => {
          const user = await User.findById(loggedInUser._id);

          if (!user) return customError("Invalid User");

          return R("user details", user);
        },
        authSchema.me,
      )
      .post(
        "/register",
        async ({ body }) => {
          const exitingUser = await User.findOne({
            email: body.email,
          });

          if (exitingUser) {
            return customError("User Already Exists");
          }

          const hashPass = await HashPassword(body.password);

          const user = await User.create({
            name: body.name,
            email: body.email,
            phone: body.phone,
            password: hashPass,
          });

          return R("user registration Successfully", user);
        },
        authSchema.signup,
      ),
);
