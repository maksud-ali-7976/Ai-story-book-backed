import { t } from "elysia";
export const name = "Plan";

export const PlanSchema = t.Object({
  _id: t.String(),
  title: t.String(),
  description: t.String(),
  price: t.Number(),
});

export const MetaPagination = t.Object({
  pages: t.Number(),
  total: t.Number(),
  page: t.Number(),
  size: t.Number(),
});

export default {
  list: {
    query: t.Object({
      page: t.String(),
      size: t.String(),
    }),
    response: {
      200: t.Object(
        {
          status: t.Boolean(),
          message: t.String(),
          data: t.Array(PlanSchema),
          meta: MetaPagination,
        },
        {
          description: `${name} List Response`,
        },
      ),
    },
    detail: {
      operationId: `${name}List`,
    },
  },
};
