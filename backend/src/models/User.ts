import { prop, Ref, post } from '@typegoose/typegoose'
import { Community } from './Community'

class ExperiencePoints {
  @prop({ type: Number })
  public points: number = 0

  @prop({ type: Date })
  public timestamp: Date = new Date()
}

@post<User>('save', (user) => {
  user.totalExperiencePoints =
    user.experiencePoints?.reduce((acc, exp) => acc + exp.points, 0) ?? 0
})
export class User {
  @prop({ required: true })
  public email?: string

  @prop({ required: true, select: false })
  public passwordHash?: string

  @prop()
  public profilePicture?: string

  @prop({ required: true, default: [] })
  public experiencePoints?: ExperiencePoints[]

  @prop({
    type: Number,
    default: 0,
  })
  public totalExperiencePoints: number = 0

  @prop({ ref: () => Community, default: null })
  public community: Ref<Community> | null = null
}
