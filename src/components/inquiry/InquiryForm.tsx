import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { inquiriesService } from '@/api/services/inquiries.service'
import { notifyLeadByEmail } from '@/api/services/lead-email.service'
import { getErrorMessage } from '@/api/client'
import { useToast } from '@/components/ui/Toast'
import {
  buildInquiryWhatsAppMessage,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  getWhatsAppUrl,
} from '@/constants/contact'
import type { InquiryPayload } from '@/types'

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  phone: z.string().min(10, 'Enter a valid phone number'),
  city: z.string().optional(),
  message: z.string().optional(),
  budget: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface SuccessState {
  referenceId: string
  payload: InquiryPayload
}

interface InquiryFormProps {
  propertyId?: string
  propertyTitle?: string
  compact?: boolean
}

const WHATSAPP_REDIRECT_SECONDS = 3

export function InquiryForm({ propertyId, propertyTitle, compact = false }: InquiryFormProps) {
  const { showToast } = useToast()
  const [success, setSuccess] = useState<SuccessState | null>(null)
  const [countdown, setCountdown] = useState(WHATSAPP_REDIRECT_SECONDS)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: async (variables: InquiryPayload) => {
      try {
        const data = await inquiriesService.submit(variables)
        try {
          await notifyLeadByEmail({
            payload: variables,
            referenceId: data.id,
            propertyTitle,
          })
        } catch {
          /* CRM saved the lead; FormSubmit email is best-effort */
        }
        return data
      } catch {
        await notifyLeadByEmail({
          payload: variables,
          propertyTitle,
        })
        return {
          id: `email-${Date.now()}`,
          message: 'Your inquiry was emailed to our team.',
        }
      }
    },
    onSuccess: (data, variables) => {
      setSuccess({ referenceId: data.id, payload: variables })
      setCountdown(WHATSAPP_REDIRECT_SECONDS)
      reset()
      showToast({
        type: 'success',
        title: 'Inquiry captured successfully',
        message: 'Your details are saved. Connect with us on WhatsApp or call now.',
      })
    },
    onError: (err) => {
      showToast({
        type: 'error',
        title: 'Failed to save inquiry',
        message: getErrorMessage(err),
      })
    },
  })

  const whatsappMessage = success
    ? buildInquiryWhatsAppMessage({
        firstName: success.payload.firstName,
        lastName: success.payload.lastName,
        phone: success.payload.phone,
        referenceId: success.referenceId,
        propertyTitle,
        message: success.payload.message,
      })
    : ''

  const whatsappUrl = whatsappMessage ? getWhatsAppUrl(whatsappMessage) : ''

  useEffect(() => {
    if (!success) return

    const timer = window.setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 0 : prev - 1))
    }, 1000)

    const redirect = window.setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    }, WHATSAPP_REDIRECT_SECONDS * 1000)

    return () => {
      window.clearInterval(timer)
      window.clearTimeout(redirect)
    }
  }, [success, whatsappUrl])

  if (success) {
    return (
      <div
        className={`rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-6 shadow-sm ${compact ? '' : 'lg:p-8'}`}
        role="status"
        aria-live="polite"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
          ✓
        </div>
        <h3 className="mt-5 text-xl font-bold text-slate-900">Your inquiry has been captured!</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Thank you, {success.payload.firstName}. Our team has received your details and saved them securely.
          Reference: <strong className="text-slate-800">{success.referenceId.slice(0, 8).toUpperCase()}</strong>
        </p>

        <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm text-slate-600 ring-1 ring-green-100">
          {countdown > 0 ? (
            <>Opening WhatsApp in <strong>{countdown}s</strong> so you can connect with us instantly…</>
          ) : (
            <>WhatsApp should be open — tap below if it didn&apos;t launch.</>
          )}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-bold text-white transition hover:bg-green-700"
          >
            Chat on WhatsApp
          </a>
          <a
            href={CONTACT_PHONE_TEL}
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-brand-600 bg-white py-3.5 text-sm font-bold text-brand-700 transition hover:bg-brand-50"
          >
            Call {CONTACT_PHONE_DISPLAY}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setSuccess(null)}
          className="mt-4 w-full text-sm font-medium text-slate-500 transition hover:text-brand-600"
        >
          Submit another inquiry
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const budget = data.budget ? Number(data.budget) : undefined
        mutation.mutate({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email || undefined,
          city: data.city,
          message: data.message,
          budget: budget && !Number.isNaN(budget) ? budget : undefined,
          propertyId,
        })
      })}
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${compact ? '' : 'lg:p-8'}`}
    >
      <h3 className="text-xl font-bold text-slate-900">
        {propertyId ? 'Inquire About This Property' : 'Get a Free Consultation'}
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Submit your details — we&apos;ll save your inquiry and connect you on WhatsApp or phone right away.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="First Name" error={errors.firstName?.message}>
          <input {...register('firstName')} className={inputClass} />
        </Field>
        <Field label="Last Name" error={errors.lastName?.message}>
          <input {...register('lastName')} className={inputClass} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input {...register('email')} type="email" className={inputClass} />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input {...register('phone')} className={inputClass} />
        </Field>
        <Field label="City" error={errors.city?.message}>
          <input {...register('city')} className={inputClass} />
        </Field>
        <Field label="Budget (INR)" error={errors.budget?.message}>
          <input {...register('budget')} type="number" className={inputClass} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Message" error={errors.message?.message}>
            <textarea {...register('message')} rows={4} className={inputClass} />
          </Field>
        </div>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="mt-6 w-full rounded-xl bg-brand-600 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
      >
        {mutation.isPending ? 'Saving your inquiry...' : 'Submit Inquiry'}
      </button>
    </form>
  )
}

const inputClass =
  'w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100'

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
}
