import React from 'react';
import '../../../styles/Common.css'
import './history.css'
import getSymbolFromCurrency from "currency-symbol-map";
const FullInfo = ({visible, setVisible, transaction}) => {

    return (
        <div >
            <h1>Справка по операции</h1>
            <div className='operation_chr'>
                <p>Операция совершена</p>
                <h3 className='operation_chr'>{transaction.end_transaction.replace('T', ' ').slice(0, -15)}</h3>
            </div>

            <div className='operation_chr'>
                <p>Сумма в валюте операции</p>
                <h3 className='operation_chr'>{transaction.description.amount_money} {getSymbolFromCurrency(transaction.description.currency)}</h3>
            </div>

            <div className='operation_chr'>
                <p>Тип операции</p>
                <h3 className='operation_chr'>{transaction.description.about}</h3>
            </div>

            <div className='operation_chr'>
                <p>Статус операции</p>
                <h3 className='operation_chr'>Исполнена</h3>
            </div>

            <div className='operation_chr'>
                <p>Счет списания</p>
                {transaction.description.From.card_number?
                    <h3 className='operation_chr'>{transaction.description.From.card_number}</h3>
                    :<h3 className='operation_chr'>{transaction.description.From.account_number}</h3>}
            </div >

            <div className='operation_chr'>
                <p>Счет зачисления</p>
                {transaction.description.To.card_number?
                    <h3 className='operation_chr'>{transaction.description.To.card_number}</h3>
            :<h3 className='operation_chr'>{transaction.description.To.account_number}</h3>}
            </div>
            <br/>
            <button onClick={()=>setVisible(false)}
                style={{height:"40px"}} className='myBtn'>Закрыть</button>
        </div>
    );
};

export default FullInfo;