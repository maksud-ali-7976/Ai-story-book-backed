import {
  getModelForClass,
  prop,
  modelOptions,
  index,
} from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { CartClass } from "./Cart";
import { StoryClass } from "./Story";

export enum PurchaseType {
  HARD = "hard",
  SOFT = "soft",
}

@index({ cart: 1, story: 1, type: 1 }, { unique: true }) // duplicate item prevent
@modelOptions({ schemaOptions: { collection: "cart_items", timestamps: true } })
export class CartItemClass {
  @prop({ ref: () => CartClass, required: true })
  public cart!: Ref<CartClass>;

  @prop({ ref: () => StoryClass, required: true })
  public story!: Ref<StoryClass>;

  @prop({ enum: PurchaseType, required: true })
  public type!: string;

  @prop({ required: true, min: 0 })
  public total_price!: number;
}

export default getModelForClass(CartItemClass);
