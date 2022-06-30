import GoogleMapReact from 'google-map-react';
import {
  useState
} from 'react';
import { Marker } from './Marker';
import { IPropertyData } from '../Sidebar/Sidebar';
import data from '../../data/proptertyData.json';

export default function Map() {
  const [center, setCenter] = useState<any>({
    lat: 39.092306123688125,
    lng: -94.58670048764,
  });
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
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY||'',
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
        {data.map((property: IPropertyData) =>(
          <Marker
            key={property.longitude}
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
