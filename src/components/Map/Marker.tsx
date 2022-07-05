import React, {
  useCallback,
  useState
} from 'react';
import './Marker.css';
import qs from "qs";
import
  axios, {
  AxiosError,
  AxiosResponse
} from "axios";
import {IJsonPropertyData, IPropertyData} from "../Sidebar/Sidebar";
import PropertyDetailView from "../PropertyDetailView/PropertyDetailView";
import { PropertyQuery } from "../Listing/Listing";
import {
  SetPropertyData,
  SetMarkerClicked
} from "../../App";
import {searchProperty} from "../../apiOperations";

/**
 * Configure property query for use
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export interface IMarker {
  color: string;
  name: string;
  text: string;
  id: string | number;
  lat: number;
  lng: number;
  propertyData: IPropertyData;
  property: IJsonPropertyData;
  setPropertyData: SetPropertyData;
}

export const Marker = (props: IMarker) => {
  const {
    color,
    name,
    text,
    propertyData,
    setPropertyData,
    property,
  } = props;
  const [
    isOpen,
    setOpen
  ] = useState(false);
  const [
    isLoading,
    setLoading
  ] = useState(false);
  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    const box: HTMLDivElement = event.currentTarget;
      box.style.backgroundColor = "#000a3d";
  };
  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const box: HTMLDivElement = event.currentTarget;
      box.style.backgroundColor = "#0078ff";
  };

  const {
    address
  } = property;

  const handleOnClick = useCallback(async () => {
    setLoading(true);
    setOpen(true);
    const property = await searchProperty(address)
    console.log(propertyData.address)
    setPropertyData(property);
    setLoading(false);
  }, [
    address,
    propertyData,
    setPropertyData
  ]);

  return (
    <div>
      <PropertyDetailView
        isOpen={isOpen}
        isLoading={isLoading}
        setOpen={setOpen}
        propertyData={propertyData}
        setPropertyData={setPropertyData}
      />
      <div
        className="marker bounce"
        style={{
          backgroundColor: color,
          cursor: 'pointer'
        }}
        title={name}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onClick={handleOnClick}
      />
      <div className='textbox'>
        {text}
      </div>
    </div>
  );
};
