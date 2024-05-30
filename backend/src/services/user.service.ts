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
      await user.save()
      await community.updateOne({ $push: { members: user } })

      return { ...user.toJSON() }
    }
  }

  async leavesCommunity(userId: string, communityId: string) {
    const user = await this.findOne(userId)

    if (user) {
      if (!user.community) {
        throw new this.error.NotFound('User is not part of this community')
      }

      const community = await CommunityModel.findById(communityId)

      if (!community) {
        throw new this.error.NotFound('Community not found')
      }

      user.community = null

      await user.save()
      await community.updateOne({ $pull: { members: { _id: userId } } })

      return { ...user.toJSON() }
    }
  }
}
