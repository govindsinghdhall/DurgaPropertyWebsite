export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ApiEnvelope<T> {
  success: boolean
  message?: string
  data: T
  meta?: PaginationMeta
}

export interface PropertyImage {
  id: string
  url: string
  caption?: string | null
  isPrimary: boolean
}

export interface Property {
  id: string
  title: string
  description?: string | null
  listingCategory: PropertyCategory
  type: string
  status: string
  price: number
  pricePerSqFt: number
  area: number
  carpetArea?: number | null
  builtUpArea?: number | null
  superArea: number
  bedrooms?: number | null
  bathrooms?: number | null
  address: string
  city: string
  state: string
  pincode?: string | null
  locality: string
  sector?: string | null
  landmark?: string | null
  latitude?: number | null
  longitude?: number | null
  builderName?: string | null
  propertyAge?: string | null
  furnishing?: string | null
  facing?: string | null
  possessionStatus?: string | null
  possessionDate?: string | null
  roiPotential?: number | null
  postedBy: string
  isVerified: boolean
  hasRera: boolean
  reraId?: string | null
  hasVideoTour: boolean
  videoTourUrl?: string | null
  virtualTourUrl?: string | null
  brochureUrl?: string | null
  amenities?: string[]
  images?: PropertyImage[]
  slug?: string
  configuration?: string
  featured?: boolean
  luxury?: boolean
  projectName?: string
  nearbySchools?: string[]
  nearbyHospitals?: string[]
  nearbyMetroStations?: string[]
  highlights?: string[]
}

/** @deprecated Use Property directly — backend now returns enriched fields */
export type EnrichedProperty = Property

export type PropertyCategory =
  | 'buy'
  | 'rent'
  | 'commercial'
  | 'new_projects'
  | 'pg'
  | 'plot'
  | 'luxury'

export interface PropertyFilters {
  search: string
  category: PropertyCategory
  city: string
  locality: string
  sector: string
  pincode: string
  landmark: string
  minPrice: string
  maxPrice: string
  emiMin: string
  emiMax: string
  propertyTypes: string[]
  bhk: string[]
  minArea: string
  maxArea: string
  amenities: string[]
  propertyAge: string[]
  furnishing: string[]
  facing: string[]
  possessionStatus: string[]
  postedBy: string[]
  bedrooms: string
  status: string
  builder: string
  featured: boolean
  reraOnly: boolean
  readyToMove: boolean
  underConstruction: boolean
  possessionYear: string
}

export interface SearchParams {
  location: string
  propertyType: string
  budgetMin: string
  budgetMax: string
  bedrooms: string
  status: string
  category: PropertyCategory
}

export interface SavedSearch {
  id: string
  label: string
  filters: Partial<PropertyFilters>
  createdAt: string
}

export interface ScheduledVisit {
  id: string
  propertyId: string
  propertyTitle: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed'
}

export interface PropertyAlert {
  id: string
  label: string
  filters: Partial<PropertyFilters>
  active: boolean
}

export interface InquiryPayload {
  firstName: string
  lastName: string
  email?: string
  phone: string
  city?: string
  message?: string
  budget?: number
  propertyId?: string
}

export interface InquiryResponse {
  id: string
  message: string
}
