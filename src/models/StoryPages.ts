import { getModelForClass, prop, modelOptions, index } from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { StoryClass } from "./Story";

@index({ story: 1, page_number: 1 }, { unique: true }) 
@modelOptions({schemaOptions: {collection: "story_page",timestamps: true}})
export class StoryPageClass {
  @prop({ ref: () => StoryClass, required: true })
  public story!: Ref<StoryClass>;

  @prop({ required: true, min: 1 })
  public page_number!: number;

  @prop({ required: true })
  public content!: string;

  @prop()
  public image_url?: string;
}

export default getModelForClass(StoryPageClass);
