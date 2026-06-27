import type { PropertyCategory } from '@/types'

export const PROPERTY_CATEGORIES: { id: PropertyCategory; label: string; icon: string }[] = [
  { id: 'buy', label: 'Buy Properties', icon: '🏠' },
  { id: 'rent', label: 'Rent Properties', icon: '🔑' },
  { id: 'commercial', label: 'Commercial', icon: '🏢' },
  { id: 'new_projects', label: 'New Projects', icon: '🏗️' },
  { id: 'pg', label: 'PG / Co-Living', icon: '🛏️' },
  { id: 'plot', label: 'Plot / Land', icon: '📐' },
  { id: 'luxury', label: 'Luxury Properties', icon: '✨' },
]

export const PROPERTY_TYPES = [
  'Apartment', 'Builder Floor', 'Villa', 'Independent House', 'Plot', 'Commercial',
  'Office', 'Shop', 'Warehouse', 'Coworking Space',
]

export const BHK_OPTIONS = ['Studio', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK']

export const BUDGET_RANGES = [
  { label: 'Under ₹50L', min: 0, max: 5000000 },
  { label: '₹50L - ₹1Cr', min: 5000000, max: 10000000 },
  { label: '₹1Cr - ₹2Cr', min: 10000000, max: 20000000 },
  { label: '₹2Cr - ₹5Cr', min: 20000000, max: 50000000 },
  { label: '₹5Cr+', min: 50000000, max: 999999999 },
]

export const AMENITY_OPTIONS = [
  'Swimming Pool', 'Gym', 'Club House', 'Power Backup', 'Lift',
  'Parking', 'Security', 'Garden', 'Kids Play Area', 'EV Charging',
]

export const PROPERTY_AGE_OPTIONS = [
  'Under Construction', 'Ready To Move', 'New', '1-5 Years', '5-10 Years', '10+ Years',
]

export const FURNISHING_OPTIONS = ['Fully Furnished', 'Semi Furnished', 'Unfurnished']

export const FACING_OPTIONS = ['North', 'South', 'East', 'West']

export const POSSESSION_OPTIONS = [
  'Immediate', 'Within 3 Months', 'Within 6 Months', 'Within 1 Year',
]

export const POSTED_BY_OPTIONS = ['Durga Property']

export const PROPERTY_STATUS_OPTIONS = [
  'Available', 'Under Offer',
]

export const BUILDERS = [
  'DLF Limited', 'M3M India', 'Godrej Properties', 'Tata Housing',
  'Emaar India', 'Sobha Limited', 'ATS Infrastructure', 'Vatika Group',
  'Signature Global', 'Adani Realty', 'Central Park', 'Elan Group',
]

export const DEFAULT_FILTERS = {
  search: '',
  category: 'buy' as PropertyCategory,
  city: 'Gurgaon',
  locality: '',
  sector: '',
  pincode: '',
  landmark: '',
  minPrice: '',
  maxPrice: '',
  emiMin: '',
  emiMax: '',
  propertyTypes: [] as string[],
  bhk: [] as string[],
  minArea: '',
  maxArea: '',
  amenities: [] as string[],
  propertyAge: [] as string[],
  furnishing: [] as string[],
  facing: [] as string[],
  possessionStatus: [] as string[],
  postedBy: [] as string[],
  bedrooms: '',
  status: '',
  builder: '',
  featured: false,
  reraOnly: false,
  readyToMove: false,
  underConstruction: false,
  possessionYear: '',
}
