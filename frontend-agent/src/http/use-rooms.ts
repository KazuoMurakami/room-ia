import { useQuery } from '@tanstack/react-query'
import { createApiUrl } from '@/lib/api'
import type { GetRoomsResponse } from './types/get-rooms-response'

export function useRooms() {
  return useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch(createApiUrl('/rooms'))
      const result: GetRoomsResponse = await response.json()

      return result
    },
  })
}
