import React, {useState} from 'react';
import "./CardItem.css";
import {useNavigate} from "react-router-dom";
import getSymbolFromCurrency from "currency-symbol-map";
import AccountStore from "../../../store/AccountStore";
import {observer} from "mobx-react-lite";
import {setBalance} from "../../../utils/Format";
const CardItem = (props) => {
    const {bills } = AccountStore
    const getBalance = ()=>{
       let a =  bills.filter((c)=>c.account_number === props.card.account_number)
        return setBalance(a[0])
    }
    const router = useNavigate()
    return (
        <div
            onClick={()=>router(`/card/${props.card.token_card}`)}
            className="cardItem">
            <p className="card_type">{props.card.type_account==='credit'?'Кредитная карта':'Дебетовая карта'}</p>
            <div className="card_info">
                <img src="/images/card.png" className="cardicon" />
                <p className="num">****{props.card.card_name.slice(-4)}</p>
                <p className="sum">{getBalance()} {getSymbolFromCurrency(props.card.currency)}</p>
            </div>
        </div>
    );
};

export default observer(CardItem);