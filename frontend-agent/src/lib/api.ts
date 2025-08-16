/**
 * Configuração da API utilizando variáveis de ambiente
 */
/** biome-ignore-all lint/suspicious/noConsole: <> */
/** biome-ignore-all lint/nursery/useNumericSeparators: <> */

// Validação da variável de ambiente
const API_BASE_URL = import.meta.env.VITE_API_URL

if (!API_BASE_URL) {
  console.warn('⚠️ VITE_API_URL não está definida. Usando URL padrão.')
}

export const API_CONFIG = {
  BASE_URL: API_BASE_URL || 'http://localhost:3333',
  TIMEOUT: 10000, // 10 segundos
} as const

/**
 * Função utilitária para criar URLs da API
 */
export function createApiUrl(path: string): string {
  // Remove barra dupla se path já começar com /
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${API_CONFIG.BASE_URL}${cleanPath}`
}

/**
 * Configuração padrão para fetch requests
 */
export const defaultFetchOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
}

/**
 * Helper para fazer requests HTTP com configuração padrão
 */
export async function apiRequest<T>(
  endpoint: string, 
  options?: RequestInit
): Promise<T> {
  const url = createApiUrl(endpoint)
  
  const response = await fetch(url, {
    ...defaultFetchOptions,
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status} - ${response.statusText}`)
  }

  return response.json()
} 