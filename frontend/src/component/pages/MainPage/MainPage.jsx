import React, {useEffect} from 'react';
import NewAccount from "./OpenBill/NewAccount";
import './main.css'
import {NavLink, useNavigate} from "react-router-dom";
import CurrencyBlock from "./CurrencyBox/CurrencyBlock";
import {useCookies} from "react-cookie";
import QuickPay from "./QuickPay/QuickPay";

const MainPage = () => {
    const nav = useNavigate()
    const [cookie, setCookie] = useCookies(['hist'])
    return (
        <>
        <div className="action--block">

            <NewAccount/>
            <div style={{display:"flex", flexDirection:"row",padding:"2%",marginTop:"5%", justifyContent:"space-between"}}>
                <div onClick={()=>nav('/payment')}
                    className="main--action ">
                    <img  width={"50px"} height={"50px"} src="/images/transact.png"/>
                    <div className="mainTitle">
                        <h3>Переводы</h3>
                        <p style={{marginTop:"2%"}}>Перевести</p>
                    </div>
                </div>
                <div onClick={()=>nav('/payment/service')} className="main--action">
                    <img width={"50px"} height={"50px"} src="/images/commune.png"/>
                    <div className="mainTitle">
                        <h3>Платежи</h3>
                        <p style={{marginTop:"2%"}}>Оплатить</p>
                    </div>
                </div>
            </div>
            <QuickPay/>
        </div>
            <CurrencyBlock/>

        </>
    );
};

export default MainPage;