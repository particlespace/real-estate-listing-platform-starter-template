import React from 'react';
import './Marker.css';

export const Marker = (props: any) => {
    const { color, name, text, id } = props;

    const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
        const box: HTMLDivElement = event.currentTarget;
        box.style.backgroundColor = "green";
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        const box: HTMLDivElement = event.currentTarget;
        box.style.backgroundColor = "blue";
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
            <div className='text'>
                {text}
            </div>
        </div>

    );
  };
