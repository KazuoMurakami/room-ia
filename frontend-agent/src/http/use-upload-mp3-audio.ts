import { useMutation } from '@tanstack/react-query'
import { createApiUrl } from '@/lib/api'

export type UploadMp3AudioRequest = {
  roomId: string
  file: File
}

async function UploadMp3Audio({ roomId, file }: UploadMp3AudioRequest) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(createApiUrl(`/rooms/${roomId}/mp3-audio`), {
    method: 'POST',
    body: formData,
    signal: AbortSignal.timeout(5 * 60 * 1000), // 5 minutes
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      errorData.message || `Erro ${response.status}: ${response.statusText}`
    )
  }
}

export function useUploadMp3Audio() {
  return useMutation({
    mutationFn: UploadMp3Audio,
  })
}
