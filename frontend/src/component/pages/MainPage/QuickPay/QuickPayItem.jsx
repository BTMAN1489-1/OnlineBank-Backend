import React from 'react';
import getSymbolFromCurrency from "currency-symbol-map";
import './Quick.css'
import {useNavigate} from "react-router-dom";
import QuickStore from "../../../../store/QuickStore";
import {observer} from "mobx-react-lite";
const QuickPayItem = ({pay}) => {
    const nav = useNavigate()
    const {setDescription, setWhere, setFlag, setSum, setCurrency} = QuickStore
    const onClickHandler = ()=>{
        setWhere(pay.to)
        setSum(pay.sum)
        setDescription(pay.description)
        setCurrency(pay.currency)
        setFlag(true)
        nav('/payment/service')
    }
    return (
        <div onClick={onClickHandler} className="row-direct quick--item">
            <p>{pay.description}</p>
            <p>{pay.sum} {getSymbolFromCurrency(pay.currency)}</p>
        </div>
    );
};

export default observer(QuickPayItem);