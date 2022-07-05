import React, { useState } from 'react';
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
import { Sidebar } from './components/Sidebar/Sidebar';
import { IPropertyData } from "./components/Sidebar/Sidebar";

const links: HeaderProps['links'] = [
  {
    link: '/home',
    label: 'Home'
  }
]

export type SetPropertyData = (prevState: IPropertyData) => IPropertyData;

const mockPropertyData =  {
  "estimate_list_sell_price": 274200,
  "last_list_or_sold_price": 250000,
  "last_sold_date": "2021-05-04",
  "classification": "single_family",
  "address": {
    "address": "808 Awesome Street",
    "city": "Kansas City",
    "state": "MO",
    "zipcode": "64012"
  },
  "longitude": -94.58670048764,
  "latitude": 39.092306123688125,
  "property": {
    "lot_size_ft": 6037.64,
    "acreage": null,
    "building_size": 2202,
    "beds": "3",
    "baths": "3",
    "year_built": "1998",
    "heating": "Forced Air",
    "cooling": "Electric",
    "type": "Single family",
    "garage_size": "2",
    "material": "Frame, Lap Siding",
    "roof": "Composition",
    "builder": null,
    "flooring": "Carpet",
    "interior_features": "Ceiling Fan(s), Kitchen Island, Pantry, Vaulted Ceiling",
    "appliances": "Cooktop, Dishwasher, Disposal, Dryer, Microwave, Refrigerator, Built-In Electric Oven, Stainless Steel Appliance(s), Washer",
    "parking": "Attached",
    "annual_tax": null,
    "available": "off-market",
    "hoa_fee": null,
    "services_included": null,
    "amenities_included": null,
    "basement": "Interior Entry,Partial",
    "window_features": "All Window Cover, Thermal Windows",
    "patio_details": "Deck, Patio, Porch"
  },
  "neighborhood_median": 215000,
  "open_houses": [
    {
      "date": "2022-03-13",
      "time": "12:00 PM to 5:00 PM"
    },
    {
      "date": "2022-03-12",
      "time": "12:00 PM to 5:00 PM"
    }
  ],
  "history": [
    {
      "date": "2021-05-04",
      "type": "sold",
      "description": "Sold"
    },
    {
      "date": "2021-05-03",
      "type": "sold",
      "description": "sold --"
    },
    {
      "date": "2021-04-02",
      "type": "pending",
      "description": "pending sale $250,000$114/sqft"
    },
    {
      "date": "2021-04-01",
      "type": "listed",
      "description": "listed for sale $250,000$114/sqft"
    },
    {
      "date": "1998-06-25",
      "type": "sold",
      "description": "sold --$57/sqft"
    }
  ],
  "images": [
    "https://www.trulia.com/pictures/thumbs_6/zillowstatic/fp/b678391316b222cf783f77cb52b55435-full.webp"
  ],
  "sources": 3,
  "confidence": 0.7,
  "confidence_messages": [
    {
      "message": "sources do not equal the same amount of baths",
      "type": "baths_mismatch"
    },
    {
      "message": "sources do not equal the same lot size",
      "type": "lot_size_mismatch"
    },
    {
      "message": "sources do not have the same last purchase date",
      "type": "last_purchase_mismatch"
    }
  ]
}

function App() {
  const [propertyData, setPropertyData] = useState(mockPropertyData);

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
          <Sidebar
            // @ts-ignore some data are null
            setPropertyData={setPropertyData}
            propertyData={propertyData}
          />
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
          <Map propertyData={propertyData} />
        </Center>
      </Group>
      <Footer />
    </div>
  );
}

export default App;

