import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "admin", timestamps: true } })
export class AdminClass {
  @prop({})
  name!: string;

  @prop({})
  public email!: string;

  @prop({})
  public phone!: string;

  @prop({})
  public password!: string;

  @prop({})
  public hash_password!: string;
}

export default getModelForClass(AdminClass);
