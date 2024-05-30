export type User = {
  _id: string
  name: string
  email: string
  profilePicture: string
  experiencePoints: { points: number; timestamp: Date }[]
  community: Community | null
}

export type Community = {
  _id: string
  name: string
  logo: string
  members: string[]
  totalExperiencePoints: number
}
