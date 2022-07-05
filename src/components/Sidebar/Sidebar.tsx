import {
  SimpleGrid,
  ScrollArea
} from '@mantine/core';
import { Listing } from '../Listing/Listing';
import data from '../../data/proptertyData.json';
import { SetPropertyData } from "../../App";

export interface IAddress {
  address: string;
  city:    string;
  state:   string;
  zipcode: string;
}

export interface IProperty {
  lot_size_ft:        number | null;
  acreage:            number | string | null;
  building_size:      number | null;
  beds:               string | null;
  baths:              string | null;
  year_built:         string | null;
  heating:            string | null;
  cooling:            string | null;
  type:               string | null;
  garage_size:        string | null;
  material:           string | null;
  roof:               string | null;
  builder:            string | null;
  flooring:           string | null;
  interior_features:  string | null;
  appliances:         string | null;
  parking:            string | null;
  annual_tax:         string | number | null;
  available:          string | null;
  hoa_fee:            string | number | null;
  services_included:  string | null;
  amenities_included: string | null;
  basement:           string | null;
  window_features:    string | null;
  patio_details:      string | null;
}

export interface IOpenHouse {
  date: string;
  time: string;
}

export interface IHistory {
  type:        string;
  date:        string;
  description: string;
}

export interface IConfidenceMessage {
  message: string;
  type:    string;
}

export interface IPropertyData {
  estimate_list_sell_price: number;
  last_list_or_sold_price:  number;
  longitude:                number;
  latitude:                 number;
  last_sold_date:           string;
  classification:           string;
  address:                  IAddress;
  property:                 IProperty;
  neighborhood_median:      number;
  open_houses:              IOpenHouse[] | null;
  history:                  IHistory[];
  images:                   string[];
  sources:                  number;
  confidence:               number;
  confidence_messages:      IConfidenceMessage[];
}

export interface IAddress {
  address: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface IJsonPropertyData {
  longitude: number;
  latitude: number
  image: string;
  estimateListSellPrice: number | string;
  sold: boolean;
  address: IAddress;
}

export interface ISideBarProps {
  setPropertyData: SetPropertyData;
  propertyData: IPropertyData;
}

export function Sidebar({
  setPropertyData,
  propertyData
}: ISideBarProps) {
  const listings = data.map((property: IJsonPropertyData) => {
    const {
        image,
    } = property;
    return (
      <Listing
        key={image}
        property={property}
        propertyData={propertyData}
        setPropertyData={setPropertyData}
      />
    )
  })

  return (
    <ScrollArea
      sx={{
        height: 'calc(100vh - 72px)',
      }}
    >
      <SimpleGrid
        cols={2}
        spacing='xl'
        breakpoints={[{
          maxWidth: 1600,
          cols: 1,
          spacing: 'xl'
        }]}
      >
        {listings}
      </SimpleGrid>
    </ScrollArea>
  )
}
