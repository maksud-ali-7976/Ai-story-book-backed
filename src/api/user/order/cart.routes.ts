import { R } from "src/utils/response-helpers";
import { customError } from "src/utils/AppErr";
import { createElysia } from "src/utils/createElysia";
import schema, { name } from "./cart.schema";
import { isUserAuthenticated } from "src/guard/auth.guard";
import Cart from "src/models/Cart";
import CartItem from "src/models/CartItem";
import Story from "src/models/Story";

export default createElysia({ prefix: "/cart" }).guard(
  {
    detail: {
      tags: ["Cart"],
    },
    beforeHandle: isUserAuthenticated,
  },
  (app) =>
    app
      .get(
        "/",
        async (ctx) => {
          const page = parseInt(ctx.query.page || "0");
          const size = parseInt(ctx.query.size || "10");

          let userCart = await Cart.findOne({ user: ctx.user._id });

          if (!userCart) {
            userCart = await Cart.create({ user: ctx.user._id });
          }

          const [list, total] = await Promise.all([
            await CartItem.find({ cart: userCart._id })
              .skip(page * size)
              .limit(size)
              .populate("cart")
              .populate("story"),

            await CartItem.countDocuments({ cart: userCart._id }),
          ]);

          const pages = Math.ceil(total / size);

          return R(`${name} list response`, list, true, {
            pages,
            total,
            page,
            size,
          });
        },
        schema.list,
      )
      .post(
        "/",
        async (ctx) => {
          let cart = await Cart.findOne({ user: ctx.user._id });

          if (!cart) {
            cart = await Cart.create({ user: ctx.user._id });
          }

          const exitingItem = await CartItem.findOne({
            cart: cart._id,
            story: ctx.body.story,
            type: ctx.body.type,
          });

          if (exitingItem) return customError("Story Already Added in Cart");

          const story = await Story.findById(ctx.body.story);

          const entry = await CartItem.create({
            cart: cart._id,
            story: ctx.body.story,
            total_price: story?.price,
          });

          const CartItems = await CartItem.find({ cart: cart._id });

          let total_amount = CartItems.reduce(
            (sum, i) => sum + i.total_price,
            0,
          );

          cart.total_amount = total_amount;
          cart.total_items = CartItems.length;
          await cart.save();
          return R(`${name} created successfully`, entry);
        },
        schema.create,
      )
      .delete(
        "/",
        async (ctx) => {
          const cart = await Cart.findOne({ user: ctx.user._id });

          if (!cart) return customError("Cart not found");

          const entry = await CartItem.findOneAndDelete({ cart: cart._id });

          const cartItems = await CartItem.find({ cart: cart._id });

          const total_amount = cartItems.reduce(
            (sum, i) => sum + i.total_price,
            0,
          );

          cart.total_amount = total_amount;
          cart.total_items = cartItems.length;
          await cart.save();
          return R(`${name} removed successfully`, entry);
        },
        schema.delete,
      )
      .put(
        "/",
        async (ctx) => {
          const cartItem = await CartItem.findById(ctx.query.id);

          if (!cartItem) return customError("Story not founded in cart");

          cartItem.type = ctx.body.type;
          await cartItem.save();
          return R(`${name} updated `, cartItem);
        },
        schema.update,
      ),
);
