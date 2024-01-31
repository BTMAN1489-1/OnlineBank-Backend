import React from 'react';
import './Components.css'
const CardInput = ({error, setBillUser, billUser}) => {

    return (
        <input style={error && {borderColor:"blueviolet"}}
               value={billUser}
               className="cin"
               type="text"
               onChange={e =>setBillUser(e.target.value)}
        />
    );
};

export default CardInput;