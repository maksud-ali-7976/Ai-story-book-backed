import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";

export enum LoginSource {
  EMAIL = "EMAIL",
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK",
  APPLE = "APPLE",
}

@modelOptions({ schemaOptions: { collection: "user", timestamps: true } })
export class UserClass {
  @prop({})
  public full_name!: string;

  @prop({})
  public username!: string;

  @prop({ unique: true })
  public email!: string;

  @prop({})
  public password!: string;

  @prop({ default: LoginSource.EMAIL })
  public login_type!: string;

  @prop({})
  public token?: string;
}

export default getModelForClass(UserClass);
