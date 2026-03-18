import {
  getModelForClass,
  prop,
  modelOptions,
  index,
} from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { UserClass } from "./User";
import { PlanClass } from "./Plan";

export enum SubscriptionType {
  MONTHLY = "monthly",
  ANNUAL = "annual",
}

export enum SubscriptionStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  CANCELLED = "cancelled",
}

@index({ user: 1, status: 1 }) // active subscription fast fetch
@modelOptions({
  schemaOptions: { collection: "subscriptions", timestamps: true },
})
export class SubscriptionClass {
  @prop({ ref: () => UserClass, required: true })
  public user!: Ref<UserClass>;

  @prop({ ref: () => PlanClass, required: true })
  public plan!: Ref<PlanClass>;

  @prop({ enum: SubscriptionType, required: true })
  public subscription_type!: SubscriptionType;

  @prop({ required: true })
  public start_date!: Date;

  @prop({ required: true })
  public end_date!: Date;

  @prop({
    enum: SubscriptionStatus,
    default: SubscriptionStatus.ACTIVE,
  })
  public status!: SubscriptionStatus;
}

export default getModelForClass(SubscriptionClass);
