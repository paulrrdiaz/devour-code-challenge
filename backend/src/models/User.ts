import { prop, Ref, modelOptions } from '@typegoose/typegoose'
import { Community } from './Community'

@modelOptions({
  schemaOptions: {
    _id: true,
  },
})
export class User {
  @prop({ required: true })
  public email?: string

  @prop({ required: true, select: false })
  public passwordHash?: string

  @prop()
  public profilePicture?: string

  @prop({ required: true, select: false, default: [] })
  public experiencePoints?: { points: number; timestamp: Date }[]

  @prop({ ref: () => Community, default: null })
  public community: Ref<Community> | null = null
}
