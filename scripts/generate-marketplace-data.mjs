/**
 * Generates /src/data/properties.json, builders.json, localities.json
 * Run: node scripts/generate-marketplace-data.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '../src/data')

const LOCALITIES = [
  { id: 'old_gurgaon', name: 'Old Gurgaon', zone: 'Central Gurgaon', avgPrice: 25000000 },
  { id: 'new_gurgaon', name: 'New Gurgaon', zone: 'West Gurgaon', avgPrice: 18000000 },
  { id: 'golf_course_road', name: 'Golf Course Road', zone: 'Premium', avgPrice: 80000000 },
  { id: 'golf_course_ext', name: 'Golf Course Extension Road', zone: 'Premium', avgPrice: 55000000 },
  { id: 'dwarka_expressway', name: 'Dwarka Expressway', zone: 'West Gurgaon', avgPrice: 22000000 },
  { id: 'spr_road', name: 'SPR Road', zone: 'South Gurgaon', avgPrice: 15000000 },
  { id: 'sohna_road', name: 'Sohna Road', zone: 'South Gurgaon', avgPrice: 20000000 },
  { id: 'palam_vihar', name: 'Palam Vihar', zone: 'Old Gurgaon', avgPrice: 20000000 },
  { id: 'civil_lines', name: 'Civil Lines', zone: 'Old Gurgaon', avgPrice: 18000000 },
  { id: 'south_city', name: 'South City', zone: 'Central Gurgaon', avgPrice: 35000000 },
  { id: 'sushant_lok', name: 'Sushant Lok', zone: 'Central Gurgaon', avgPrice: 40000000 },
  { id: 'dlf_phase_1', name: 'DLF Phase 1', zone: 'Premium', avgPrice: 60000000 },
  { id: 'dlf_phase_2', name: 'DLF Phase 2', zone: 'Premium', avgPrice: 55000000 },
  { id: 'dlf_phase_3', name: 'DLF Phase 3', zone: 'Premium', avgPrice: 50000000 },
  { id: 'dlf_phase_4', name: 'DLF Phase 4', zone: 'Premium', avgPrice: 45000000 },
  { id: 'dlf_phase_5', name: 'DLF Phase 5', zone: 'Premium', avgPrice: 70000000 },
]

const BUILDERS = [
  { id: 'huda', name: 'HUDA', tier: 'government', projects: 20 },
  { id: 'dlf', name: 'DLF Limited', tier: 'luxury', projects: 10 },
  { id: 'm3m', name: 'M3M India', tier: 'premium', projects: 8 },
  { id: 'smartworld', name: 'Smartworld Developers', tier: 'premium', projects: 4 },
  { id: 'godrej', name: 'Godrej Properties', tier: 'premium', projects: 4 },
  { id: 'signature', name: 'Signature Global', tier: 'mid', projects: 4 },
  { id: 'paras', name: 'Paras Buildtech', tier: 'luxury', projects: 1 },
  { id: 'trump', name: 'Trump Organization', tier: 'ultra_luxury', projects: 1 },
  { id: 'sobha', name: 'Sobha Limited', tier: 'luxury', projects: 2 },
  { id: 'tata', name: 'Tata Housing', tier: 'luxury', projects: 1 },
  { id: 'experion', name: 'Experion Developers', tier: 'luxury', projects: 1 },
  { id: 'conscient', name: 'Conscient Infrastructure', tier: 'luxury', projects: 1 },
  { id: 'elan', name: 'Elan Group', tier: 'luxury', projects: 1 },
  { id: 'birla', name: 'Birla Estates', tier: 'premium', projects: 1 },
  { id: 'bptp', name: 'BPTP Limited', tier: 'premium', projects: 1 },
]

const PROJECTS = [
  { name: 'HUDA Floors Sector 4', builder: 'HUDA', locality: 'Old Gurgaon', sector: 'Sector 4', minP: 11000000, maxP: 45000000, luxury: false, types: ['builder_floor', 'independent_house'] },
  { name: 'HUDA Floors Sector 5', builder: 'HUDA', locality: 'Old Gurgaon', sector: 'Sector 5', minP: 11000000, maxP: 42000000, luxury: false, types: ['builder_floor'] },
  { name: 'HUDA Floors Sector 7', builder: 'HUDA', locality: 'Old Gurgaon', sector: 'Sector 7', minP: 12000000, maxP: 40000000, luxury: false, types: ['builder_floor'] },
  { name: 'HUDA Floors Sector 9', builder: 'HUDA', locality: 'Old Gurgaon', sector: 'Sector 9', minP: 11000000, maxP: 38000000, luxury: false, types: ['builder_floor', 'apartment'] },
  { name: 'HUDA Floors Sector 9A', builder: 'HUDA', locality: 'Old Gurgaon', sector: 'Sector 9A', minP: 12000000, maxP: 40000000, luxury: false, types: ['builder_floor'] },
  { name: 'HUDA Floors Sector 10', builder: 'HUDA', locality: 'Old Gurgaon', sector: 'Sector 10', minP: 13000000, maxP: 42000000, luxury: false, types: ['builder_floor'] },
  { name: 'HUDA Floors Sector 10A', builder: 'HUDA', locality: 'Old Gurgaon', sector: 'Sector 10A', minP: 13000000, maxP: 41000000, luxury: false, types: ['builder_floor'] },
  { name: 'HUDA Floors Sector 12', builder: 'HUDA', locality: 'Old Gurgaon', sector: 'Sector 12', minP: 14000000, maxP: 43000000, luxury: false, types: ['builder_floor', 'apartment'] },
  { name: 'HUDA Floors Sector 12A', builder: 'HUDA', locality: 'Old Gurgaon', sector: 'Sector 12A', minP: 14000000, maxP: 44000000, luxury: false, types: ['builder_floor'] },
  { name: 'HUDA Floors Sector 14', builder: 'HUDA', locality: 'Old Gurgaon', sector: 'Sector 14', minP: 15000000, maxP: 45000000, luxury: false, types: ['builder_floor', 'apartment'] },
  { name: 'HUDA Floors Sector 15', builder: 'HUDA', locality: 'Old Gurgaon', sector: 'Sector 15', minP: 15000000, maxP: 45000000, luxury: false, types: ['builder_floor'] },
  { name: 'HUDA Floors Sector 15 Part 2', builder: 'HUDA', locality: 'Old Gurgaon', sector: 'Sector 15 Part 2', minP: 14000000, maxP: 42000000, luxury: false, types: ['builder_floor'] },
  { name: 'HUDA Floors Sector 17', builder: 'HUDA', locality: 'Old Gurgaon', sector: 'Sector 17', minP: 13000000, maxP: 40000000, luxury: false, types: ['builder_floor'] },
  { name: 'HUDA Floors Sector 21', builder: 'HUDA', locality: 'Old Gurgaon', sector: 'Sector 21', minP: 12000000, maxP: 38000000, luxury: false, types: ['builder_floor', 'apartment'] },
  { name: 'HUDA Floors Sector 21A', builder: 'HUDA', locality: 'Old Gurgaon', sector: 'Sector 21A', minP: 12000000, maxP: 39000000, luxury: false, types: ['builder_floor'] },
  { name: 'HUDA Floors Sector 22', builder: 'HUDA', locality: 'Old Gurgaon', sector: 'Sector 22', minP: 11000000, maxP: 37000000, luxury: false, types: ['builder_floor'] },
  { name: 'HUDA Floors Sector 23', builder: 'HUDA', locality: 'Old Gurgaon', sector: 'Sector 23', minP: 11000000, maxP: 36000000, luxury: false, types: ['builder_floor', 'apartment'] },
  { name: 'Palam Vihar Floors', builder: 'HUDA', locality: 'Palam Vihar', sector: 'Palam Vihar', minP: 15000000, maxP: 45000000, luxury: false, types: ['builder_floor', 'independent_house'] },
  { name: 'Civil Lines Residences', builder: 'HUDA', locality: 'Civil Lines', sector: 'Civil Lines', minP: 18000000, maxP: 50000000, luxury: false, types: ['independent_house', 'apartment'] },
  { name: 'New Colony Residences', builder: 'HUDA', locality: 'Old Gurgaon', sector: 'New Colony', minP: 11000000, maxP: 35000000, luxury: false, types: ['builder_floor', 'independent_house'] },
  { name: 'DLF Camellias', builder: 'DLF Limited', locality: 'Golf Course Road', sector: 'Sector 42', minP: 250000000, maxP: 1000000000, luxury: true, types: ['apartment'] },
  { name: 'DLF Magnolias', builder: 'DLF Limited', locality: 'Golf Course Road', sector: 'Sector 42', minP: 150000000, maxP: 600000000, luxury: true, types: ['apartment'] },
  { name: 'DLF Aralias', builder: 'DLF Limited', locality: 'Golf Course Road', sector: 'Sector 42', minP: 120000000, maxP: 500000000, luxury: true, types: ['apartment'] },
  { name: 'DLF Crest', builder: 'DLF Limited', locality: 'Golf Course Road', sector: 'Sector 54', minP: 80000000, maxP: 350000000, luxury: true, types: ['apartment'] },
  { name: 'DLF Park Place', builder: 'DLF Limited', locality: 'DLF Phase 5', sector: 'Sector 54', minP: 70000000, maxP: 300000000, luxury: true, types: ['apartment'] },
  { name: 'DLF Belaire', builder: 'DLF Limited', locality: 'Golf Course Road', sector: 'Sector 53', minP: 60000000, maxP: 250000000, luxury: true, types: ['apartment'] },
  { name: 'DLF Carlton Estate', builder: 'DLF Limited', locality: 'DLF Phase 5', sector: 'Sector 53', minP: 80000000, maxP: 400000000, luxury: true, types: ['apartment', 'villa'] },
  { name: 'DLF The Arbour', builder: 'DLF Limited', locality: 'Dwarka Expressway', sector: 'Sector 113', minP: 50000000, maxP: 200000000, luxury: true, types: ['apartment'] },
  { name: 'DLF Privana South', builder: 'DLF Limited', locality: 'Dwarka Expressway', sector: 'Sector 77', minP: 40000000, maxP: 150000000, luxury: true, types: ['apartment'] },
  { name: 'DLF Privana West', builder: 'DLF Limited', locality: 'Dwarka Expressway', sector: 'Sector 76', minP: 40000000, maxP: 140000000, luxury: true, types: ['apartment'] },
  { name: 'M3M Mansion', builder: 'M3M India', locality: 'Golf Course Road', sector: 'Sector 65', minP: 80000000, maxP: 300000000, luxury: true, types: ['apartment'] },
  { name: 'M3M Golf Estate', builder: 'M3M India', locality: 'Golf Course Extension Road', sector: 'Sector 65', minP: 60000000, maxP: 250000000, luxury: true, types: ['apartment', 'villa'] },
  { name: 'M3M Golf Hills', builder: 'M3M India', locality: 'Golf Course Extension Road', sector: 'Sector 79', minP: 40000000, maxP: 180000000, luxury: true, types: ['apartment'] },
  { name: 'M3M Crown', builder: 'M3M India', locality: 'Dwarka Expressway', sector: 'Sector 111', minP: 30000000, maxP: 120000000, luxury: false, types: ['apartment'] },
  { name: 'M3M Capital', builder: 'M3M India', locality: 'Dwarka Expressway', sector: 'Sector 113', minP: 25000000, maxP: 100000000, luxury: false, types: ['apartment', 'commercial'] },
  { name: 'M3M Latitude', builder: 'M3M India', locality: 'Golf Course Extension Road', sector: 'Sector 67', minP: 35000000, maxP: 150000000, luxury: true, types: ['apartment'] },
  { name: 'M3M Merlin', builder: 'M3M India', locality: 'Golf Course Road', sector: 'Sector 67', minP: 45000000, maxP: 180000000, luxury: true, types: ['apartment'] },
  { name: 'M3M Antalya Hills', builder: 'M3M India', locality: 'Sohna Road', sector: 'Sector 79', minP: 20000000, maxP: 80000000, luxury: false, types: ['apartment', 'villa'] },
  { name: 'Smartworld One DXP', builder: 'Smartworld Developers', locality: 'Dwarka Expressway', sector: 'Sector 113', minP: 15000000, maxP: 80000000, luxury: false, types: ['apartment'] },
  { name: 'Smartworld Gems', builder: 'Smartworld Developers', locality: 'SPR Road', sector: 'Sector 89', minP: 12000000, maxP: 50000000, luxury: false, types: ['apartment'] },
  { name: 'Smartworld Orchard', builder: 'Smartworld Developers', locality: 'New Gurgaon', sector: 'Sector 61', minP: 15000000, maxP: 60000000, luxury: false, types: ['apartment'] },
  { name: 'Smartworld Sky Arc', builder: 'Smartworld Developers', locality: 'Dwarka Expressway', sector: 'Sector 104', minP: 18000000, maxP: 70000000, luxury: false, types: ['apartment'] },
  { name: 'Godrej Aristocrat', builder: 'Godrej Properties', locality: 'Golf Course Extension Road', sector: 'Sector 49', minP: 35000000, maxP: 150000000, luxury: true, types: ['apartment'] },
  { name: 'Godrej Vrikshya', builder: 'Godrej Properties', locality: 'Dwarka Expressway', sector: 'Sector 103', minP: 20000000, maxP: 90000000, luxury: false, types: ['apartment'] },
  { name: 'Godrej Air', builder: 'Godrej Properties', locality: 'Golf Course Extension Road', sector: 'Sector 85', minP: 25000000, maxP: 100000000, luxury: false, types: ['apartment'] },
  { name: 'Godrej Meridien', builder: 'Godrej Properties', locality: 'Golf Course Road', sector: 'Sector 59', minP: 40000000, maxP: 180000000, luxury: true, types: ['apartment'] },
  { name: 'Signature Titanium SPR', builder: 'Signature Global', locality: 'SPR Road', sector: 'Sector 71', minP: 10000000, maxP: 50000000, luxury: false, types: ['apartment'] },
  { name: 'Signature City 81', builder: 'Signature Global', locality: 'New Gurgaon', sector: 'Sector 81', minP: 8000000, maxP: 40000000, luxury: false, types: ['apartment', 'plot'] },
  { name: 'Signature Deluxe DXP', builder: 'Signature Global', locality: 'Dwarka Expressway', sector: 'Sector 37D', minP: 12000000, maxP: 55000000, luxury: false, types: ['apartment'] },
  { name: 'Signature Roselia', builder: 'Signature Global', locality: 'SPR Road', sector: 'Sector 95A', minP: 10000000, maxP: 45000000, luxury: false, types: ['apartment'] },
  { name: 'Paras Quartier', builder: 'Paras Buildtech', locality: 'Golf Course Road', sector: 'Sector 2', minP: 150000000, maxP: 500000000, luxury: true, types: ['apartment'] },
  { name: 'Trump Towers Gurgaon', builder: 'Trump Organization', locality: 'Golf Course Extension Road', sector: 'Sector 65', minP: 200000000, maxP: 800000000, luxury: true, types: ['apartment'] },
  { name: 'Sobha Aranya', builder: 'Sobha Limited', locality: 'Golf Course Extension Road', sector: 'Sector 80', minP: 50000000, maxP: 200000000, luxury: true, types: ['apartment'] },
  { name: 'Sobha City', builder: 'Sobha Limited', locality: 'Dwarka Expressway', sector: 'Sector 108', minP: 25000000, maxP: 120000000, luxury: false, types: ['apartment'] },
  { name: 'Tata Primanti', builder: 'Tata Housing', locality: 'Golf Course Extension Road', sector: 'Sector 72', minP: 40000000, maxP: 180000000, luxury: true, types: ['apartment', 'villa'] },
  { name: 'Experion Windchants', builder: 'Experion Developers', locality: 'Dwarka Expressway', sector: 'Sector 112', minP: 35000000, maxP: 150000000, luxury: true, types: ['apartment'] },
  { name: 'Conscient Parq', builder: 'Conscient Infrastructure', locality: 'Golf Course Extension Road', sector: 'Sector 80', minP: 45000000, maxP: 200000000, luxury: true, types: ['apartment'] },
  { name: 'Elan The Presidential', builder: 'Elan Group', locality: 'Golf Course Extension Road', sector: 'Sector 106', minP: 80000000, maxP: 350000000, luxury: true, types: ['apartment'] },
  { name: 'Birla Navya', builder: 'Birla Estates', locality: 'SPR Road', sector: 'Sector 63A', minP: 15000000, maxP: 70000000, luxury: false, types: ['apartment'] },
  { name: 'BPTP Amstoria', builder: 'BPTP Limited', locality: 'Dwarka Expressway', sector: 'Sector 102', minP: 12000000, maxP: 60000000, luxury: false, types: ['apartment', 'plot', 'villa'] },
]

const APT_CONFIGS = [
  { config: '2 BHK', beds: 2, baths: 2, area: [1100, 1400] },
  { config: '3 BHK', beds: 3, baths: 3, area: [1500, 2000] },
  { config: '3.5 BHK', beds: 3, baths: 3, area: [1800, 2300] },
  { config: '4 BHK', beds: 4, baths: 4, area: [2200, 3200] },
  { config: '4.5 BHK', beds: 4, baths: 5, area: [2800, 3800] },
  { config: '5 BHK', beds: 5, baths: 5, area: [3500, 5500] },
]

const FLOOR_CONFIGS = [
  { config: '3 BHK Floor', beds: 3, baths: 3, area: [1800, 2400] },
  { config: '4 BHK Floor', beds: 4, baths: 4, area: [2400, 3200] },
  { config: 'Independent Floor', beds: 3, baths: 3, area: [2000, 2800] },
]

const HOUSE_CONFIGS = [
  { config: '240 Sq Yd', beds: 4, baths: 4, area: [2160, 2600] },
  { config: '300 Sq Yd', beds: 5, baths: 5, area: [2700, 3400] },
  { config: '500 Sq Yd', beds: 5, baths: 6, area: [4500, 6000] },
]

const PLOT_CONFIGS = [
  { config: '120 Sq Yd', beds: 0, baths: 0, area: [1080, 1080] },
  { config: '150 Sq Yd', beds: 0, baths: 0, area: [1350, 1350] },
  { config: '180 Sq Yd', beds: 0, baths: 0, area: [1620, 1620] },
  { config: '250 Sq Yd', beds: 0, baths: 0, area: [2250, 2250] },
  { config: '500 Sq Yd', beds: 0, baths: 0, area: [4500, 4500] },
]

const COMM_CONFIGS = [
  { config: 'Office Space', beds: 0, baths: 0, area: [800, 5000] },
  { config: 'Retail Shop', beds: 0, baths: 1, area: [400, 2000] },
  { config: 'SCO Plot', beds: 0, baths: 0, area: [1200, 4000] },
]

const AMENITIES_POOL = [
  'Swimming Pool', 'Gym', 'Club House', 'Power Backup', 'Lift', 'Parking',
  'Security', 'Garden', 'Kids Play Area', 'EV Charging',
]

const SCHOOLS = ['Delhi Public School', 'GD Goenka Public School', 'Heritage Xperiential', 'Scottish High International', 'Shiv Nadar School']
const HOSPITALS = ['Medanta Hospital', 'Fortis Memorial', 'Artemis Hospital', 'Max Hospital', 'Paras Hospital']
const METROS = ['IFFCO Chowk Metro', 'Huda City Centre', 'Millennium City Centre', 'Sector 55-56 Metro', 'Cyber City Rapid Metro']

/** Verified working Unsplash photo IDs (404-checked) */
const IMG_IDS = [
  '1560518883-ce09059eeffa',
  '1600585154340-be6161a56a0c',
  '1600607687939-ce8a6c25118c',
  '1613490493576-7fde63acd811',
  '1545324418-cc1a3fa10c00',
  '1613977257363-707ba9348227',
  '1500382017468-9049fed747ef',
  '1486406146926-c627a92ad1ab',
]

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick(arr) {
  return arr[rand(0, arr.length - 1)]
}

