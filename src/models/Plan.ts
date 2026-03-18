import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "plans", timestamps: true } })
export class PlanClass {
  @prop({ required: true, trim: true })
  public title!: string;

  @prop()
  public description?: string;

  @prop({ required: true, min: 0 })
  public price!: number;
}

export default getModelForClass(PlanClass);
