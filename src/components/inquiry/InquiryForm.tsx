import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { inquiriesService } from '@/api/services/inquiries.service'
import { getErrorMessage } from '@/api/client'
import { useToast } from '@/components/ui/Toast'

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

interface InquiryFormProps {
  propertyId?: string
  compact?: boolean
}

export function InquiryForm({ propertyId, compact = false }: InquiryFormProps) {
  const { showToast } = useToast()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: inquiriesService.submit,
    onSuccess: (data) => {
      showToast({
        type: 'success',
        title: 'Inquiry saved successfully',
        message: `${data.message} Your details are stored in our database. Reference: ${data.id.slice(0, 8)}.`,
      })
      reset()
    },
    onError: (err) => {
      showToast({
        type: 'error',
        title: 'Failed to save inquiry',
        message: getErrorMessage(err),
      })
    },
  })

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
        Submit your details and our team will reach out. Your inquiry becomes a lead in our CRM.
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
        {mutation.isPending ? 'Submitting...' : 'Submit Inquiry'}
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
