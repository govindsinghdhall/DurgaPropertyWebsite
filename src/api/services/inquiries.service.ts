import type { ApiEnvelope, InquiryPayload, InquiryResponse } from '@/types'
import { apiClient } from '../client'

export const inquiriesService = {
  async submit(payload: InquiryPayload) {
    const { data } = await apiClient.post<ApiEnvelope<InquiryResponse>>('/public/inquiries', payload)

    if (!data.success || !data.data?.id) {
      throw new Error(data.message || 'Inquiry was not saved. Please try again.')
    }

    return data.data
  },
}
