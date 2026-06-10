export function calculateEMI(principal: number, annualRate: number, tenureYears: number): number {
  if (!principal || !tenureYears) return 0
  const monthlyRate = annualRate / 12 / 100
  const months = tenureYears * 12
  if (monthlyRate === 0) return principal / months
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  )
}

export function calculateTotalInterest(
  emi: number,
  tenureYears: number,
  principal: number,
): number {
  return emi * tenureYears * 12 - principal
}

export function calculateROI(
  purchasePrice: number,
  currentValue: number,
  years: number,
): number {
  if (!purchasePrice || !years) return 0
  return ((currentValue - purchasePrice) / purchasePrice / years) * 100
}

export function calculateRentalYield(
  annualRent: number,
  propertyValue: number,
): number {
  if (!propertyValue) return 0
  return (annualRent / propertyValue) * 100
}

export function calculateAffordability(
  monthlyIncome: number,
  existingEMI: number,
  interestRate: number,
  tenureYears: number,
  foir = 0.5,
): { maxEMI: number; maxLoan: number; maxProperty: number } {
  const maxEMI = Math.max(0, monthlyIncome * foir - existingEMI)
  const monthlyRate = interestRate / 12 / 100
  const months = tenureYears * 12
  let maxLoan = 0
  if (monthlyRate > 0) {
    maxLoan = (maxEMI * (Math.pow(1 + monthlyRate, months) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, months))
  } else {
    maxLoan = maxEMI * months
  }
  return { maxEMI, maxLoan, maxProperty: maxLoan * 1.2 }
}

export function estimatePropertyValue(
  area: number,
  pricePerSqFt: number,
  ageFactor: number,
  locationPremium: number,
): number {
  return Math.round(area * pricePerSqFt * ageFactor * locationPremium)
}
