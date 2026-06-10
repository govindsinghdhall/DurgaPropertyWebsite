import { CalculatorPanel } from '@/components/calculators/CalculatorPanel'

export function ToolsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl font-extrabold text-slate-900">Property Tools</h1>
      <p className="mt-2 text-lg text-slate-500">
        EMI, ROI, rental yield, affordability, and property valuation calculators
      </p>
      <div className="mt-8">
        <CalculatorPanel />
      </div>
    </div>
  )
}
