import { t } from "elysia";

export const name = "cart";

export const CartSchema = t.Object({
  _id: t.String(),
  cart: t.Object({
    _id: t.String(),
    status: t.String(),
    total_amount: t.Number(),
    total_items: t.Number(),
  }),
  story: t.Any(),
  type: t.String(),
  total_price: t.Number(),
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
          data: CartSchema,
          meta: MetaPagination,
        },
        {
          description: `${name} list response`,
        },
      ),
    },
    detail: {
      operationId: `${name}List`,
    },
  },
  create: {
    body: t.Object({
      story: t.String(),
      type: t.String(),
      total_price: t.Number(),
    }),
    response: {
      200: t.Object(
        {
          status: t.Boolean(),
          message: t.String(),
          data: CartSchema,
        },
        { description: `${name} add response` },
      ),
    },
    detail: {
      operationId: `${name}Add`,
    },
  },
  delete: {
    query: t.Object({
      id: t.String(),
    }),
    response: {
      200: t.Object(
        {
          status: t.Boolean(),
          message: t.String(),
          data: CartSchema,
        },
        { description: `${name} delete response` },
      ),
    },
    detail: {
      operationId: `${name}Delete`,
    },
  },
  update: {
    query: t.Object({
      id: t.String(),
    }),
    body: t.Object({
      type: t.String(),
    }),
    response: {
      200: t.Object(
        {
          status: t.Boolean(),
          message: t.String(),
          data: CartSchema,
        },
        { description: `${name} update response` },
      ),
    },
    detail: {
      operationId: `${name}Update`,
    },
  },
};
