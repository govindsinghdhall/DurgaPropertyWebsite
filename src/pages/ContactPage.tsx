import { InquiryForm } from '@/components/inquiry/InquiryForm'
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from '@/constants/contact'

export function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-extrabold text-slate-900">Contact Us</h1>
        <p className="mt-4 text-lg text-slate-600">
          Ready to find your next home or investment? Our expert agents are here to help you
          every step of the way.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: '📞', label: 'Phone', value: CONTACT_PHONE_DISPLAY, href: CONTACT_PHONE_TEL },
              { icon: '✉️', label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
              { icon: '📍', label: 'Office', value: 'Gurgaon, Haryana' },
              { icon: '🕐', label: 'Hours', value: 'Mon–Sun, 10 AM – 7 PM' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="text-2xl" aria-hidden>{item.icon}</span>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                {'href' in item && item.href ? (
                  <a href={item.href} className="mt-1 block font-semibold text-brand-700 hover:underline">
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-1 font-semibold text-slate-800">{item.value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-brand-50 p-6">
            <p className="font-bold text-brand-900">Why contact us?</p>
            <ul className="mt-3 space-y-2 text-sm text-brand-800">
              <li className="flex items-start gap-2"><span>✓</span> Free property consultation</li>
              <li className="flex items-start gap-2"><span>✓</span> Verified RERA-compliant listings</li>
              <li className="flex items-start gap-2"><span>✓</span> End-to-end buying assistance</li>
              <li className="flex items-start gap-2"><span>✓</span> Home loan & legal support</li>
            </ul>
          </div>
        </div>

        <InquiryForm />
      </div>
    </div>
  )
}
