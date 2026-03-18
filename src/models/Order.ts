import {
  getModelForClass,
  prop,
  modelOptions,
  index,
} from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { UserClass } from "./User";
import { CartClass } from "./Cart";
import { AddressClass } from "./Address";

export enum PaymentSource {
  CREDIT = "credit", // wallet
  SUBSCRIPTION = "subscription",
}

class Tax {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, min: 0 })
  public value!: number;
}

@index({ user: 1, createdAt: -1 }) // user orders latest first
@modelOptions({ schemaOptions: { collection: "orders", timestamps: true } })
export class OrderClass {
  @prop({ ref: () => UserClass, required: true })
  public user!: Ref<UserClass>;

  @prop({ ref: () => CartClass, required: true })
  public cart!: Ref<CartClass>;

  @prop({ ref: () => AddressClass, required: true })
  public address!: Ref<AddressClass>;

  @prop({ default: Date.now })
  public date!: Date;

  @prop({ default: 0, min: 0 })
  public shipping_cost!: number;

  @prop({ type: () => [Tax], _id: false, default: [] })
  public taxes!: Tax[];

  @prop({ required: true, min: 0 })
  public total_amount!: number;

  @prop({ enum: PaymentSource, required: true })
  public used_source!: string;
}

export default getModelForClass(OrderClass);
