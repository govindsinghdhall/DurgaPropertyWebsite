import { resolvePropertyImageSrc, getPlaceholderForType } from './propertyImages'

export function formatCurrency(amount: string | number): string {
  const value = typeof amount === 'number' ? amount : Number(amount) || 0
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatListingPrice(price: string | number, listingCategory?: string): string {
  const formatted = formatCurrency(price)
  if (listingCategory === 'rent' || listingCategory === 'pg') {
    return `${formatted}/mo`
  }
  return formatted
}

export function formatLabel(value: string): string {
  return value
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function getImageUrl(url?: string, propertyType?: string, luxury?: boolean): string {
  if (!url?.trim()) return getPlaceholderForType(propertyType, luxury)
  return resolvePropertyImageSrc(url, propertyType, luxury)
}
