import GoogleMapReact from 'google-map-react';
import {
  useMemo,
  useState
} from 'react';
import { Marker } from './Marker';


export default function Map() {

  const [center, setCenter] = useState<any>({
    lat: 39.092306123688125,
    lng: -94.58670048764,
  });
  const [zoom, setZoom] = useState<number>(9);
  const locations = [
    {
      name: "test1",
      price: '$123k',
      lat: 39.092306123688125,
      lng: -94.58670048764
    },
    {
      name: "test2",
      price: '$255k',
      lat: 39.092306123688125,
      lng: -94.6765678
    }
  ]
  const handleOnClick = () => {
    console.log('handle marker click')
  }
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
          {locations.map((item) =>(
            <Marker
              id={item.name}
              color="blue"
              lat={item.lat}
              lng={item.lng}
              name={item.name}
              text={item.price}
              onClick={handleOnClick}
              />
          ))}
        </GoogleMapReact>
    </div>
  );
}
