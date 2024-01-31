import React from 'react';
import {useNavigate} from "react-router-dom";
import getSymbolFromCurrency from "currency-symbol-map";
import {ACCOUNT_TYPE} from "../../../utils/consts";
import {setBalance} from "../../../utils/Format";

const BillItem = (props) => {
    const router = useNavigate()
    return (
        <div
            onClick={()=>router(`/bill/${props.bill.account_number}`)}
            className="cardItem">
            <p className="card_type">{ACCOUNT_TYPE[props.bill.type_account]}</p>
            <div className="card_info">
                <p>***{(props.bill.account_number).slice(-4)}</p>
                <p className="sum">
                    {setBalance(props.bill)} {getSymbolFromCurrency(props.bill.currency)}
                </p>
            </div>
        </div>
    );
};

export default BillItem;