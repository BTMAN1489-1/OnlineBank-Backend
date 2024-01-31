import React from 'react';
import '../../../styles/Common.css'
import '../../GetItemById/idElements.css'
import './PaymentElem.css'
import Action from "../../../UI/Action";
import CardList from "../../Home/CardList";

const Payment = () => {
    return (
        <>
            <div className="pay_main info_box">
                <div className="pay_btn">
                    <h1 style={{marginLeft:"2%"}}>Переводы</h1>
                    <Action
                        path={'/payment/transfer/user'}
                        img={'/images/crowd.png'}
                        width={'60'}
                        height={'60'}
                        name={'Другому человеку'}/>
                    <Action
                        path={'/payment/transfer/between'}
                        img={'/images/transact.png'}
                        width={'60'}
                        height={'60'}
                        name={'Между своими счетами'}/>
                </div>
                <div className='pay_btn'>
                    <h1 style={{marginLeft:"2%"}}>Платежи</h1>
                    <Action
                        path={'/payment/service'}
                        img={'/images/commune.png'}
                        width={'60'}
                        height={'60'}
                        name={'Оплатить услугу'}/>
                </div>
            </div>
        </>
    );
};

export default Payment;