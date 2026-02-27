import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "user", timestamps: true } })
export class UserClass {
  @prop({})
  public name!: string;

  @prop({ unique: true })
  public email!: string;

  @prop({ unique: true })
  public phone!: string;

  @prop({})
  public password!: string;
}

export default getModelForClass(UserClass);
