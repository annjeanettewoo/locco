import type { OneMapResult } from "@/types";

export const knownLocations: OneMapResult[] = [
  {
    name: "Orchard MRT",
    address: "Orchard Road, Singapore",
    postal: "238882",
    latitude: 1.30398,
    longitude: 103.83225
  },
  {
    name: "Somerset MRT",
    address: "Somerset Road, Singapore",
    postal: "238162",
    latitude: 1.30068,
    longitude: 103.8395
  },
  {
    name: "313 Somerset",
    address: "313 Orchard Road, Singapore 238895",
    postal: "238895",
    latitude: 1.30131,
    longitude: 103.83846
  },
  {
    name: "Tanjong Pagar MRT",
    address: "Tanjong Pagar, Singapore",
    postal: "078884",
    latitude: 1.27639,
    longitude: 103.84575
  },
  {
    name: "Bugis MRT",
    address: "Bugis, Singapore",
    postal: "188024",
    latitude: 1.30089,
    longitude: 103.85609
  },
  {
    name: "Chinatown MRT",
    address: "Chinatown, Singapore",
    postal: "059443",
    latitude: 1.28436,
    longitude: 103.84331
  },
  {
    name: "Holland Village MRT",
    address: "Holland Village, Singapore",
    postal: "278995",
    latitude: 1.3112,
    longitude: 103.79633
  },
  {
    name: "Serangoon MRT",
    address: "Serangoon, Singapore",
    postal: "556083",
    latitude: 1.35053,
    longitude: 103.87239
  },
  {
    name: "Tampines MRT",
    address: "Tampines, Singapore",
    postal: "529538",
    latitude: 1.35339,
    longitude: 103.9457
  }
];

export function searchKnownLocations(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return knownLocations.filter((location) => {
    const haystack = `${location.name} ${location.address} ${location.postal ?? ""}`.toLowerCase();
    return haystack.includes(normalized) || normalized.includes(location.name.toLowerCase().replace(" mrt", ""));
  });
}

export async function searchOneMap(query: string): Promise<OneMapResult[]> {
  const url = new URL("https://www.onemap.gov.sg/api/common/elastic/search");
  url.searchParams.set("searchVal", query);
  url.searchParams.set("returnGeom", "Y");
  url.searchParams.set("getAddrDetails", "Y");
  url.searchParams.set("pageNum", "1");

  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error(`OneMap search failed with ${response.status}`);
  }

  const payload = (await response.json()) as {
    results?: Array<{
      SEARCHVAL?: string;
      ADDRESS?: string;
      POSTAL?: string;
      LATITUDE?: string;
      LONGITUDE?: string;
    }>;
  };

  return (payload.results ?? [])
    .filter((result) => result.LATITUDE && result.LONGITUDE)
    .map((result) => ({
      name: result.SEARCHVAL ?? result.ADDRESS ?? query,
      address: result.ADDRESS ?? "",
      postal: result.POSTAL,
      latitude: Number(result.LATITUDE),
      longitude: Number(result.LONGITUDE)
    }));
}
