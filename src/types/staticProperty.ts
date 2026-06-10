export interface StaticPropertyCoordinates {
  lat: number
  lng: number
}

export interface StaticPropertyImage {
  id: string
  url: string
  caption?: string
  isPrimary: boolean
}

export interface StaticProperty {
  id: string
  title: string
  slug: string
  projectName: string
  builder: string
  sector: string
  locality: string
  city: string
  state: string
  pincode: string
  propertyType: string
  configuration: string
  areaSqft: number
  price: number
  pricePerSqft: number
  status: string
  possession: string
  propertyAge: string
  possessionStatus: string
  rera: boolean
  reraId: string
  featured: boolean
  luxury: boolean
  listingCategory: string
  bedrooms: number
  bathrooms: number
  description: string
  amenities: string[]
  images: StaticPropertyImage[]
  coordinates: StaticPropertyCoordinates
  nearbySchools: string[]
  nearbyHospitals: string[]
  nearbyMetroStations: string[]
  highlights: string[]
  address: string
  isVerified: boolean
  hasVideoTour: boolean
  postedBy: string
  furnishing: string
  facing: string
}

export interface StaticBuilder {
  id: string
  name: string
  tier: string
  projects: number
}

export interface StaticLocality {
  id: string
  name: string
  zone: string
  avgPrice: number
}
