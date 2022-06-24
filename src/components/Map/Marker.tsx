import React from 'react';
import './Marker.css';

export const Marker = (props: any) => {
    const { color, name, text, id } = props;

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
            <div className="marker bounce"
                style={{ backgroundColor: color, cursor: 'pointer'}}
                title={name}
                onMouseEnter={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                >
            </div>
            <div className='textbox'>
                {text}
            </div>
        </div>

    );
  };
