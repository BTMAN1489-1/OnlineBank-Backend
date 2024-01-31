import React, {useState} from 'react';
import './history.css'
import Window from "../../../UI/Window";
import FullInfo from "./FullInfo";
import getSymbolFromCurrency from "currency-symbol-map";
const HistoryItem = ({transaction}) => {
    const[visible, setVisible] = useState(false)
    return (
        <>
            <Window setVisible={setVisible} visible={visible}>
                <FullInfo setVisible={setVisible} visible={visible} transaction={transaction}/>
            </Window>
            <div onClick={()=>setVisible(true)}
                className='history_item'>
                <p  className='general_info'>{transaction.description.about}</p>
                <div className='total'>
                    <h3>{transaction.description.amount_money} {getSymbolFromCurrency(transaction.description.currency)}</h3>
                    <p style={{marginTop:"10%"}}>{transaction.end_transaction.replace('T', ' ').slice(0, -15)}</p>
                </div>
            </div>
        </>
    );
};

export default HistoryItem;