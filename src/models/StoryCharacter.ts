import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { UserClass } from "./User";
import { StoryClass } from "./Story";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

@modelOptions({
  schemaOptions: { collection: "story_character", timestamps: true },
})
export class StoryCharacterClass {
  @prop({ ref: () => UserClass, required: true })
  public user!: Ref<UserClass>;

  @prop({ ref: () => StoryClass, required: true })
  public story!: Ref<StoryClass>;

  @prop({ required: true })
  public first_name!: string;

  @prop()
  public last_name?: string;

  @prop()
  public eye_color?: string;

  @prop({ enum: Gender })
  public gender?: string;

  @prop({ min: 0 })
  public age?: number;

  @prop()
  public image_url?: string;

  @prop()
  public character_url?: string;
}

export default getModelForClass(StoryCharacterClass);
