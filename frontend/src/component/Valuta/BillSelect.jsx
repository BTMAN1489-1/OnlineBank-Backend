import React from 'react';
import '../pages/CardAbility/Payment/PaymentElem.css'
import '../UI/defaultUI/defaultUI.css'
import getSymbolFromCurrency from "currency-symbol-map";
import {ACCOUNT_TYPE} from "../../utils/consts";
import {setBalance} from "../../utils/Format";

const BillSelect = ({ bills, bill, onChange}) => {
    return (
        <select className='mySelect'
                value={bill}
                onChange={event => onChange(event.target.value)}>
            {bills.map((c)=>
                <option key={c.account_number}
                        value={c.account_number}
                >
                    {'****'+c.account_number.slice(-4) + '   [' + ACCOUNT_TYPE[c.type_account] +']   ' +
                        setBalance(c)+' '+getSymbolFromCurrency(c.currency)}
                </option>
            )}
        </select>
    );
};

export default BillSelect;