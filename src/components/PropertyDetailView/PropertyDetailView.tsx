import {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Modal,
  Stack,
  Title
} from '@mantine/core';
import {
  ResultContent
} from '../ResultContent/ResultContent';
import { RequestData } from './types';

interface PropertyDetailViewProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

interface AddressComponents {
  address: string
  city: string;
  state: string;
  zipcode: string;
}

interface PropertyEntry {
  id: string;
  formattedAddress: string;
  addressComponents: AddressComponents;
}

function getPropertyData({
  addressComponents: {
    address,
    city,
    state,
    zipcode,
  }
}: PropertyEntry): {data: RequestData} {

  const response = {
    data: {
      "estimate_list_sell_price": 274200,
      "last_list_or_sold_price": 250000,
      "last_sold_date": "2021-05-04",
      "classification": "single_family",
      "address": {
        "address_number": "808",
        "address": "Awesome Street,",
        "city": "Kansas City",
        "state": "MO",
        "zipcode": "64012"
      },
      "property": {
        "lot_size_ft": "6037.64",
        "acreage": undefined,
        "building_size": "2202",
        "beds": 3,
        "baths": 3,
        "year_built": "1998",
        "heating": "Forced Air",
        "cooling": "Electric",
        "type": "Single family",
        "garage_size": "2",
        "material": "Frame, Lap Siding",
        "roof": "Composition",
        "builder": undefined,
        "flooring": "Carpet",
        "interior_features": "Ceiling Fan(s), Kitchen Island, Pantry, Vaulted Ceiling",
        "appliances": "Cooktop, Dishwasher, Disposal, Dryer, Microwave, Refrigerator, Built-In Electric Oven, Stainless Steel Appliance(s), Washer",
        "parking": "Attached",
        "annual_tax": undefined,
        "available": "off-market",
        "hoa_fee": undefined,
        "services_included": undefined,
        "amenities_included": undefined,
        "basement": "Interior Entry,Partial",
        "window_features": "All Window Cover, Thermal Windows",
        "patio_details": "Deck, Patio, Porch"
      },
      "neighborhood_median": 215000,
      "open_houses": [
        {
          "date": "2022-03-13",
          "time": "12:00 PM to 5:00 PM"
        }, {
          "date": "2022-03-12",
          "time": "12:00 PM to 5:00 PM"
        },
      ],
      "history": [
        {
          "date": "2021-05-04",
          "type": "sold",
          "description": "Sold"
        }, {
          "date": "2021-05-03",
          "type": "sold",
          "description": "sold --"
        }, {
          "date": "2021-04-02",
          "type": "pending",
          "description": "pending sale $250,000$114/sqft"
        }, {
          "date": "2021-04-01",
          "type": "listed",
          "description": "listed for sale $250,000$114/sqft"
        }, {
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
        }, {
          "message": "sources do not equal the same lot size",
          "type": "lot_size_mismatch"
        }, {
          "message": "sources do not have the same last purchase date",
          "type": "last_purchase_mismatch"
        }
      ],
      "units": [],
    },
  }
  return response as { data: RequestData };
}

export default function PropertyDetailView({
  isOpen,
  setOpen
}: PropertyDetailViewProps) {
  const [propertyData, setPropertyData] = useState<RequestData | null>(null);

  const propertyDetails: PropertyEntry = {
    id: '123',
    formattedAddress: '808 Awesome Street, Kansas City, MO 64012',
    addressComponents: {
      address: '200 Main St',
      city: 'Kansas City',
      state: 'MO',
      zipcode: '64105',
    }
  }

  // Get the data initially
  useEffect(() => {
    const response = getPropertyData(propertyDetails);
    const { data } = response;
    propertyData === null && setPropertyData(data);
  })

  const handleModalClose = useCallback(() => {
    setOpen(false);
  }, [isOpen]);

  return (
    <Modal
      opened={isOpen}
      onClose={handleModalClose}
      title={(
        <Title order={2}>
          {propertyDetails.formattedAddress}
        </Title>
      )}
      size="xl"
      styles={(theme) => ({
        modal: {
          backgroundColor: theme.colors.gray[0],
        },
      })}
    >
      <Stack spacing={4}>
        {
          propertyData !== null && (
            <ResultContent
              data={propertyData}
              listingDetails={{
                salePrice: propertyData.estimate_list_sell_price,
                recentActivity: '🔥🔥🔥',
                views: 129048,
              }}
            />
          )
        }
      </Stack>
    </Modal>
  );
}
