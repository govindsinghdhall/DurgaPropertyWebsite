export type MapCategory = "residential" | "commercial";

export type MapType =
  | "sectors"
  | "colonies"
  | "plots"
  | "markets"
  | "booths"
  | "sco";

export interface MapItem {
  id: string;
  name: string;
  slug: string;
  category: MapCategory;
  type: MapType;
  sector: string;
  image: string;
  description: string;
  alt: string;
}

export interface SectorMapCollection {
  sector: string;
  residential: MapItem[];
  commercial: MapItem[];
}

/*
 * ============================================================
 * GURUGRAM SECTORS
 * ============================================================
 */

const gurugramSectorNumbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
  71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
  81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
  91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
  101, 102, 103, 104, 105, 106, 107, 108, 109,
  110, 111, 112, 113, 114, 115,
];

const gurugramSectorSuffixes = [
  "57A",
  "58A",
  "59A",
  "60A",
  "61A",
  "62A",
  "63A",
  "64A",
  "65A",
  "66A",
  "67A",
  "70A",
  "71A",
  "72A",
  "73A",
  "74A",
  "75A",
  "100A",
  "101A",
  "102A",
  "110A",
  "114A",
];

/*
 * ============================================================
 * SORT GURUGRAM SECTORS
 * ============================================================
 *
 * Correct ordering:
 *
 * 1
 * 2
 * 3
 * 4
 * 5
 * ...
 * 57
 * 57A
 * 58
 * 58A
 * ...
 * 100
 * 100A
 * 101
 * 101A
 * ...
 * 114
 * 114A
 * 115
 */

export const gurugramSectorNames = [
  ...gurugramSectorNumbers.map(String),
  ...gurugramSectorSuffixes,
].sort((a, b) => {
  const aNum = parseInt(a, 10);
  const bNum = parseInt(b, 10);

  if (aNum !== bNum) {
    return aNum - bNum;
  }

  /*
   * Numeric sector comes before suffix sector.
   *
   * Example:
   *
   * 57
   * 57A
   */

  if (a.length !== b.length) {
    return a.length - b.length;
  }

  return a.localeCompare(b);
});

/*
 * ============================================================
 * MAP CREATION HELPER
 * ============================================================
 */

const createMap = ({
  id,
  name,
  slug,
  category,
  sector,
  image,
  description,
  alt,
  type = "sectors",
}: {
  id: string;
  name: string;
  slug: string;
  category: MapCategory;
  sector: string;
  image: string;
  description: string;
  alt: string;
  type?: MapType;
}): MapItem => ({
  id,
  name,
  slug,
  category,
  sector,
  image,
  description,
  alt,
  type,
});

/*
 * ============================================================
 * RESIDENTIAL SECTOR MAPS
 * ============================================================
 *
 * Add every residential sector map inside the correct sector.
 *
 * IMPORTANT:
 *
 * A sector can have multiple residential maps.
 *
 * Example:
 *
 * "4": [
 *   map 1,
 *   map 2,
 *   map 3,
 * ]
 *
 * The sector position is controlled by gurugramSectorNames,
 * NOT by the order in this object.
 *
 * Therefore adding a new map to Sector 4 will never move
 * Sector 4 to the bottom of the website.
 */

const residentialSectorMaps: Record<string, MapItem[]> = {
  /*
   * ==========================================================
   * SECTOR 4
   * ==========================================================
   */

  "4": [
    createMap({
      id: "residential-sector-4-1",
      name: "Gurugram Sector 4 Map",
      slug: "gurugram-sector-4-map",
      category: "residential",
      sector: "4",
      type: "sectors",
      image:
        "/images/maps/residential/gurugram-sector-4-map.webp",
      description:
        "Detailed Gurugram Sector 4 residential map showing the sector layout, roads, plots, parks and surrounding areas.",
      alt: "Gurugram Sector 4 residential map",
    }),
  ],

  /*
   * ==========================================================
   * SECTOR 9
   * ==========================================================
   *
   * Add the Sector 9 residential map(s) here when available.
   */

  "9": [
    // Add Sector 9 residential maps here.
  ],

  /*
   * ==========================================================
   * SECTOR 9A
   * ==========================================================
   */

  "9A": [
    // Add Sector 9A residential maps here.
  ],
};

