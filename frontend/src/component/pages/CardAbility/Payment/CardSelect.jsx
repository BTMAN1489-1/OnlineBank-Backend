import React, {useState} from 'react';
import '../../../styles/Common.css'
import './MoneyToSomewhere.css'
import getSymbolFromCurrency from "currency-symbol-map";
import {observer} from "mobx-react-lite";
import AccountStore from "../../../../store/AccountStore";
import {setBalance} from "../../../../utils/Format";

const CardSelect = ({cards, card, onChange}) => {
    const {bills} = AccountStore
    const getBalance = (b)=>{
        let a =  bills.filter((c)=>c.account_number === b.account_number)
        return setBalance(a[0])
    }
    return (
        <select className='mySelect'
                value={card}
                onChange={event => onChange(event.target.value)}>
                  {cards.map((c)=>
                <option key={c.card_name}
                        value={c}
                >
                    ****{c.card_name.slice(-4)} [{c.type_account==='debit'?'Дебетовая карта':'Кредитная карта'}] {getBalance(c)}{getSymbolFromCurrency(c.currency)}
                </option>
            )}
        </select>
    );
};

export default observer(CardSelect);