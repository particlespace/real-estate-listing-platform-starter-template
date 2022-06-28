import {
  SimpleGrid,
  ScrollArea
} from '@mantine/core';
import {useState} from 'react';
import {Listing} from './Listing/Listing';
import PropertyDetailView from '../PropertyDetailView/PropertyDetailView';
import data from '../../data/proptertyData.json';
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
    date: string;
    type: string;
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

export function Sidebar() {
    const [isOpen, setOpen] = useState(false);
    const listings = data.map((property: IPropertyData) => {
        const {
            images,
            estimate_list_sell_price: price,
            address: {
                address,
                city,
                state,
                zipcode
            },
        } = property;
        const propertyAddress = `${address}, ${city}, ${state} ${zipcode}`;
        return (
            <div>
                <Listing
                    sold={false}
                    image={images[0]}
                    address={propertyAddress}
                    price={price}
                    setOpen={setOpen}
                />
            </div>
        )
    })

    return (
        <ScrollArea
            sx={{
                height: 'calc(100vh - 72px)',
            }}
        >
            <PropertyDetailView
              isOpen={isOpen}
              setOpen={setOpen}
            />
            <SimpleGrid cols={2} spacing='xl' breakpoints={[{maxWidth: 1600, cols: 1, spacing: 'xl'}]}>
              {listings}
            </SimpleGrid>
        </ScrollArea>
    )
}