/*
 * ============================================================
 * COMMERCIAL SECTOR MAPS
 * ============================================================
 *
 * A sector can have multiple commercial maps.
 */

const commercialSectorMaps: Record<string, MapItem[]> = {
  /*
   * ==========================================================
   * SECTOR 4
   * ==========================================================
   */

  "4": [
    createMap({
      id: "commercial-sector-4-1",
      name: "Gurugram Sector 4 Commercial Map",
      slug: "gurugram-sector-4-commercial-map",
      category: "commercial",
      sector: "4",
      type: "sectors",
      image:
        "/images/maps/commercial/gurugram-sector-4-commercial-map.png",
      description:
        "Detailed commercial map of Gurugram Sector 4 showing commercial areas, shopping areas and surrounding locations.",
      alt: "Gurugram Sector 4 commercial map",
    }),
  ],

  /*
   * ==========================================================
   * SECTOR 9
   * ==========================================================
   */

  "9": [
    createMap({
      id: "commercial-sector-9-1",
      name: "Gurugram Sector 9 Commercial Map",
      slug: "gurugram-sector-9-commercial-map",
      category: "commercial",
      sector: "9",
      type: "sectors",
      image:
        "/images/maps/commercial/gurugram-sector-9-commercial-map.png",
      description:
        "Detailed commercial map of Gurugram Sector 9 showing commercial areas, shopping areas and surrounding locations.",
      alt: "Gurugram Sector 9 commercial map",
    }),
  ],

  /*
   * ==========================================================
   * SECTOR 9A
   * ==========================================================
   */

  "9A": [
    createMap({
      id: "commercial-sector-9a-1",
      name: "Gurugram Sector 9A Commercial Map",
      slug: "gurugram-sector-9a-commercial-map",
      category: "commercial",
      sector: "9A",
      type: "sectors",
      image:
        "/images/maps/commercial/gurugram-sector-9a-commercial-map.webp",
      description:
        "Detailed commercial map of Gurugram Sector 9A showing commercial areas, shopping areas and surrounding locations.",
      alt: "Gurugram Sector 9A commercial map",
    }),
  ],
};

/*
 * ============================================================
 * OTHER RESIDENTIAL MAP TYPES
 * ============================================================
 *
 * These are separate from sector maps.
 */

const residentialColonyMaps: MapItem[] = [];

const residentialPlotMaps: MapItem[] = [];

/*
 * ============================================================
 * OTHER COMMERCIAL MAP TYPES
 * ============================================================
 *
 * Markets
 * Booths
 * SCO
 *
 * Add maps here when their images are ready.
 */

const commercialMarketMaps: MapItem[] = [];

const commercialBoothMaps: MapItem[] = [];

const commercialScoMaps: MapItem[] = [];

/*
 * ============================================================
 * MASTER SECTOR OBJECTS
 * ============================================================
 *
 * Every Gurugram sector gets exactly ONE sector object.
 *
 * Each sector contains:
 *
 * residential: MapItem[]
 * commercial: MapItem[]
 *
 * This allows:
 *
 * Sector 4
 * ├── residential
 * │   ├── map 1
 * │   └── map 2
 * │
 * └── commercial
 *     ├── map 1
 *     └── map 2
 *
 * The sector order comes from gurugramSectorNames.
 */

export const gurugramSectorMaps: SectorMapCollection[] =
  gurugramSectorNames.map((sector) => ({
    sector,

    residential:
      residentialSectorMaps[sector] ?? [],

    commercial:
      commercialSectorMaps[sector] ?? [],
  }));

/*
 * ============================================================
 * ALL MAPS - FLAT LIST
 * ============================================================
 *
 * Useful for:
 *
 * - Sitemap
 * - Search
 * - Slug lookup
 * - Individual map pages
 *
 * Sector maps are generated from gurugramSectorMaps first,
 * so their sector ordering is preserved.
 */

export const gurugramMaps: MapItem[] = [
  ...gurugramSectorMaps.flatMap((sector) => [
    ...sector.residential,
    ...sector.commercial,
  ]),

  ...residentialColonyMaps,
  ...residentialPlotMaps,

  ...commercialMarketMaps,
  ...commercialBoothMaps,
  ...commercialScoMaps,
];

/*
 * ============================================================
 * PUBLISHED RESIDENTIAL MAPS
 * ============================================================
 */

