import {
  getModelForClass,
  prop,
  modelOptions,
  index,
} from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { UserClass } from "./User";
import { StoryClass } from "./Story";

@index({ story: 1, user: 1 }, { unique: true }) 
@modelOptions({
  schemaOptions: { collection: "story_review", timestamps: true },
})
export class StoryReviewClass {
  @prop({ ref: () => StoryClass, required: true })
  public story!: Ref<StoryClass>;

  @prop({ ref: () => UserClass, required: true })
  public user!: Ref<UserClass>;

  @prop({ required: true, min: 1, max: 5 })
  public rating!: number;

  @prop()
  public review_text?: string;
}

export default getModelForClass(StoryReviewClass);
