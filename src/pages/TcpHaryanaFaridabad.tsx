import { useState, type FormEvent, type ReactNode } from 'react'
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  IndianRupee,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Wallet,
} from 'lucide-react'

const WHATSAPP_NUMBER = '919810078510'

const formatINR = (amount: number): string =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)

type EnquiryForm = {
  name: string
  mobile: string
  email: string
  propertyType: string
  budget: string
  message: string
  consent: boolean
}

const initialForm: EnquiryForm = {
  name: '',
  mobile: '',
  email: '',
  propertyType: '',
  budget: '',
  message: '',
  consent: false,
}

type PropertyType = {
  id: number
  category: string
  type: string
  studyRoom: boolean
  units: number
  carpetArea: number
  ratePerSqFt: number
  balconyArea: number
  balconyRate: number
  deposit: number
  registrationFee: number
}

const properties: PropertyType[] = [
  {
    id: 1,
    category: '2 BHK',
    type: 'Type 3P (2BHK+ S) 6 Units in MQ',
    studyRoom: true,
    units: 12,
    carpetArea: 645.62,
    ratePerSqFt: 5450,
    balconyArea: 263.83,
    balconyRate: 1300,
    deposit: 175931.45,
    registrationFee: 5100,
  },
  {
    id: 2,
    category: '2 BHK',
    type: 'Type-3 (2BHK+ S)',
    studyRoom: true,
    units: 156,
    carpetArea: 645.62,
    ratePerSqFt: 5450,
    balconyArea: 140.04,
    balconyRate: 1300,
    deposit: 175931.45,
    registrationFee: 5100,
  },
  {
    id: 3,
    category: '2 BHK',
    type: 'Type 4 (2BHK)',
    studyRoom: false,
    units: 112,
    carpetArea: 532.39,
    ratePerSqFt: 5450,
    balconyArea: 134.98,
    balconyRate: 1300,
    deposit: 145076.27,
    registrationFee: 5100,
  },
  {
    id: 4,
    category: '2 BHK',
    type: 'Type 5 (2BHK)',
    studyRoom: false,
    units: 112,
    carpetArea: 496.33,
    ratePerSqFt: 5450,
    balconyArea: 96.98,
    balconyRate: 1300,
    deposit: 135249.93,
    registrationFee: 5100,
  },
  {
    id: 5,
    category: '3 BHK',
    type: 'Type 1G (3BHK) MQ',
    studyRoom: false,
    units: 8,
    carpetArea: 645.52,
    ratePerSqFt: 5450,
    balconyArea: 367.48,
    balconyRate: 1300,
    deposit: 175904.20,
    registrationFee: 5100,
  },
  {
    id: 6,
    category: '3 BHK',
    type: 'Type 1P (3BHK) MQ',
    studyRoom: false,
    units: 16,
    carpetArea: 645.52,
    ratePerSqFt: 5450,
    balconyArea: 367.48,
    balconyRate: 1300,
    deposit: 175904.20,
    registrationFee: 5100,
  },
  {
    id: 7,
    category: '3 BHK',
    type: 'Type 2P (3BHK) MQ',
    studyRoom: false,
    units: 4,
    carpetArea: 645.62,
    ratePerSqFt: 5450,
    balconyArea: 263.83,
    balconyRate: 1300,
    deposit: 175931.45,
    registrationFee: 5100,
  },
  {
    id: 8,
    category: '3 BHK',
    type: 'Type 1 (3BHK)',
    studyRoom: false,
    units: 208,
    carpetArea: 645.52,
    ratePerSqFt: 5450,
    balconyArea: 133.90,
    balconyRate: 1300,
    deposit: 175904.20,
    registrationFee: 5100,
  },
  {
    id: 9,
    category: '3 BHK',
    type: 'Type 2 (3BHK)',
    studyRoom: false,
    units: 52,
    carpetArea: 645.62,
    ratePerSqFt: 5450,
    balconyArea: 136.38,
    balconyRate: 1300,
    deposit: 175931.45,
    registrationFee: 5100,
  },
]

