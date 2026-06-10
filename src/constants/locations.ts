export const MARKETPLACE_LOCALITIES = [
  'Old Gurgaon',
  'New Gurgaon',
  'Golf Course Road',
  'Golf Course Extension Road',
  'Dwarka Expressway',
  'SPR Road',
  'Sohna Road',
  'Palam Vihar',
  'Civil Lines',
  'South City',
  'Sushant Lok',
  'DLF Phase 1',
  'DLF Phase 2',
  'DLF Phase 3',
  'DLF Phase 4',
  'DLF Phase 5',
]

export const TRENDING_LOCATIONS = MARKETPLACE_LOCALITIES.map((l) => `${l}, Gurgaon`)

export const GURGAON_LOCALITIES = [...MARKETPLACE_LOCALITIES]

export const GURGAON_SECTORS = [
  'Sector 2', 'Sector 4', 'Sector 5', 'Sector 7', 'Sector 9', 'Sector 9A',
  'Sector 10', 'Sector 10A', 'Sector 12', 'Sector 12A', 'Sector 14', 'Sector 15',
  'Sector 17', 'Sector 21', 'Sector 21A', 'Sector 22', 'Sector 23', 'Sector 37D',
  'Sector 42', 'Sector 49', 'Sector 53', 'Sector 54', 'Sector 57', 'Sector 59',
  'Sector 61', 'Sector 62', 'Sector 63A', 'Sector 65', 'Sector 67', 'Sector 71',
  'Sector 72', 'Sector 76', 'Sector 77', 'Sector 79', 'Sector 80', 'Sector 81',
  'Sector 85', 'Sector 89', 'Sector 95A', 'Sector 102', 'Sector 103', 'Sector 104',
  'Sector 106', 'Sector 108', 'Sector 111', 'Sector 112', 'Sector 113',
  'Palam Vihar', 'Civil Lines', 'New Colony',
]

import { STATIC_PROPERTY_COUNT } from '@/data/localData'

export const PLATFORM_STATS = {
  totalProperties: `${STATIC_PROPERTY_COUNT}+`,
  activeBuyers: '8,200+',
  happyFamilies: '3,400+',
  citiesCovered: '1',
}

export const POSSESSION_YEARS = ['2025', '2026', '2027', '2028', '2029']
