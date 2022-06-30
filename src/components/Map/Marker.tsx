import React from 'react';
import './Marker.css';

export interface IMarker {
  color: string;
  name: string;
  text: string;
  id: string | number;
  lat: number;
  lng: number;
  onClick?: () => void;
}

export const Marker = (props: IMarker) => {
  const {
    color,
    name,
    text,
  } = props;
  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    const box: HTMLDivElement = event.currentTarget;
      box.style.backgroundColor = "#000a3d";
  };
  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const box: HTMLDivElement = event.currentTarget;
      box.style.backgroundColor = "#0078ff";
  };

  return (
    <div>
      <div
        className="marker bounce"
        style={{
          backgroundColor: color,
          cursor: 'pointer'
        }}
        title={name}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      />
      <div className='textbox'>
        {text}
      </div>
    </div>
  );
};
