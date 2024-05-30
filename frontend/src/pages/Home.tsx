import { Flex } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import LeaderBoard from '../components/LeaderBoard'
import UserCommunityRelationshipManager from '../components/UserCommunityRelationshipManager/UserCommunityRelationshipManager'
import http from '../lib/http'
import { Community } from '../lib/interfaces'

const Home = () => {
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => http.get('/user').then((res) => res.data),
  })

  const { data: communities, isLoading: communitiesLoading } = useQuery({
    queryKey: ['communities'],
    queryFn: () => http.get<Community[]>('/community').then((res) => res.data),
  })

  return (
    <Flex
      flexDirection="column"
      gap={8}
      maxW={{ base: '90vw', lg: '4xl', xl: '7xl' }}
      mx="auto"
      py={8}
    >
      <Flex justifyContent="center">
        <a href="https://frameonesoftware.com" target="_blank">
          <img src="/logo.png" className="logo" alt="Frame One Software Logo" />
        </a>
      </Flex>

      <UserCommunityRelationshipManager
        communities={communities}
        users={users}
        isLoading={usersLoading || communitiesLoading}
      />

      <LeaderBoard communities={communities} isLoading={communitiesLoading} />
    </Flex>
  )
}

export default Home