function pickN(arr, n) {
  const copy = [...arr]
  const out = []
  for (let i = 0; i < n && copy.length; i++) {
    const idx = rand(0, copy.length - 1)
    out.push(copy.splice(idx, 1)[0])
  }
  return out
}

function coordsForSector(sector, i) {
  const base = { lat: 28.4595, lng: 77.0266 }
  const hash = sector.split('').reduce((a, c) => a + c.charCodeAt(0), 0) + i
  return {
    lat: +(base.lat + (hash % 100) * 0.001 - 0.05).toFixed(6),
    lng: +(base.lng + (hash % 80) * 0.001 - 0.04).toFixed(6),
  }
}

function getConfigs(typeKey) {
  if (typeKey === 'apartment') return APT_CONFIGS
  if (typeKey === 'builder_floor') return FLOOR_CONFIGS
  if (typeKey === 'independent_house' || typeKey === 'villa') return HOUSE_CONFIGS
  if (typeKey === 'plot') return PLOT_CONFIGS
  if (typeKey === 'commercial') return COMM_CONFIGS
  return APT_CONFIGS
}

function typeLabel(key) {
  const map = {
    apartment: 'Apartment', builder_floor: 'Builder Floor', independent_house: 'Independent House',
    villa: 'Villa', plot: 'Plot', commercial: 'Commercial',
  }
  return map[key] || 'Apartment'
}

