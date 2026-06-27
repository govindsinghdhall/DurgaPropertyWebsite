export const CONTACT_PHONE_E164 = '919810078510'
export const CONTACT_PHONE_DISPLAY = '+91 98100 78510'
export const CONTACT_PHONE_TEL = 'tel:+919810078510'
export const CONTACT_EMAIL = 'ervindirsinghdhall@gmail.com'
export const LEAD_NOTIFICATION_CC = 'govindsingh96@gmail.com'

export function getWhatsAppUrl(text: string): string {
  return `https://wa.me/${CONTACT_PHONE_E164}?text=${encodeURIComponent(text)}`
}

export function buildInquiryWhatsAppMessage(params: {
  firstName: string
  lastName: string
  phone: string
  referenceId: string
  propertyTitle?: string
  message?: string
}): string {
  const lines = [
    'Hi Durga Property, I just submitted an inquiry on your website.',
    `Name: ${params.firstName} ${params.lastName}`,
    `My phone: ${params.phone}`,
    `Reference: ${params.referenceId.slice(0, 8).toUpperCase()}`,
  ]
  if (params.propertyTitle) lines.push(`Property: ${params.propertyTitle}`)
  if (params.message?.trim()) lines.push(`Message: ${params.message.trim()}`)
  return lines.join('\n')
}
