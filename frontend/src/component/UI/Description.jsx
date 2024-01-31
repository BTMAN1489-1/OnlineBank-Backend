import React from 'react';
import './Description.css'
const Description = ({title, text}) => {
    return (
        <div className="desc--content">
           <p className="desc--title">{title}</p>
            <p className="desc--txt">{text}</p>
        </div>
    );
};

export default Description;