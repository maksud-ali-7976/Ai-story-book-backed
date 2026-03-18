import {
  getModelForClass,
  prop,
  modelOptions,
  index,
} from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { StoryClass } from "./Story";
import { UserClass } from "./User";

export enum SenderType {
  USER = "user",
  BOT = "bot",
}

@index({ story: 1, createdAt: 1 }) // conversation order
@modelOptions({
  schemaOptions: { collection: "story_conversation", timestamps: true },
})
export class StoryConversationClass {
  @prop({ ref: () => StoryClass, required: true })
  public story!: Ref<StoryClass>;

  @prop({ ref: () => UserClass }) // only if sender = user
  public user?: Ref<UserClass>;

  @prop({ enum: SenderType, required: true })
  public sender!: SenderType;

  @prop({ required: true })
  public content!: string;
}

export default getModelForClass(StoryConversationClass);
