import { Mark } from '@mantine/core';
import GoogleMapReact from 'google-map-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {Marker} from './Marker';


export default function Map() {
  const [geocoder, setGeocoder] = useState<any>(null);

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
          <Marker
            lat={39.092306123688125}
            lng={-94.58670048764}
            name="My Marker"
            color="blue"
            text='$123k'
          />
        </GoogleMapReact>
    </div>
  );
}