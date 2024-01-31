import React from 'react';
import {useParams} from "react-router-dom";

const CreditInfo = () => {
    const p = useParams()
    return (
        <div>
            credit info {p.id}
        </div>
    );
};

export default CreditInfo;