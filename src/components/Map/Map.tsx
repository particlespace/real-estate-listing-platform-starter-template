import GoogleMapReact from 'google-map-react';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Marker} from './Marker';
import data from '../../data/proptertyData.json';
import {Listing} from "../Listing/Listing";
export interface Address {
  address: string;
  city:    string;
  state:   string;
  zipcode: string;
}

export interface Property {
  lot_size_ft: number | null;
  acreage: number | string | null;
  building_size: number | null;
  beds: string | null;
  baths: string | null;
  year_built: string | null;
  heating: string | null;
  cooling: string | null;
  type: string | null;
  garage_size: string | null;
  material: string | null;
  roof: string | null;
  builder: string | null;
  flooring: string | null;
  interior_features: string | null;
  appliances: string | null;
  parking: string | null;
  annual_tax: string | number | null;
  available: string | null;
  hoa_fee: string | number | null;
  services_included: string | null;
  amenities_included: string | null;
  basement: string | null;
  window_features: string | null;
  patio_details: string | null;
}

export interface OpenHouse {
  date: string;
  time: string;
}

export interface History {
  type: string;
  date: string;
  description: string;
}

export interface ConfidenceMessage {
  message: string;
  type: string;
}

export interface IPropertyData {
  estimate_list_sell_price: number;
  last_list_or_sold_price:  number;
  last_sold_date:           string;
  classification:           string;
  address:                  Address;
  property:                 Property;
  neighborhood_median:      number;
  open_houses:              OpenHouse[] | null;
  history:                  History[];
  images:                   string[];
  sources:                  number;
  confidence:               number;
  confidence_messages:      ConfidenceMessage[];
  longitude:                number;
  latitude:                 number;
}

export default function Map() {
  const [center, setCenter] = useState<any>({
    lat: 39.092306123688125,
    lng: -94.58670048764,
  });
  const [zoom, setZoom] = useState<number>(9);

  return (
    <div style={{ height: 'calc(100vh - 72px)', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY||'',
          language: 'en',
        }}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        center={center}
        defaultZoom={8}
        zoom={zoom}
        >
        {data.map((property: IPropertyData) =>(
            <Marker
              id={property.estimate_list_sell_price}
              color="blue"
              lat={property.latitude}
              lng={property.longitude}
              name={'test property'}
              text={property.estimate_list_sell_price.toString()}
              propertyData={property}
              />
          ))}
        </GoogleMapReact>
    </div>
  );
}
