import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { UserClass } from "./User";

export enum StoryType {
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum StoryStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

@modelOptions({ schemaOptions: { collection: "storie", timestamps: true } })
export class StoryClass {
  @prop({ required: true })
  public title!: string;

  @prop()
  public description?: string;

  @prop({ ref: () => StoryClass })
  public story?: Ref<StoryClass>;

  @prop({ required: true })
  public prompt!: string;

  @prop({ ref: () => UserClass, required: true })
  public user!: Ref<UserClass>;

  @prop({ enum: StoryType, default: StoryType.PRIVATE })
  public type!: string;

  @prop({ enum: StoryStatus, default: StoryStatus.DRAFT })
  public status!: string;

  @prop()
  public thumbnail?: string;

  @prop({ default: 0, min: 0 })
  public price!: number;

  @prop()
  public genre?: string;

  @prop({ type: () => [String], default: [] })
  public keywords!: string[];

  @prop()
  public tone?: string;

  @prop({ default: "en" })
  public language!: string;

  @prop({ default: 0, min: 0 })
  public total_pages!: number;
}

export default getModelForClass(StoryClass);
