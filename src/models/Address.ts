import {
  getModelForClass,
  prop,
  modelOptions,
  index,
} from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { UserClass } from "./User";

export enum AddressType {
  BILLING = "billing",
  SHIPPING = "shipping",
}

// @index({ user: 1 }) // user ke addresses fast fetch
@modelOptions({schemaOptions: {collection: "addresse",timestamps: true}})
export class AddressClass {
  @prop({ ref: () => UserClass, required: true })
  public user!: Ref<UserClass>;

  @prop({ required: true, trim: true })
  public first_name!: string;

  @prop({ required: true, trim: true })
  public last_name!: string;

  @prop()
  public company_name?: string;

  @prop({ required: true, lowercase: true, trim: true })
  public email!: string;

  @prop({ required: true, trim: true })
  public phone!: string;

  @prop({ required: true })
  public country!: string;

  @prop({ required: true })
  public state!: string;

  @prop({ required: true })
  public city!: string;

  @prop({ required: true })
  public street_address!: string;

  @prop()
  public street_address_2?: string;

  @prop({ required: true })
  public pin!: string;

  @prop({ enum: AddressType, required: true })
  public type!: AddressType;
}

export default getModelForClass(AddressClass);
