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

export interface IMapProps {
  propertyData: IPropertyData
}


export default function Map({ propertyData }: IMapProps) {
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
            key={property.longitude}
            id={property.estimateListSellPrice}
            color="blue"
            lat={property.latitude}
            lng={property.longitude}
            name={'test property'}
            text={property.estimateListSellPrice.toString()}
            propertyData={propertyData}
          />
        ))}
        </GoogleMapReact>
    </div>
  );
}
