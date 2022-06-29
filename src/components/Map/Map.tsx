import GoogleMapReact from 'google-map-react';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Marker} from './Marker';
import PropertyDetailView from "../PropertyDetailView/PropertyDetailView";
import qs from "qs";
import
  axios, {
  AxiosError,
  AxiosResponse
} from "axios";
import { IPropertyData } from "../Sidebar/Sidebar";

interface MapProps {
  propertyData: IPropertyData;
}
export interface PropertyQuery {
  addressNumber: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
}

/**
 * Configure property query for use
 */
const getPropertyData = (queryAddress: PropertyQuery) => {
  const {
    addressNumber,
    address,
    city,
    state,
    zipcode
  } = queryAddress;

  /**
   * Authorization header for the Particle Space API
   */
  const data = qs.stringify({
    'secret_key': process.env.REACT_APP_PARTICLE_SPACE_SECRET_KEY,
    'publish_key': process.env.REACT_APP_PARTICLE_SPACE_PUBLISH_KEY,
  });
  const authorizationConfig = {
    method: 'post',
    url: 'https://api.particlespace.com/api/v1/authenticate',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };

  axios(authorizationConfig)
    .then(function (response: AxiosResponse) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error: AxiosError) {
      console.log(error);
    });

  /**
   * Particle Space search API
   */
  const searchConfig = {
    method: 'get',
    url: `https://api.particlespace.com/api/v1/property/search?address=${addressNumber} ${address}&city=${city}&state=${state}&zipcode=${zipcode}`,
    headers: {
      'Authorization': 'Bearer ' + process.env.BEARER_TOKEN
    }
  };

  axios(searchConfig)
    .then(function (response: AxiosResponse) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error: AxiosError) {
      console.log(error);
    });
}

export default function Map({
  propertyData
}: MapProps) {

  const [isOpen, setOpen] = useState(false);

  const [center, setCenter] = useState<any>({
    lat: 39.092306123688125,
    lng: -94.58670048764,
  });
  const [zoom, setZoom] = useState<number>(9);
  const locations = [
    {name: "test1", price: '$789839kk', lat: 39.092306123688125, lng: -94.58670048764},
    {name: "test2", price: '$274', lat: 39.092306123688125, lng: -94.6765678}
  ]
const handleOnClick = useCallback(() => {
  setOpen(true);
  console.log(isOpen)
}, [setOpen]);

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
        <PropertyDetailView
          isOpen={isOpen}
          setOpen={setOpen}
          propertyData={propertyData}
        />
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
