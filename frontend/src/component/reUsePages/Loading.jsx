import React from 'react';
import './Loading.css'
const Loading = () => {
    return (
        <div style={{marginBottom:"10%"}}>
            <div className="load-line chet"></div>
            <div className="load-line nechet"></div>
            <div className="load-line third"></div>
        </div>
    );
};

export default Loading;