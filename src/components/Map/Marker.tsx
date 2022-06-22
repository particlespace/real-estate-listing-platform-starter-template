import React from 'react';
import './Marker.css';

export const Marker = (props: any) => {
    const { color, name, text, id } = props;
    return (
        <div>
            <div className="marker bounce"
                style={{ backgroundColor: color, cursor: 'pointer'}}
                title={name} >
            </div>
            <div className='text'>
                {text}
            </div>
        </div>

    );
  };
