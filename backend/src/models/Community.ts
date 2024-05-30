import { prop, getModelForClass, Ref, post } from '@typegoose/typegoose'
import { User } from './User'

export class Community {
  @prop({ required: true })
  public name?: string

  @prop()
  public logo?: string

  @prop({ ref: () => User, default: [] })
  public members: Ref<User>[] = []

  @prop({
    type: Number,
    default: 0,
  })
  public totalExperiencePoints: number = 0
}