function listingCategory(project, typeKey, price) {
  if (typeKey === 'commercial') return 'commercial'
  if (typeKey === 'plot') return 'plot'
  if (project.luxury || price >= 30000000) return 'luxury'
  if (pick(['ready_to_move', 'under_construction']) === 'under_construction') return 'new_projects'
  return 'buy'
}

const properties = []
let counter = 0

for (const project of PROJECTS) {
  const perProject = rand(8, 12)
  for (let i = 0; i < perProject; i++) {
    counter++
    const typeKey = pick(project.types)
    const configs = getConfigs(typeKey)
    const cfg = pick(configs)
    const area = rand(cfg.area[0], cfg.area[1])
    const price = rand(project.minP, project.maxP)
    const pricePerSqft = Math.round(price / area)
    const id = `dp-gur-${String(counter).padStart(4, '0')}`
    const slug = `${slugify(project.name)}-${slugify(cfg.config)}-${counter}`
    const possession = pick(['Ready To Move', 'Under Construction', 'Dec 2026', 'Mar 2027', 'Jun 2028'])
    const status = possession === 'Ready To Move' ? 'available' : pick(['available', 'under_offer'])
    const coords = coordsForSector(project.sector, counter)
    const amenities = pickN(AMENITIES_POOL, rand(4, 8))
    const featured = project.luxury && i < 2
    const images = pickN(IMG_IDS, rand(3, 5)).map((imgId, idx) => ({
      id: `${id}-img-${idx}`,
      url: `https://images.unsplash.com/photo-${imgId}?w=1200&q=80`,
      caption: `${project.name} view ${idx + 1}`,
      isPrimary: idx === 0,
    }))

    properties.push({
      id,
      title: `${cfg.config} in ${project.name}`,
      slug,
      projectName: project.name,
      builder: project.builder,
      sector: project.sector,
      locality: project.locality,
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: String(rand(122001, 122505)),
      propertyType: typeLabel(typeKey),
      configuration: cfg.config,
      areaSqft: area,
      price,
      pricePerSqft,
      status,
      possession,
      propertyAge: possession === 'Ready To Move' ? 'ready_to_move' : 'under_construction',
      possessionStatus: possession === 'Ready To Move' ? 'immediate' : pick(['within_3_months', 'within_6_months', 'within_1_year']),
      rera: true,
      reraId: `HRERA-${rand(10000, 99999)}`,
      featured,
      luxury: project.luxury,
      listingCategory: listingCategory(project, typeKey, price),
      bedrooms: cfg.beds,
      bathrooms: cfg.baths,
      description: `Premium ${cfg.config} ${typeLabel(typeKey).toLowerCase()} at ${project.name} by ${project.builder} in ${project.locality}, ${project.sector}. Strategically located with excellent connectivity, modern amenities, and RERA-approved development. Ideal for end-use and investment in Gurgaon's thriving real estate market.`,
      amenities,
      images,
      coordinates: coords,
      nearbySchools: pickN(SCHOOLS, 3).map((n) => `${n} (${rand(1, 5)}.${rand(0, 9)} km)`),
      nearbyHospitals: pickN(HOSPITALS, 2).map((n) => `${n} (${rand(2, 8)}.${rand(0, 9)} km)`),
      nearbyMetroStations: pickN(METROS, 2).map((n) => `${n} (${rand(1, 6)}.${rand(0, 9)} km)`),
      highlights: pickN([
        'RERA Approved', 'Premium Location', 'High ROI Potential', 'Green Surroundings',
        'Gated Community', 'Vastu Compliant', 'Corner Unit', 'Park Facing',
        'Metro Connectivity', 'Builder Reputation', 'Ready to Move', 'New Launch',
      ], rand(3, 5)),
      address: `${project.name}, ${project.sector}, ${project.locality}`,
      isVerified: true,
      hasVideoTour: rand(0, 1) === 1,
      postedBy: 'Durga Property',
      furnishing: pick(['fully_furnished', 'semi_furnished', 'unfurnished']),
      facing: pick(['north', 'south', 'east', 'west']),
    })
  }
}

mkdirSync(OUT, { recursive: true })
writeFileSync(join(OUT, 'localities.json'), JSON.stringify(LOCALITIES, null, 2))
writeFileSync(join(OUT, 'builders.json'), JSON.stringify(BUILDERS, null, 2))
writeFileSync(join(OUT, 'properties.json'), JSON.stringify(properties))

console.log(`Generated ${properties.length} properties, ${BUILDERS.length} builders, ${LOCALITIES.length} localities`)
