import { useState } from 'react'
import type { EnrichedProperty } from '@/types'
import { usePropertyStore } from '@/context/PropertyStoreContext'
import { useToast } from '@/components/ui/Toast'
import { InquiryForm } from '@/components/inquiry/InquiryForm'
import { getWhatsAppUrl } from '@/constants/contact'
import { formatCurrency } from '@/utils/formatters'

interface PropertyLeadActionsProps {
  property: EnrichedProperty
}

export function PropertyLeadActions({ property }: PropertyLeadActionsProps) {
  const { scheduleVisit } = usePropertyStore()
  const { showToast } = useToast()
  const [showVisitForm, setShowVisitForm] = useState(false)
  const [visitDate, setVisitDate] = useState('')
  const [visitTime, setVisitTime] = useState('')

  const whatsappUrl = getWhatsAppUrl(
    `Hi, I'm interested in ${property.title} at ${formatCurrency(property.price)}. Please share more details.`,
  )

  const handleScheduleVisit = () => {
    if (!visitDate || !visitTime) return
    scheduleVisit({
      propertyId: property.id,
      propertyTitle: property.title,
      date: visitDate,
      time: visitTime,
    })
    showToast({ type: 'success', title: 'Visit Scheduled', message: 'Our team will confirm your site visit shortly.' })
    setShowVisitForm(false)
  }

  const downloadBrochure = () => {
    showToast({
      type: 'success',
      title: 'Brochure Requested',
      message: 'The property brochure will be sent to your registered email.',
    })
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-3xl font-extrabold text-brand-700">{formatCurrency(property.price)}</p>
        <p className="text-sm text-slate-500">₹{property.pricePerSqFt.toLocaleString('en-IN')}/sq ft</p>

        <div className="mt-5 grid gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-bold text-white transition hover:bg-green-700"
          >
            WhatsApp Inquiry
          </a>
          <button
            type="button"
            onClick={() => setShowVisitForm(!showVisitForm)}
            className="rounded-xl border border-brand-600 py-3 font-bold text-brand-600 transition hover:bg-brand-50"
          >
            Schedule Site Visit
          </button>
          <button
            type="button"
            onClick={() => showToast({ type: 'success', title: 'Callback Requested', message: 'An agent will call you within 2 hours.' })}
            className="rounded-xl border border-slate-200 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Request Callback
          </button>
          <button
            type="button"
            onClick={downloadBrochure}
            className="rounded-xl border border-slate-200 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Download Brochure
          </button>
        </div>

        {showVisitForm && (
          <div className="mt-4 space-y-3 rounded-xl bg-slate-50 p-4">
            <input type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} className={inputClass} />
            <input type="time" value={visitTime} onChange={(e) => setVisitTime(e.target.value)} className={inputClass} />
            <button type="button" onClick={handleScheduleVisit} className="w-full rounded-xl bg-brand-600 py-2.5 font-bold text-white">
              Confirm Visit
            </button>
          </div>
        )}

        <div className="mt-5 space-y-2 border-t border-slate-100 pt-5 text-sm text-slate-600">
          <p><strong>Posted by:</strong> {property.postedBy}</p>
          {property.hasRera && <p><strong>RERA ID:</strong> {property.reraId}</p>}
          <p><strong>Possession:</strong> {property.possessionStatus}</p>
        </div>
      </div>

      <InquiryForm propertyId={property.id} propertyTitle={property.title} />
    </div>
  )
}

const inputClass =
  'w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100'
