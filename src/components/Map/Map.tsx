import GoogleMapReact from 'google-map-react';
import {
  useState
} from 'react';
import { Marker } from './Marker';
import {
  IJsonPropertyData,
  IPropertyData
} from '../Sidebar/Sidebar';
import data from '../../data/proptertyData.json';
import {
  SetPropertyData,
} from "../../App";

export interface IMapProps {
  propertyData: IPropertyData;
  setPropertyData: SetPropertyData;
}

const roundNumber = (price: number) => {
  const roundTo =
    price <= 999999
      ? 1000
      : price <= 999999999
        ? 1000000
        : 1000000000
  return Math.round(price/roundTo) * roundTo
}

const formatPrice = (price: number) => {
  const roundedNumber = roundNumber(price)
  const priceString = roundedNumber.toString();
  const priceLength = priceString.length;
  const formatNumberVariables =
    priceLength <= 6
      ? {
          numberOfDigitsToRemove: 3,
          endLabel: 'K'
        }
      : priceLength <= 9
        ? {
            numberOfDigitsToRemove: 6,
            endLabel: 'M'
          }
        : {
            numberOfDigitsToRemove: 9,
            endLabel: 'B'
          }
  const {
    numberOfDigitsToRemove,
    endLabel
  } = formatNumberVariables;
  return priceString.slice(0, priceLength - numberOfDigitsToRemove) + endLabel;
}

export default function Map({
  propertyData,
  setPropertyData,
}: IMapProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [center, setCenter] = useState<any>({
    lat: 39.092306123688125,
    lng: -94.58670048764,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [zoom, setZoom] = useState<number>(9);

  return (
    <div
      style={{
        height: 'calc(100vh - 72px)',
        width: '100%'
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
          language: 'en',
        }}
        defaultCenter={{
          lat: -34.397,
          lng: 150.644
        }}
        center={center}
        defaultZoom={8}
        zoom={zoom}
        >
        {data.map((property: IJsonPropertyData) =>(
          <Marker
            id={property.address.address}
            key={property.longitude}
            property={property}
            color="blue"
            lat={property.latitude}
            lng={property.longitude}
            name={'test property'}
            text={'$' + formatPrice(property.estimateListSellPrice)}
            propertyData={propertyData}
            setPropertyData={setPropertyData}
          />
        ))}
        </GoogleMapReact>
    </div>
  );
}
