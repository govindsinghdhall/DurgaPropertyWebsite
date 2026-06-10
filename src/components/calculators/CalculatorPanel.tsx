import { useState } from 'react'
import {
  calculateAffordability, calculateEMI, calculateROI,
  calculateRentalYield, calculateTotalInterest, estimatePropertyValue,
} from '@/utils/calculators'
import { formatCurrency } from '@/utils/formatters'

type CalcTab = 'emi' | 'roi' | 'rental' | 'affordability' | 'valuation'

const tabs: { id: CalcTab; label: string }[] = [
  { id: 'emi', label: 'EMI Calculator' },
  { id: 'roi', label: 'ROI Calculator' },
  { id: 'rental', label: 'Rental Yield' },
  { id: 'affordability', label: 'Affordability' },
  { id: 'valuation', label: 'Property Valuation' },
]

export function CalculatorPanel({ compact = false }: { compact?: boolean }) {
  const [tab, setTab] = useState<CalcTab>('emi')

  return (
    <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${compact ? 'p-5' : 'p-8'}`}>
      <h3 className="text-xl font-bold text-slate-900">Financial Tools</h3>
      <p className="mt-1 text-sm text-slate-500">Plan your investment with smart calculators</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              tab === t.id ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'emi' && <EMICalc />}
        {tab === 'roi' && <ROICalc />}
        {tab === 'rental' && <RentalCalc />}
        {tab === 'affordability' && <AffordabilityCalc />}
        {tab === 'valuation' && <ValuationCalc />}
      </div>
    </div>
  )
}

const inputClass =
  'w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100'

function EMICalc() {
  const [principal, setPrincipal] = useState('5000000')
  const [rate, setRate] = useState('8.5')
  const [tenure, setTenure] = useState('20')
  const emi = calculateEMI(Number(principal), Number(rate), Number(tenure))
  const interest = calculateTotalInterest(emi, Number(tenure), Number(principal))

  return (
    <div className="space-y-4">
      <Field label="Loan Amount (₹)"><input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className={inputClass} /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Interest Rate (%)"><input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className={inputClass} /></Field>
        <Field label="Tenure (Years)"><input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} className={inputClass} /></Field>
      </div>
      <ResultBox>
        <p>Monthly EMI: <strong>{formatCurrency(emi)}</strong></p>
        <p className="mt-1 text-sm">Total Interest: {formatCurrency(interest)}</p>
      </ResultBox>
    </div>
  )
}

function ROICalc() {
  const [purchase, setPurchase] = useState('5000000')
  const [current, setCurrent] = useState('7500000')
  const [years, setYears] = useState('5')
  const roi = calculateROI(Number(purchase), Number(current), Number(years))

  return (
    <div className="space-y-4">
      <Field label="Purchase Price (₹)"><input type="number" value={purchase} onChange={(e) => setPurchase(e.target.value)} className={inputClass} /></Field>
      <Field label="Current Value (₹)"><input type="number" value={current} onChange={(e) => setCurrent(e.target.value)} className={inputClass} /></Field>
      <Field label="Holding Period (Years)"><input type="number" value={years} onChange={(e) => setYears(e.target.value)} className={inputClass} /></Field>
      <ResultBox>
        <p>Annual ROI: <strong>{roi.toFixed(2)}%</strong></p>
        <p className="mt-1 text-sm">Total Appreciation: {formatCurrency(Number(current) - Number(purchase))}</p>
      </ResultBox>
    </div>
  )
}

function RentalCalc() {
  const [rent, setRent] = useState('300000')
  const [value, setValue] = useState('5000000')
  const yield_ = calculateRentalYield(Number(rent), Number(value))

  return (
    <div className="space-y-4">
      <Field label="Annual Rent (₹)"><input type="number" value={rent} onChange={(e) => setRent(e.target.value)} className={inputClass} /></Field>
      <Field label="Property Value (₹)"><input type="number" value={value} onChange={(e) => setValue(e.target.value)} className={inputClass} /></Field>
      <ResultBox>
        <p>Rental Yield: <strong>{yield_.toFixed(2)}%</strong></p>
        <p className="mt-1 text-sm">Monthly Rent: {formatCurrency(Number(rent) / 12)}</p>
      </ResultBox>
    </div>
  )
}

function AffordabilityCalc() {
  const [income, setIncome] = useState('150000')
  const [existing, setExisting] = useState('0')
  const [rate, setRate] = useState('8.5')
  const [tenure, setTenure] = useState('20')
  const result = calculateAffordability(Number(income), Number(existing), Number(rate), Number(tenure))

  return (
    <div className="space-y-4">
      <Field label="Monthly Income (₹)"><input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className={inputClass} /></Field>
      <Field label="Existing EMIs (₹)"><input type="number" value={existing} onChange={(e) => setExisting(e.target.value)} className={inputClass} /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Interest Rate (%)"><input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className={inputClass} /></Field>
        <Field label="Tenure (Years)"><input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} className={inputClass} /></Field>
      </div>
      <ResultBox>
        <p>Max EMI: <strong>{formatCurrency(result.maxEMI)}</strong></p>
        <p className="mt-1 text-sm">Max Loan: {formatCurrency(result.maxLoan)}</p>
        <p className="text-sm">Max Property Budget: {formatCurrency(result.maxProperty)}</p>
      </ResultBox>
    </div>
  )
}

function ValuationCalc() {
  const [area, setArea] = useState('1500')
  const [rate, setRate] = useState('8000')
  const [age, setAge] = useState('1')
  const [location, setLocation] = useState('1.15')
  const value = estimatePropertyValue(Number(area), Number(rate), Number(age), Number(location))

  return (
    <div className="space-y-4">
      <Field label="Area (sq ft)"><input type="number" value={area} onChange={(e) => setArea(e.target.value)} className={inputClass} /></Field>
      <Field label="Price per sq ft (₹)"><input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className={inputClass} /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Age Factor (0.8-1)"><input type="number" step="0.05" value={age} onChange={(e) => setAge(e.target.value)} className={inputClass} /></Field>
        <Field label="Location Premium (1-1.5)"><input type="number" step="0.05" value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} /></Field>
      </div>
      <ResultBox>
        <p>Estimated Value: <strong>{formatCurrency(value)}</strong></p>
      </ResultBox>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  )
}

function ResultBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-brand-50 p-4 text-brand-900">
      {children}
    </div>
  )
}
