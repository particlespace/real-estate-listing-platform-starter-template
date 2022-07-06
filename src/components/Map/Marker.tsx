import React, {
  useCallback,
  useState
} from 'react';
import './Marker.css';
import {
  IJsonPropertyData,
  IPropertyData
} from "../Sidebar/Sidebar";
import PropertyDetailView from "../PropertyDetailView/PropertyDetailView";
import { SetPropertyData } from "../../App";
import { searchProperty } from "../../apiOperations";

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
