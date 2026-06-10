/** Verified working Unsplash URLs (HEAD-checked) */
export const PLACEHOLDER_IMAGES = {
  apartment: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=675&fit=crop&q=80',
  luxury: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=675&fit=crop&q=80',
  builder_floor: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=675&fit=crop&q=80',
  independent_house: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=675&fit=crop&q=80',
  villa: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=675&fit=crop&q=80',
  plot: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=675&fit=crop&q=80',
  commercial: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=675&fit=crop&q=80',
  default: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=675&fit=crop&q=80',
} as const

/** Rotating verified images for listing galleries */
export const VERIFIED_LISTING_IMAGES = [
  PLACEHOLDER_IMAGES.default,
  PLACEHOLDER_IMAGES.apartment,
  PLACEHOLDER_IMAGES.luxury,
  PLACEHOLDER_IMAGES.builder_floor,
  PLACEHOLDER_IMAGES.villa,
  PLACEHOLDER_IMAGES.independent_house,
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=675&fit=crop&q=80',
  PLACEHOLDER_IMAGES.commercial,
] as const

const BROKEN_UNSPLASH_IDS = new Set([
  '1512917774080-999013f78978',
  '1600566753190-17f0baa8a6e3',
  '1605276374102-a960f5c283bf',
  '1600047509806-ba139d603ceb',
  '1600596542815-ffad4c15331b',
])

type PlaceholderKey = keyof typeof PLACEHOLDER_IMAGES

function placeholderKeyForType(type?: string | null, luxury?: boolean): PlaceholderKey {
  if (luxury) return 'luxury'
  const t = (type ?? '').toLowerCase().replace(/_/g, ' ')
  if (t.includes('builder') && t.includes('floor')) return 'builder_floor'
  if (t.includes('independent') || t.includes('house')) return 'independent_house'
  if (t.includes('villa')) return 'villa'
  if (t.includes('plot') || t.includes('land')) return 'plot'
  if (t.includes('commercial') || t.includes('office') || t.includes('shop') || t.includes('retail')) {
    return 'commercial'
  }
  if (t.includes('apartment')) return 'apartment'
  return 'default'
}

export function getPlaceholderForType(type?: string | null, luxury?: boolean): string {
  return PLACEHOLDER_IMAGES[placeholderKeyForType(type, luxury)]
}

/** Inline SVG — always works offline, never 404 */
export function getSvgPlaceholder(type?: string | null, luxury?: boolean): string {
  const key = placeholderKeyForType(type, luxury)
  const palettes: Record<PlaceholderKey, { bg: string; accent: string; label: string }> = {
    apartment: { bg: '#0f2942', accent: '#38bdf8', label: 'Luxury Apartment' },
    luxury: { bg: '#1a0f2e', accent: '#c4b5fd', label: 'Luxury Residence' },
    builder_floor: { bg: '#1e293b', accent: '#fbbf24', label: 'Builder Floor' },
    independent_house: { bg: '#14532d', accent: '#86efac', label: 'Independent House' },
    villa: { bg: '#134e4a', accent: '#5eead4', label: 'Premium Villa' },
    plot: { bg: '#422006', accent: '#fcd34d', label: 'Premium Plot' },
    commercial: { bg: '#1e1b4b', accent: '#818cf8', label: 'Commercial Space' },
    default: { bg: '#0c4a6e', accent: '#7dd3fc', label: 'Premium Property' },
  }
  const { bg, accent, label } = palettes[key]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-label="${label}">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg}"/>
        <stop offset="100%" stop-color="${accent}" stop-opacity="0.35"/>
      </linearGradient>
    </defs>
    <rect width="640" height="360" fill="url(#g)"/>
    <rect x="200" y="120" width="240" height="180" rx="4" fill="${accent}" fill-opacity="0.25" stroke="${accent}" stroke-width="2"/>
    <polygon points="200,120 320,60 440,120" fill="${accent}" fill-opacity="0.4" stroke="${accent}" stroke-width="2"/>
    <rect x="260" y="200" width="50" height="100" fill="${bg}" fill-opacity="0.6"/>
    <rect x="330" y="180" width="60" height="50" fill="${bg}" fill-opacity="0.5"/>
    <text x="320" y="330" text-anchor="middle" fill="white" fill-opacity="0.9" font-family="system-ui,sans-serif" font-size="18" font-weight="600">${label}</text>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

function sanitizeUrl(url: string): string {
  for (const brokenId of BROKEN_UNSPLASH_IDS) {
    if (url.includes(brokenId)) {
      return ''
    }
  }
  return url
}

export function resolvePropertyImageSrc(
  url: string | undefined | null,
  type?: string | null,
  luxury?: boolean,
): string {
  if (!url?.trim()) return getPlaceholderForType(type, luxury)
  const cleaned = sanitizeUrl(url.trim())
  if (!cleaned) return getPlaceholderForType(type, luxury)
  if (cleaned.startsWith('http') || cleaned.startsWith('data:')) return cleaned
  const base = (import.meta.env.VITE_API_BASE_URL || '').replace('/api/v1', '')
  return `${base}${cleaned}`
}
