import { t } from "elysia";
import { isUserAuthenticated } from "../../../guard/auth.guard";

export const UserSchema = t.Object({
  _id: t.Optional(t.String()),
  name: t.Optional(t.String()),
  email: t.Optional(t.String()),
  password: t.Optional(t.String()),
  phone: t.Optional(t.String()),
  token: t.Optional(t.String()),
  createdAt: t.Optional(t.String()),
  updatedAt: t.Optional(t.String()),
});

export default {
  login: {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
    response: {
      200: t.Object(
        {
          status: t.Boolean(),
          message: t.String(),
          data: t.Optional(UserSchema),
        },
        {
          description: "User Login Response",
        },
      ),
      detail: {
        operationId: "userLogin",
      },
    },
  },
  signup: {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      phone: t.String(),
      password: t.String(),
    }),

    response: {
      200: t.Object(
        {
          status: t.Boolean(),
          message: t.String(),
          data: UserSchema,
        },
        {
          description: "User Signup Response",
        },
      ),
    },
    detail: {
      operationId: "userSingup",
    },
  },
  me: {
    beforeHandle: isUserAuthenticated as any,
    response: {
      200: t.Object(
        {
          status: t.Boolean(),
          message: t.String(),
          data: t.Optional(UserSchema),
        },
        {
          description: "User Me Response",
        },
      ),
      detail: {
        operationId: "userMe",
      },
    },
  },
};
