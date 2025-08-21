import { useQuery } from '@tanstack/react-query'
import { createApiUrl } from '@/lib/api'
import type { GetStatsRoomsResponse } from './types/get-stats-rooms'

export function useStatsRooms() {
  return useQuery({
    queryKey: ['get-stats-rooms'],
    queryFn: async () => {
      const response = await fetch(createApiUrl('/stats'))
      const result: GetStatsRoomsResponse[] = await response.json()

      return result
    },
  })
}
