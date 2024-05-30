import { CommunityModel, UserModel } from '../models'
import HttpErrors from 'http-errors'

export class UserService {
  private readonly error = HttpErrors

  async findOne(id: string) {
    try {
      const user = await UserModel.findById(id)

      if (!user) {
        throw new this.error.NotFound('User not found')
      }

      return user
    } catch (error: any) {
      throw new this.error.InternalServerError(error)
    }
  }
  async joinsCommunity(userId: string, communityId: string) {
    const user = await this.findOne(userId)

    if (user) {
      if (user.community) {
        throw new this.error.NotFound('User is already part of a community')
      }

      const community = await CommunityModel.findById(communityId)

      if (!community) {
        throw new this.error.NotFound('Community not found')
      }

      user.community = community
      const savedUser = await user.save()
      await community.updateOne({
        totalExperiencePoints:
          community.totalExperiencePoints + savedUser.totalExperiencePoints,
        $push: { members: user },
      })

      return { ...user.toJSON() }
    }
  }

  async leavesCommunity(userId: string, communityId: string) {
    const user = await this.findOne(userId)

    if (user) {
      if (user.community?._id.toString() !== communityId) {
        throw new this.error.NotFound('User is not part of this community')
      }

      const community = await CommunityModel.findById(communityId)

      if (!community) {
        throw new this.error.NotFound('Community not found')
      }

      user.community = null

      const savedUser = await user.save()
      await community.updateOne({
        totalExperiencePoints:
          community.totalExperiencePoints - savedUser.totalExperiencePoints,
        $pull: { members: userId },
      })

      return { ...user.toJSON() }
    }
  }
}
