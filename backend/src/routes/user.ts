import express from 'express'
import { UserModel } from '../models'
import { UserService } from '../services/user.service'

const userRouter = express.Router()
const userService = new UserService()

/**
 * @route GET /user/:id
 * @param {string} id - User ID
 * @returns {User} - User object with experiencePoints field
 */
userRouter.get('/:id', async (req, res) => {
  const user = await UserModel.findById(req.params.id).select(
    '+experiencePoints'
  )
  if (!user) {
    return res.status(404).send({ message: 'User not found' })
  }
  res.send(user)
})

/**
 * @route GET /user
 * @returns {Array} - Array of User objects
 * @note Adds the virtual field of totalExperience to the user.
 * @hint You might want to use a similar aggregate in your leaderboard code.
 */
userRouter.get('/', async (_, res) => {
  const users = await UserModel.aggregate([
    {
      $unwind: '$experiencePoints',
    },
    {
      $group: {
        _id: '$_id',
        email: { $first: '$email' },
        profilePicture: { $first: '$profilePicture' },
        totalExperience: { $sum: '$experiencePoints.points' },
      },
    },
  ])
  res.send(users)
})

/**
 * @route POST /user/:userId/join/:communityId
 * @param {string} userId - User ID
 * @param {string} communityId - Community ID
 * @description Joins a community
 */
userRouter.post('/:userId/join/:communityId', async (req, res, next) => {
  try {
    const { userId, communityId } = req.params
    const user = await userService.joinsCommunity(userId, communityId)
    res.send(user)
  } catch (error: any) {
    res.status(501).json(error)
  }
})

/**
 * @route DELETE /user/:userId/leave/:communityId
 * @param {string} userId - User ID
 * @param {string} communityId - Community ID
 * @description leaves a community
 */
userRouter.delete('/:userId/leave/:communityId', async (req, res) => {
  try {
    const { userId, communityId } = req.params
    const user = await userService.leavesCommunity(userId, communityId)
    res.send(user)
  } catch (error: any) {
    res.status(501).json(error)
  }
})

export { userRouter }
