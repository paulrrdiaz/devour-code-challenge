import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button, Flex, FormLabel, Select } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

import http from '../../lib/http'
import { Community, User } from '../../lib/interfaces'

interface MutationData {
  userId: string
  communityId: string
}

type UserCommunityRelationshipManagerProps = {
  users?: User[]
  communities?: Community[]
  isLoading: boolean
}

const UserCommunityRelationshipManager = (
  props: UserCommunityRelationshipManagerProps,
) => {
  const { users, communities, isLoading } = props
  const queryClient = useQueryClient()
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(
    null,
  )

  const joinMutation = useMutation({
    mutationFn: (data: MutationData) =>
      http.post(
        `http://localhost:8080/user/${data.userId}/join/${data.communityId}`,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communities'] })
      toast.success('Successfully joined the community')
    },
    onError: (error: Error | AxiosError) => {
      let message = error.message
      if (axios.isAxiosError(error)) {
        message = error.response?.data.message
      }
      toast.error(`Error: ${message}`)
    },
  })
  const leaveMutation = useMutation({
    mutationFn: (data: MutationData) =>
      http.delete(
        `http://localhost:8080/user/${data.userId}/leave/${data.communityId}`,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communities'] })
      toast.success('Successfully left the community')
    },
    onError: (error: Error | AxiosError) => {
      let message = error.message
      if (axios.isAxiosError(error)) {
        message = error.response?.data.message
      }
      toast.error(`Error: ${message}`)
    },
  })

  const handleJoinClick = () => {
    if (selectedUser && selectedCommunity) {
      joinMutation.mutate({
        userId: selectedUser,
        communityId: selectedCommunity,
      })
    }
  }

  const handleLeaveClick = () => {
    if (selectedUser && selectedCommunity) {
      leaveMutation.mutate({
        userId: selectedUser,
        communityId: selectedCommunity,
      })
    }
  }

  if (isLoading) return 'Loading...'

  return (
    <Flex flexDirection="column" gap={4} alignItems="center">
      <Flex alignItems="center">
        <FormLabel htmlFor="select-user" mb={0}>
          User:
        </FormLabel>
        <Select
          id="select-user"
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select User</option>
          {users?.map((user: User) => (
            <option key={user._id} value={user._id}>
              {user.email}
            </option>
          ))}
        </Select>
      </Flex>

      <Flex alignItems="center">
        <FormLabel htmlFor="select-community" mb={0}>
          Community:
        </FormLabel>
        <Select
          id="select-community"
          onChange={(e) => setSelectedCommunity(e.target.value)}
        >
          <option value="">Select Community</option>
          {communities?.map((community: Community) => (
            <option key={community._id} value={community._id}>
              {community.name}
            </option>
          ))}
        </Select>
      </Flex>

      <Flex gap={4}>
        <Button
          colorScheme="green"
          onClick={handleJoinClick}
          isDisabled={!selectedUser || !selectedCommunity}
        >
          Join
        </Button>

        <Button
          colorScheme="red"
          onClick={handleLeaveClick}
          isDisabled={!selectedUser || !selectedCommunity}
        >
          Leave
        </Button>
      </Flex>
    </Flex>
  )
}

export default UserCommunityRelationshipManager
