import React from 'react';
import {
  Header,
  HeaderProps,
} from './components/Header/Header';
import {
  Center,
  Group,
} from '@mantine/core';
import  Footer  from './components/Footer/Footer';
import { HEADER_HEIGHT } from './components/Header/styles';
import './App.css';

import Map from './components/Map/Map';
import {Address, Sidebar} from './components/Sidebar/Sidebar';
import data from "./data/proptertyData.json";

const links: HeaderProps['links'] = [
  {
    link: '/home',
    label: 'Home'
  }
]

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
}

function App() {
  const map = data.map((property: IPropertyData) => {
    return (
        <Map
          propertyData={property}
        />
    )
  })
  return (
    <div className="App">
      <Header links={links} />
      <Group
        sx={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <Center
          sx={{
              height: '100%',
              width: '750px',
              '@media (max-width: 1600px)': {
                  width: '375px'
              },
          }}
        >
          <Sidebar />
        </Center>
        <Center
          sx={{
              height: '100%',
              width: 'calc(99% - 750px)',
              '@media (max-width: 1600px)': {
                  width: 'calc(97% - 375px)'
              },
          }}
          >
          {map}
        </Center>
      </Group>
      <Footer />
    </div>
  );
}

export default App;

