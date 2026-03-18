import { createElysia } from "../../../utils/createElysia";
import { R } from "../../../utils/response-helpers";
import { customError } from "../../../utils/AppErr";
import schema, { name } from "./plan.schema";
import { isUserAuthenticated } from "src/guard/auth.guard";
import Plan from "src/models/Plan";

export default createElysia({ prefix: "/plans" }).guard(
  {
    detail: {
      tags: ["Plans"],
    },
    beforeHandle: isUserAuthenticated,
  },
  (app) =>
    app.get(
      "/",
      async ({ query }) => {
        const page = parseInt(query.page || "");
        const size = parseInt(query.size || "");

        const [list, total] = await Promise.all([
          await Plan.find({})
            .skip(page * size)
            .limit(size),

          await Plan.countDocuments(),
        ]);

        const pages = Math.ceil(total / size);
        return R(`${name} list`, list, true, {
          pages,
          total,
          page,
          size,
        });
      },
      schema.list,
    ),
);
