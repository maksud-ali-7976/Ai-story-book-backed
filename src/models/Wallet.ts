import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { UserClass } from "./User";
@modelOptions({ schemaOptions: { collection: "wallter", timestamps: true } })
export class WalletClass {
  @prop({ ref: () => UserClass })
  public user!: Ref<UserClass>;

  @prop({ default: 0 })
  public amount!: number;
}

export default getModelForClass(WalletClass);
