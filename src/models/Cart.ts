import {
  getModelForClass,
  prop,
  modelOptions,
  index,
} from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { UserClass } from "./User";

export enum CartStatus {
  ACTIVE = "active",
  CHECKED_OUT = "checked_out",
  ABANDONED = "abandoned",
}

@index({ user: 1, status: 1 }) // user ka active cart fast mile
@modelOptions({schemaOptions: {collection: "cart",timestamps: true}})
export class CartClass {
  @prop({ ref: () => UserClass, required: true })
  public user!: Ref<UserClass>;

  @prop({
    enum: CartStatus,
    default: CartStatus.ACTIVE,
  })
  public status!: CartStatus;

  @prop({ default: 0, min: 0 })
  public total_amount!: number;

  @prop({ default: 0, min: 0 })
  public total_items!: number;
}

export default getModelForClass(CartClass);
