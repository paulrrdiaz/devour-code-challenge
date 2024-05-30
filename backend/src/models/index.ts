import { getModelForClass } from '@typegoose/typegoose'
import { Community } from './Community'
import { User } from './User'

export const CommunityModel = getModelForClass(Community)
export const UserModel = getModelForClass(User)