export function TcpHaryanaFaridabad() {
  const [form, setForm] = useState<EnquiryForm>(initialForm)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProperty, setSelectedProperty] = useState<PropertyType | null>(
    null,
  )

  const updateField = <K extends keyof EnquiryForm>(
    field: K,
    value: EnquiryForm[K],
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }))
    setError('')
    setSubmitted(false)
  }

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const name = form.name.trim()
    const mobile = form.mobile.replace(/\D/g, '')

    if (!name && !mobile) {
      setError('Please enter your name or mobile number to proceed.')
      return
    }

    if (mobile && mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }

    if (!form.consent) {
      setError(
        'Please allow Durga Property to contact you about this enquiry.',
      )
      return
    }

    const message = [
      'Hello Durga Property,',
      '',
      'I am interested in the affordable housing project in Faridabad.',
      '',
      'Location: Sector 110A, Faridabad, Haryana',
      '',
      name ? `Name: ${name}` : '',
      mobile ? `Mobile: ${form.mobile}` : '',
      form.email ? `Email: ${form.email}` : '',
      form.propertyType
        ? `Preferred property type: ${form.propertyType}`
        : '',
      form.budget ? `Budget: ${form.budget}` : '',
      form.message ? `Message: ${form.message}` : '',
      '',
      'Please share the brochure, layout plans, application details, and assistance process.',
    ]
      .filter(Boolean)
      .join('\n')

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(message)

    setSubmitted(true)
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const submitUnitEnquiry = (property: PropertyType) => {
    const message = [
      'Hello Durga Property,',
      '',
      `I am interested in the ${property.type} (${property.category}) at Sector 110A, Faridabad.`,
      '',
      `Unit type: ${property.type}`,
      `Category: ${property.category}`,
      `Carpet area: ${property.carpetArea.toFixed(2)} sq. ft.`,
      `Balcony area: ${property.balconyArea.toFixed(2)} sq. ft.`,
      `Listed deposit: ${formatINR(property.deposit)}`,
      `Registration fee: ${formatINR(property.registrationFee)}`,
      '',
      form.name ? `Name: ${form.name}` : '',
      form.mobile ? `Mobile: ${form.mobile}` : '',
      form.email ? `Email: ${form.email}` : '',
      '',
      'Please share the brochure, layout plans, and application assistance details.',
    ]
      .filter(Boolean)
      .join('\n')

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(message)

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const filteredProperties = properties.filter(
    (property) =>
      selectedCategory === 'All' || property.category === selectedCategory,
  )

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />

        <div className="relative mx-auto grid max-w-[1280px] items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-20">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Durga Property • Affordable Housing
            </div>

            <h1 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
              Durga Property
              <span className="mt-1.5 block text-amber-300">
                Affordable housing in Faridabad
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
              Explore 2 BHK and 3 BHK apartments in the affordable housing
              project at Sector 110A, Faridabad. Get complete property details,
              pricing, layout plans, and application assistance from Durga
              Property.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-xs sm:text-sm text-slate-200">
              <span className="rounded-full border border-white/20 px-3 py-1.5">
                <MapPin className="mr-1 inline h-3.5 w-3.5" />
                Sector 110A, Faridabad
              </span>

              <span className="rounded-full border border-white/20 px-3 py-1.5">
                <Building2 className="mr-1 inline h-3.5 w-3.5" />
                680 units
              </span>

              <span className="rounded-full border border-white/20 px-3 py-1.5">
                <Wallet className="mr-1 inline h-3.5 w-3.5" />
                ₹5,450/sq. ft.
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#enquiry"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
              >
                Apply with Durga Property
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <IndianRupee className="h-3.5 w-3.5" />
                View pricing
              </a>
            </div>

            <p className="mt-5 max-w-lg text-[11px] leading-4 text-slate-400 sm:text-xs sm:leading-5">
              Durga Property is your single point of contact for this project.
              We provide the brochure, layout plans, application details, and
              complete assistance. Property allotment is subject to the
              applicable eligibility criteria.
            </p>
          </div>

          <div className="relative mt-10 lg:mt-0">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-800 shadow-2xl">
              <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 p-4 sm:p-6">
                <div className="w-full max-w-xs">
                  <div className="mb-3 flex items-center justify-between text-[10px] text-slate-400 sm:text-xs">
                    <span>DURGA PROPERTY</span>
                    <span>SECTOR 110A</span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    {Array.from({ length: 18 }, (_, index) => (
                      <div
                        key={index}
                        className="h-6 rounded-md border border-slate-500/50 bg-slate-600/70 sm:h-8"
                      />
                    ))}
                  </div>

                  <div className="mt-2 grid grid-cols-6 gap-1.5 sm:gap-2">
                    {Array.from({ length: 12 }, (_, index) => (
                      <div
                        key={index}
                        className="h-1.5 rounded-full bg-amber-400/70 sm:h-2"
                      />
                    ))}
                  </div>

                  <div className="mt-5 text-center sm:mt-6">
                    <p className="text-xl font-semibold text-white sm:text-2xl">
                      680 Homes
                    </p>
                    <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                      Affordable residential housing
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 bg-slate-900/80 p-4 sm:p-5">
                <p className="text-xs text-slate-400 sm:text-sm">
                  Application assistance by Durga Property
                </p>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-lg font-semibold sm:text-xl">4.70 acres</p>
                  <span className="rounded-full bg-amber-400/10 px-2.5 py-1 text-[10px] font-medium text-amber-300 sm:text-xs">
                    Up to 90% Home Loan Assistance
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 left-3 right-3 rounded-xl border border-white/20 bg-white p-4 text-slate-900 shadow-xl sm:left-6 sm:right-6 sm:p-5">
              <p className="text-xs text-slate-500 sm:text-sm">
                Registration fee per unit
              </p>

              <div className="mt-1 flex flex-wrap items-end justify-between gap-2">
                <p className="text-xl font-semibold sm:text-2xl">
                  {formatINR(5100)}
                </p>

                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-medium text-amber-900 sm:text-xs">
                  Applicable per unit
                </span>
              </div>

              <p className="mt-1.5 text-[10px] text-slate-500 sm:text-xs">
                Separate from the listed property deposit and other applicable
                charges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project overview */}
      <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground sm:text-xs">
            Project overview
          </p>

          <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
            Everything you need to know about this project
          </h2>

          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
            This affordable housing project is located in Sector 110A,
            Faridabad, Haryana. The project is planned across 4.70 acres with
            680 residential units under the Affordable Housing Policy 2013 and
            its amendments.
          </p>

          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
            The project offers 2 BHK, 2 BHK + Study, and 3 BHK apartments with
            different unit configurations, carpet areas, balcony areas, and
            deposit amounts. Durga Property provides the complete brochure,
            approved building plans, and property-wise details.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Fact
            icon={<Building2 />}
            label="Project"
            value="Durga Property"
            note="Sector 110A, Faridabad"
          />

          <Fact
            icon={<MapPin />}
            label="Location"
            value="Sector 110A"
            note="Faridabad, Haryana"
          />

          <Fact
            icon={<Building2 />}
            label="Total units"
            value="680"
            note="Affordable housing"
          />

          <Fact
            icon={<MapPin />}
            label="Total site area"
            value="4.70 acres"
            note="Project site"
          />
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <p className="text-xs text-muted-foreground sm:text-sm">
              Home loan assistance
            </p>
            <p className="mt-1.5 text-lg font-semibold sm:text-xl">Up to 90%</p>
            <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
              Durga Property assists with home loan processing and documentation.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <p className="text-xs text-muted-foreground sm:text-sm">
              Registration fee per unit
            </p>
            <p className="mt-1.5 text-lg font-semibold sm:text-xl">
              {formatINR(5100)}
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
              Applicable per unit as per the official process.
            </p>
          </div>
        </div>
      </section>

      {/* Property highlights */}
      <section className="bg-muted/40">
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground sm:text-xs">
            Property highlights
          </p>

          <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
            Find a home that fits your requirements
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <InfoCard title="2 BHK apartments">
              <Bullet>Type 3P and Type-3 configurations</Bullet>
              <Bullet>Type 4 and Type 5 configurations</Bullet>
              <Bullet>Carpet area from 496.33 sq. ft.</Bullet>
              <Bullet>Balcony areas from 96.98 sq. ft.</Bullet>
            </InfoCard>

            <InfoCard title="3 BHK apartments">
              <Bullet>Type 1G, Type 1P, and Type 2P MQ units</Bullet>
              <Bullet>Type 1 and Type 2 configurations</Bullet>
              <Bullet>Carpet area of approximately 645.52–645.62 sq. ft.</Bullet>
              <Bullet>Balcony areas up to 367.48 sq. ft.</Bullet>
            </InfoCard>

            <InfoCard title="Project features">
              <Bullet>Affordable housing project under AHP 2013</Bullet>
              <Bullet>Dedicated car parking mentioned in the project description</Bullet>
              <Bullet>Planned natural light, ventilation, and balconies</Bullet>
              <Bullet>Brochure and layout plans available through Durga Property</Bullet>
            </InfoCard>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-card p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 sm:h-5 sm:w-5" />
              <div>
                <h3 className="text-sm font-semibold sm:text-base">
                  Important PMAY requirement
                </h3>
                <p className="mt-1.5 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                  If you are applying under the PMAY category, uploading the
                  PMAY certificate is mandatory. The application may be rejected
                  if the required certificate is not uploaded. Durga Property
                  will guide you through the document checklist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing and unit details */}
      <section id="pricing" className="scroll-mt-16">
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground sm:text-xs">
              Apartment prices and sizes
            </p>

            <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
              Compare all 9 apartment categories
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
              The project offers nine unit categories. Select a category to
              explore the available configurations and prices. Durga Property
              provides complete details for every unit type.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {['All', '2 BHK', '3 BHK'].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category)
                  setSelectedProperty(null)
                }}
                className={`rounded-full px-4 py-2 text-xs font-medium transition sm:text-sm ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border bg-card text-foreground hover:bg-muted'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={() => setSelectedProperty(property)}
              />
            ))}
          </div>

          {selectedProperty && (
            <PropertyDetail
              property={selectedProperty}
              onClose={() => setSelectedProperty(null)}
              onEnquire={() => {
                setForm((previous) => ({
                  ...previous,
                  propertyType: selectedProperty.type,
                }))
                setSelectedProperty(null)
                document.getElementById('enquiry')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
              onWhatsApp={() => submitUnitEnquiry(selectedProperty)}
            />
          )}

          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="border-b border-border bg-muted/50 p-4 sm:p-5">
              <h3 className="text-base font-semibold sm:text-lg">
                Pricing summary
              </h3>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Listed rate: ₹5,450 per sq. ft. carpet area.
                Balcony rate: ₹1,300 per sq. ft.
              </p>
            </div>

            <div className="grid gap-4 p-4 sm:grid-cols-3 sm:p-5">
              <div>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Lowest listed deposit
                </p>
                <p className="mt-1 text-lg font-semibold sm:text-xl">
                  ₹1,35,249.93
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Highest listed deposit
                </p>
                <p className="mt-1 text-lg font-semibold sm:text-xl">
                  ₹1,75,931.45
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Registration fee per unit
                </p>
                <p className="mt-1 text-lg font-semibold sm:text-xl">
                  {formatINR(5100)}
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground sm:text-xs">
                  Applicable per unit
                </p>
              </div>
            </div>
          </div>

          <p className="mt-3 text-[11px] leading-4 text-muted-foreground sm:text-xs sm:leading-5">
            The listed deposit and registration fee are indicative. These are
            not a guarantee of the final property price, total payable amount,
            or allotment. Contact Durga Property for the latest details.
          </p>
        </div>
      </section>

      {/* Investment */}
      <section className="bg-muted/40">
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground sm:text-xs">
                Financial details
              </p>

              <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
                Understand the application payments
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
                The project lists a deposit and registration fee for each
                apartment category. These are separate from the full property
                price.
              </p>

              <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
                <AmountRow
                  label="Lowest listed property deposit"
                  amount={135249.93}
                />

                <AmountRow
                  label="Highest listed property deposit"
                  amount={175931.45}
                />

                <AmountRow
                  label="Registration fee per unit"
                  amount={5100}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-900 sm:h-12 sm:w-12 sm:rounded-2xl">
                <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <h3 className="mt-4 text-base font-semibold sm:text-lg">
                Know before you pay
              </h3>

              <p className="mt-2.5 text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
                Confirm the official payment instructions, applicable charges,
                refund terms, and the total property price before making any
                payment. Durga Property will guide you through the complete
                process.
              </p>

              <div className="mt-5 rounded-2xl bg-muted p-3.5 text-xs leading-5 sm:p-4 sm:text-sm sm:leading-6">
                <p className="font-medium">Refund applicable: Yes</p>
                <p className="mt-1 text-muted-foreground">
                  The exact refund terms must be checked in the official
                  brochure and payment conditions. Durga Property will help you
                  understand the refund policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dates and application */}
      <section id="application" className="scroll-mt-16">
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground sm:text-xs">
            Application schedule
          </p>

          <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
            Important dates for this project
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
            The project notice lists the following payment, application, and
            proposed draw dates. Durga Property will keep you updated on any
            changes.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <DateCard
              icon={<CalendarDays />}
              label="Payment start date"
              value="02 September 2026"
              note="08:00 AM"
            />

            <DateCard
              icon={<CalendarDays />}
              label="Payment end date"
              value="18 September 2026"
              note="12:00 AM"
            />

            <DateCard
              icon={<CalendarDays />}
              label="Online application starts"
              value="02 September 2026"
              note="08:00 AM"
            />

            <DateCard
              icon={<CalendarDays />}
              label="Online application ends"
              value="18 September 2026"
              note="12:00 AM"
            />

            <DateCard
              icon={<CalendarDays />}
              label="Proposed draw date"
              value="27 October 2026"
              note="12:00 PM"
            />

            <DateCard
              icon={<ShieldCheck />}
              label="Application status"
              value="Refund applicable"
              note="As per official terms"
            />
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 sm:h-5 sm:w-5" />
              <div>
                <h3 className="text-sm font-semibold sm:text-base">
                  Official application deadline
                </h3>
                <p className="mt-1.5 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                  The listed end date for online applications and payments is
                  18 September 2026 at 00:00:00. Confirm the live status with
                  Durga Property before applying.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-muted/40">
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground sm:text-xs">
                Your single point of contact
              </p>

              <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
                Durga Property
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
                Durga Property is the only customer-facing brand for this
                project. We provide the brochure, layout plans, application
                details, and complete assistance.
              </p>

              <div className="mt-6 space-y-3">
                <ContactPoint
                  icon={<MessageCircle />}
                  title="WhatsApp assistance"
                  description="Send your enquiry directly to our team."
                />

                <ContactPoint
                  icon={<Phone />}
                  title="Application guidance"
                  description="Get help understanding the application requirements."
                />

                <ContactPoint
                  icon={<Wallet />}
                  title="Home loan assistance"
                  description="Up to 90% home loan assistance available."
                />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
              <h3 className="text-base font-semibold sm:text-lg">
                What Durga Property provides
              </h3>

              <div className="mt-5 space-y-3">
                <ContactPoint
                  icon={<MessageCircle />}
                  title="WhatsApp assistance"
                  description="Send your enquiry directly to our team."
                />

                <ContactPoint
                  icon={<Phone />}
                  title="Application guidance"
                  description="Get help understanding the application requirements."
                />

                <ContactPoint
                  icon={<ShieldCheck />}
                  title="Transparent process"
                  description="Assistance does not guarantee property allotment."
                />
              </div>

              <a
                href="#enquiry"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Request assistance
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Application process */}
      <section className="bg-muted/40">
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground sm:text-xs">
            How it works
          </p>

          <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
            Apply with Durga Property
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Step number="01" title="Submit an enquiry">
              Fill in your details to request assistance with the project. All
              fields are optional.
            </Step>

            <Step number="02" title="Understand your options">
              Review apartment categories, prices, deposit amounts, documents,
              and eligibility requirements with our team.
            </Step>

            <Step number="03" title="Complete the official process">
              Follow the application and payment process. Property allotment is
              subject to the official draw and applicable eligibility criteria.
            </Step>
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquiry" className="scroll-mt-16">
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground sm:text-xs">
                Get in touch
              </p>

              <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
                Get application assistance from Durga Property
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
                Tell us about your property requirements. All fields are
                optional — share only what you have available right now.
              </p>

              <div className="mt-6 space-y-3">
                <ContactPoint
                  icon={<MessageCircle />}
                  title="WhatsApp assistance"
                  description="Send your enquiry directly to our team."
                />

                <ContactPoint
                  icon={<Phone />}
                  title="Professional guidance"
                  description="Get help understanding the application requirements."
                />

                <ContactPoint
                  icon={<ShieldCheck />}
                  title="Transparent process"
                  description="Assistance does not guarantee property allotment."
                />
              </div>
            </div>

            <form
              onSubmit={submitEnquiry}
              className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6"
            >
              <div className="mb-5">
                <h3 className="text-base font-semibold sm:text-lg">
                  Property enquiry
                </h3>

                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  All fields are optional. Share only what you have available
                  right now.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Full name"
                  value={form.name}
                  onChange={(value) => updateField('name', value)}
                  placeholder="Your name"
                />

                <Field
                  label="Mobile number"
                  value={form.mobile}
                  onChange={(value) => updateField('mobile', value)}
                  placeholder="10-digit mobile number"
                  type="tel"
                />

                <Field
                  label="Email address"
                  value={form.email}
                  onChange={(value) => updateField('email', value)}
                  placeholder="Optional"
                  type="email"
                />

                <div>
                  <label className="mb-1.5 block text-xs font-medium sm:text-sm">
                    Preferred property type
                  </label>

                  <select
                    value={form.propertyType}
                    onChange={(event) =>
                      updateField('propertyType', event.target.value)
                    }
                    className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:ring-2 focus:ring-ring sm:h-11 sm:text-sm"
                  >
                    <option value="">Select (optional)</option>
                    {properties.map((property) => (
                      <option key={property.id} value={property.type}>
                        {property.type}
                      </option>
                    ))}
                    <option value="Not sure">Not sure</option>
                  </select>
                </div>

                <Field
                  label="Your budget"
                  value={form.budget}
                  onChange={(value) => updateField('budget', value)}
                  placeholder="Optional"
                />

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-medium sm:text-sm">
                    Message or requirements
                  </label>

                  <textarea
                    value={form.message}
                    onChange={(event) =>
                      updateField('message', event.target.value)
                    }
                    placeholder="Tell us anything about your property requirements..."
                    rows={4}
                    className="w-full resize-y rounded-xl border border-border bg-background p-3 text-xs outline-none focus:ring-2 focus:ring-ring sm:text-sm"
                  />
                </div>
              </div>

              <label className="mt-4 flex items-start gap-3 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) =>
                    updateField('consent', event.target.checked)
                  }
                  className="mt-0.5 h-4 w-4 rounded border-border"
                />

                <span>
                  I agree to be contacted by Durga Property regarding this
                  enquiry through WhatsApp, phone, or SMS.
                </span>
              </label>

              {error && (
                <p className="mt-3 text-xs text-red-600 sm:text-sm" role="alert">
                  {error}
                </p>
              )}

              {submitted && (
                <div className="mt-3 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800 sm:p-4 sm:text-sm">
                  <CheckCircle2 className="mr-2 inline h-3.5 w-3.5" />
                  Your enquiry is ready to send on WhatsApp.
                </div>
              )}

              <button
                type="submit"
                className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" />
                Send Enquiry on WhatsApp
              </button>

              <p className="mt-3 text-center text-[10px] leading-4 text-muted-foreground sm:text-xs sm:leading-5">
                By submitting, you request application assistance. This does
                not complete an official application or guarantee allotment.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
            Frequently asked questions
          </h2>

          <div className="mt-6 divide-y divide-border rounded-2xl border border-border">
            <Faq
              question="What is this project?"
              answer="This is an affordable housing project in Sector 110A, Faridabad, Haryana. The project has 680 units under the Affordable Housing Policy 2013 and its amendments. Durga Property is your single point of contact for complete details."
            />

            <Faq
              question="What apartment types are available?"
              answer="The project offers 2 BHK, 2 BHK + Study, and 3 BHK apartments across nine categories. Carpet areas range from 496.33 to 645.62 sq. ft., and balcony areas range from 96.98 to 367.48 sq. ft."
            />

            <Faq
              question="What is the price of the property?"
              answer="The listed rate is ₹5,450 per sq. ft. of carpet area and ₹1,300 per sq. ft. of balcony area. Durga Property will help you understand the complete property price and payable amounts."
            />

            <Faq
              question="What is the deposit amount?"
              answer="The listed deposit amounts range from ₹1,35,249.93 to ₹1,75,931.45 depending on the apartment category. The registration fee listed is ₹5,100 per unit."
            />

            <Faq
              question="What is the ₹5,100 payment?"
              answer="It is the registration fee applicable per unit as per the official process. It is separate from the property deposit and other applicable charges."
            />

            <Faq
              question="Does paying the registration fee guarantee a property?"
              answer="No. Payment of the registration fee does not guarantee lucky-draw selection or property allotment."
            />

            <Faq
              question="Is home loan assistance available?"
              answer="Yes. Durga Property provides up to 90% home loan assistance to eligible applicants, including documentation and processing support."
            />

            <Faq
              question="What is the last date to apply?"
              answer="The listed end date for online applications and payments is 18 September 2026 at 00:00:00. Confirm the live status with Durga Property before applying."
            />

            <Faq
              question="What is the proposed draw date?"
              answer="The proposed draw date and time is 27 October 2026 at 12:00 PM. The draw is subject to the official process and applicable eligibility criteria."
            />

            <Faq
              question="Can I submit only my name and mobile number?"
              answer="Yes. All enquiry fields are optional. Share only the information you have available right now."
            />

            <Faq
              question="Where can I get the brochure and layout plans?"
              answer="Contact Durga Property on WhatsApp at 9810078510. We will share the complete brochure, approved layout plans, and application details."
            />
          </div>
        </div>
      </section>

      {/* Footer note */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold sm:text-base">
                Durga Property • Sector 110A, Faridabad
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Application assistance by Durga Property
              </p>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium transition hover:bg-muted sm:px-5 sm:py-2.5 sm:text-sm"
            >
              <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Chat on WhatsApp
            </a>
          </div>

          <p className="mt-5 text-[10px] leading-4 text-muted-foreground sm:text-xs sm:leading-5">
            Information on this page is indicative. Verify the latest
            application dates, eligibility requirements, charges, and official
            payment instructions before making any payment. Durga Property
            application assistance does not guarantee allotment.
          </p>
        </div>
      </section>
    </main>
  )
}

type FactProps = {
  icon: ReactNode
  label: string
  value: string
  note?: string
}

function Fact({ icon, label, value, note }: FactProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
        {icon}
      </div>

      <p className="text-xs text-muted-foreground sm:text-sm">{label}</p>
      <p className="mt-1 text-base font-semibold sm:text-lg">{value}</p>

      {note && (
        <p className="mt-1 text-[10px] text-muted-foreground sm:text-xs">
          {note}
        </p>
      )}
    </div>
  )
}

type InfoCardProps = {
  title: string
  children: ReactNode
}

function InfoCard({ title, children }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <h3 className="text-base font-semibold sm:text-lg">{title}</h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  )
}

type BulletProps = {
  children: ReactNode
}

function Bullet({ children }: BulletProps) {
  return (
    <li className="flex items-start gap-2.5 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 sm:h-4 sm:w-4" />
      <span>{children}</span>
    </li>
  )
}

type AmountRowProps = {
  label: string
  amount: number
}

function AmountRow({ label, amount }: AmountRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-5 sm:py-5">
      <p className="text-xs text-muted-foreground sm:text-sm">{label}</p>
      <p className="text-sm font-semibold sm:text-base">
        {formatINR(amount)}
      </p>
    </div>
  )
}

type DateCardProps = {
  icon: ReactNode
  label: string
  value: string
  note: string
}

function DateCard({ icon, label, value, note }: DateCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
        {icon}
      </div>

      <p className="text-xs text-muted-foreground sm:text-sm">{label}</p>
      <p className="mt-1 text-sm font-semibold sm:text-base">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{note}</p>
    </div>
  )
}

type StepProps = {
  number: string
  title: string
  children: ReactNode
}

function Step({ number, title, children }: StepProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <span className="text-xs font-semibold text-amber-600 sm:text-sm">
        {number}
      </span>

      <h3 className="mt-3 text-base font-semibold sm:text-lg">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
        {children}
      </p>
    </div>
  )
}

type ContactPointProps = {
  icon: ReactNode
  title: string
  description: string
}

function ContactPoint({
  icon,
  title,
  description,
}: ContactPointProps) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted">
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium sm:text-[15px]">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          {description}
        </p>
      </div>
    </div>
  )
}

type FieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  type?: 'text' | 'email' | 'tel'
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium sm:text-sm">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none focus:ring-2 focus:ring-ring sm:h-11 sm:text-sm"
      />
    </div>
  )
}

type FaqProps = {
  question: string
  answer: string
}

function Faq({ question, answer }: FaqProps) {
  return (
    <details className="group p-4 sm:p-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium sm:text-[15px]">
        {question}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180 sm:h-5 sm:w-5" />
      </summary>

      <p className="mt-2.5 max-w-3xl text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
        {answer}
      </p>
    </details>
  )
}

type PropertyCardProps = {
  property: PropertyType
  onSelect: () => void
}

function PropertyCard({ property, onSelect }: PropertyCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium sm:text-xs">
          {property.category}
        </span>

        <span className="text-[10px] text-muted-foreground sm:text-xs">
          {property.units} units
        </span>
      </div>

      <h3 className="mt-3 text-sm font-semibold sm:text-base">
        {property.type}
      </h3>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
          <span className="text-muted-foreground">Carpet area</span>
          <span className="font-medium">
            {property.carpetArea.toFixed(2)} sq. ft.
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
          <span className="text-muted-foreground">Balcony area</span>
          <span className="font-medium">
            {property.balconyArea.toFixed(2)} sq. ft.
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
          <span className="text-muted-foreground">Study room</span>
          <span className="font-medium">
            {property.studyRoom ? 'Yes' : 'No'}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
          <span className="text-muted-foreground">Rate / sq. ft.</span>
          <span className="font-medium">
            {formatINR(property.ratePerSqFt)}
          </span>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-muted p-3 sm:p-3.5">
        <p className="text-[10px] text-muted-foreground sm:text-xs">
          Listed deposit
        </p>
        <p className="mt-1 text-base font-semibold sm:text-lg">
          {formatINR(property.deposit)}
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground sm:text-xs">
          Registration: {formatINR(property.registrationFee)}
        </p>
      </div>

      <button
        type="button"
        onClick={onSelect}
        className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-border px-4 text-xs font-medium transition hover:bg-muted sm:text-sm"
      >
        View property details
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

type PropertyDetailProps = {
  property: PropertyType
  onClose: () => void
  onEnquire: () => void
  onWhatsApp: () => void
}

function PropertyDetail({
  property,
  onClose,
  onEnquire,
  onWhatsApp,
}: PropertyDetailProps) {
  return (
    <div className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground sm:text-sm">
            Selected apartment
          </p>
          <h3 className="mt-1 text-lg font-semibold sm:text-xl">
            {property.type}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            {property.category} • {property.units} units
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted sm:px-4 sm:py-2 sm:text-sm"
        >
          Close
        </button>
      </div>

      <div className="mt-6 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Fact
          icon={<Building2 />}
          label="Carpet area"
          value={`${property.carpetArea.toFixed(2)} sq. ft.`}
        />

        <Fact
          icon={<Building2 />}
          label="Balcony area"
          value={`${property.balconyArea.toFixed(2)} sq. ft.`}
        />

        <Fact
          icon={<Wallet />}
          label="Listed deposit"
          value={formatINR(property.deposit)}
        />

        <Fact
          icon={<IndianRupee />}
          label="Registration fee per unit"
          value={formatINR(property.registrationFee)}
        />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl bg-muted p-3.5 sm:p-4">
          <p className="text-xs text-muted-foreground sm:text-sm">
            Carpet area rate
          </p>
          <p className="mt-1 text-base font-semibold sm:text-lg">
            {formatINR(property.ratePerSqFt)} / sq. ft.
          </p>
        </div>

        <div className="rounded-xl bg-muted p-3.5 sm:p-4">
          <p className="text-xs text-muted-foreground sm:text-sm">
            Balcony rate
          </p>
          <p className="mt-1 text-base font-semibold sm:text-lg">
            {formatINR(property.balconyRate)} / sq. ft.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
        <button
          type="button"
          onClick={onWhatsApp}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-emerald-700 sm:text-sm"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Enquire on WhatsApp
        </button>

        <button
          type="button"
          onClick={onEnquire}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground transition hover:opacity-90 sm:text-sm"
        >
          Enquire about this type
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}