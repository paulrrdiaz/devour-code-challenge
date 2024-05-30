import { useMemo } from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Flex,
  Heading,
  Icon,
  Image,
  Spinner,
  Stat,
  StatNumber,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

import { StarIcon, UserIcon } from '../../lib/icons'
import { Community } from '../../lib/interfaces'

type LeaderBoardProps = {
  communities?: Community[]
  isLoading: boolean
}

const LeaderBoard = (props: LeaderBoardProps) => {
  const { communities = [], isLoading } = props
  const sortedCommunities = useMemo(
    () =>
      [...communities]
        .sort(
          (a, b) =>
            (b.totalExperiencePoints ?? 0) - (a.totalExperiencePoints ?? 0),
        )
        .map((community, index) => ({
          ...community,
          order: index + 1,
        })),
    [communities],
  )

  if (isLoading) {
    return (
      <Flex>
        <Spinner size="lg" />
      </Flex>
    )
  }

  if (!sortedCommunities || sortedCommunities.length === 0) {
    return (
      <Alert
        status="warning"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="md">
          No communities found
        </AlertTitle>
      </Alert>
    )
  }

  return (
    <TableContainer
      border="1px solid"
      borderColor="purple.500"
      rounded="md"
      p={4}
    >
      <Table size="sm" variant="striped" colorScheme="purple">
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th>Community</Th>
            <Th>Total Points</Th>
            <Th>Total Users</Th>
          </Tr>
        </Thead>

        <Tbody>
          {sortedCommunities.map((community) => (
            <Tr key={community._id}>
              <Td>
                <Stat>
                  <StatNumber>#{community.order}</StatNumber>
                </Stat>
              </Td>
              <Td>
                <Flex alignItems="center" gap={4}>
                  <Image
                    boxSize={16}
                    rounded="md"
                    alt={community.name}
                    src={community.logo}
                  />
                  <Heading size="sm">{community.name}</Heading>
                </Flex>
              </Td>
              <Td>
                <Flex alignItems="center" gap={2}>
                  <Stat flex={0}>
                    <StatNumber>
                      {community.totalExperiencePoints ?? 0}
                    </StatNumber>
                  </Stat>
                  <Icon as={StarIcon} fontSize="xl" />
                </Flex>
              </Td>
              <Td>
                <Flex alignItems="center" gap={2}>
                  <Stat flex={0}>
                    <StatNumber>{community.members.length}</StatNumber>
                  </Stat>
                  <Icon as={UserIcon} fontSize="xl" />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default LeaderBoard
