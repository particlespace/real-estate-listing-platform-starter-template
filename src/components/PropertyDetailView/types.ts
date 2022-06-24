export type ConfidenceMessage = {
  message: string,
  type: string
}

export type GeneralConstants = {
  classification?: string,
  confidence: number,
  estimate_list_sell_price: number,
  last_sold_date: string,
  neighborhood_median: number,
  sources: number;
}

export type PropertyDetails = {
  acreage?: number
  amenities_included?: string
  annual_tax?: string
  appliances?: string
  available?: string
  basement?: string
  baths?: number
  beds?: number
  builder?: string
  building_size?: string
  cooling?: string
  flooring?: string
  garage_size?: string
  heating?: string
  hoa_fee?: string
  interior_features?: string
  lot_size_ft?: string
  material?: string
  parking?: string
  patio_details?: string
  roof?: string
  services_included?: string
  type?: string
  window_features?: string
  year_built?: string
}

export type RequestData = GeneralConstants & {
  address: {
    address_number: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
  };
  history: Array<any>;
  images: Array<string>;
  property: PropertyDetails;
  confidence_messages: Array<ConfidenceMessage>,
  open_houses: {date: string; time: string;}[],
  units: any[]
};

