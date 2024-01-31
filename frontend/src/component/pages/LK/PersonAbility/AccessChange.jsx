import React from 'react';
import '../../../styles/Common.css'
import {useNavigate} from "react-router-dom";
const AccessChange = ({action, btn}) => {
    const router = useNavigate()
    return (
        <>
            <h1 style={{marginBottom: "7%", marginTop: "10%", marginLeft: "20%"}}>{action}</h1>
            <button
                onClick={() => router('/home')}
                 className='myBtn'>
                На главную
            </button>
        </>
    );
};

export default AccessChange;