export const publishedResidentialMaps: MapItem[] = [
  ...gurugramSectorMaps.flatMap(
    (sector) => sector.residential,
  ),

  ...residentialColonyMaps,
  ...residentialPlotMaps,
];

/*
 * ============================================================
 * PUBLISHED COMMERCIAL MAPS
 * ============================================================
 */

export const publishedCommercialMaps: MapItem[] = [
  ...gurugramSectorMaps.flatMap(
    (sector) => sector.commercial,
  ),

  ...commercialMarketMaps,
  ...commercialBoothMaps,
  ...commercialScoMaps,
];

/*
 * ============================================================
 * PUBLISHED RESIDENTIAL SECTOR MAPS
 * ============================================================
 */

export const publishedResidentialSectorMaps: MapItem[] =
  publishedResidentialMaps.filter(
    (map) => map.type === "sectors",
  );

/*
 * ============================================================
 * PUBLISHED RESIDENTIAL COLONY MAPS
 * ============================================================
 */

export const publishedResidentialColonyMaps: MapItem[] =
  publishedResidentialMaps.filter(
    (map) => map.type === "colonies",
  );

/*
 * ============================================================
 * PUBLISHED RESIDENTIAL PLOT MAPS
 * ============================================================
 */

export const publishedResidentialPlotMaps: MapItem[] =
  publishedResidentialMaps.filter(
    (map) => map.type === "plots",
  );

/*
 * ============================================================
 * PUBLISHED COMMERCIAL SECTOR MAPS
 * ============================================================
 */

export const publishedCommercialSectorMaps: MapItem[] =
  publishedCommercialMaps.filter(
    (map) => map.type === "sectors",
  );

/*
 * ============================================================
 * PUBLISHED COMMERCIAL MARKET MAPS
 * ============================================================
 *
 * Required by:
 *
 * CommercialMarketsMapsPage.tsx
 */

export const publishedCommercialMarketMaps: MapItem[] =
  publishedCommercialMaps.filter(
    (map) => map.type === "markets",
  );

/*
 * ============================================================
 * PUBLISHED COMMERCIAL BOOTH MAPS
 * ============================================================
 */

export const publishedCommercialBoothMaps: MapItem[] =
  publishedCommercialMaps.filter(
    (map) => map.type === "booths",
  );

/*
 * ============================================================
 * PUBLISHED COMMERCIAL SCO MAPS
 * ============================================================
 */

export const publishedCommercialScoMaps: MapItem[] =
  publishedCommercialMaps.filter(
    (map) => map.type === "sco",
  );

/*
 * ============================================================
 * RESIDENTIAL SECTOR RECORDS
 * ============================================================
 *
 * Every sector is included, even when it has no map yet.
 */

export const residentialSectorMapRecords =
  gurugramSectorMaps.map((sector) => ({
    sector: sector.sector,
    maps: sector.residential,
  }));

/*
 * ============================================================
 * COMMERCIAL SECTOR RECORDS
 * ============================================================
 *
 * Every sector is included, even when it has no map yet.
 */

export const commercialSectorMapRecords =
  gurugramSectorMaps.map((sector) => ({
    sector: sector.sector,
    maps: sector.commercial,
  }));

/*
 * ============================================================
 * GET COMPLETE SECTOR
 * ============================================================
 */

export const getGurugramSectorMaps = (
  sector: string,
): SectorMapCollection | undefined => {
  return gurugramSectorMaps.find(
    (item) =>
      item.sector.toLowerCase() ===
      sector.toLowerCase(),
  );
};

/*
 * ============================================================
 * GET RESIDENTIAL MAPS FOR SECTOR
 * ============================================================
 */

export const getResidentialSectorMaps = (
  sector: string,
): MapItem[] => {
  return (
    getGurugramSectorMaps(sector)
      ?.residential ?? []
  );
};

/*
 * ============================================================
 * GET COMMERCIAL MAPS FOR SECTOR
 * ============================================================
 */

export const getCommercialSectorMaps = (
  sector: string,
): MapItem[] => {
  return (
    getGurugramSectorMaps(sector)
      ?.commercial ?? []
  );
};

/*
 * ============================================================
 * GET MAP BY SLUG
 * ============================================================
 */

export const getMapBySlug = (
  slug: string,
): MapItem | undefined => {
  return gurugramMaps.find(
    (map) => map.slug === slug,
  );
};