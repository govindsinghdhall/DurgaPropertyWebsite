import { CONTACT_EMAIL, LEAD_NOTIFICATION_CC } from '@/constants/contact'
import type { InquiryPayload } from '@/types'

/** Sends lead details to inbox via FormSubmit (no SMTP required). */
export async function notifyLeadByEmail(params: {
  payload: InquiryPayload
  referenceId?: string
  propertyTitle?: string
}): Promise<void> {
  const { payload, referenceId, propertyTitle } = params
  const name = `${payload.firstName} ${payload.lastName}`.trim()

  const body = Object.fromEntries(
    Object.entries({
      _subject: `New website lead — ${name}${propertyTitle ? ` · ${propertyTitle}` : ''}`,
      _template: 'table',
      _captcha: 'false',
      _cc: LEAD_NOTIFICATION_CC,
      Name: name,
      Phone: payload.phone,
      Email: payload.email,
      City: payload.city,
      Budget: payload.budget != null ? `₹${payload.budget.toLocaleString('en-IN')}` : undefined,
      Property: propertyTitle,
      Message: payload.message,
      Reference: referenceId?.slice(0, 8).toUpperCase(),
    }).filter(([, value]) => value != null && value !== ''),
  )

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error('Email notification could not be sent')
  }

  const result = (await response.json()) as { success?: string }
  if (result.success !== 'true') {
    throw new Error('Email notification was rejected')
  }
}
