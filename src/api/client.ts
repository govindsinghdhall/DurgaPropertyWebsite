import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'
const WEBSITE_API_KEY = import.meta.env.VITE_WEBSITE_API_KEY || ''
const ORGANIZATION_ID = import.meta.env.VITE_ORGANIZATION_ID || ''

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((config) => {
  const url = `${config.baseURL ?? ''}${config.url ?? ''}`
  const isPublic = url.includes('/public/')
  if (!isPublic) return config

  if (WEBSITE_API_KEY) {
    config.headers['x-website-api-key'] = WEBSITE_API_KEY
  }

  if (ORGANIZATION_ID) {
    config.params = { ...config.params, organizationId: ORGANIZATION_ID }
  }

  return config
})

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string; errors?: { message: string }[] }
    if (data?.errors?.length) return data.errors.map((e) => e.message).join(', ')
    return data.message || error.message || 'Something went wrong'
  }
  if (error instanceof Error) return error.message
  return 'Something went wrong'
}
