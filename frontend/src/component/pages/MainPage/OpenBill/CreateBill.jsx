import React, {useEffect, useState} from 'react';
import '../../Home/Home.css'
import '../../../styles/Common.css'
import './Openbill.css'
import {valutaCharCode} from "../../../../utils/consts";
import CardService from "../../../../service/CardService";
import getSymbolFromCurrency from "currency-symbol-map";
import AccountStore from "../../../../store/AccountStore";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import Loading from "../../../reUsePages/Loading";
import Description from "../../../UI/Description";

const CreateBill = () => {
    const {newBill, ans} = AccountStore

    const [valuta, setValuta] = useState("RUB")
    const[state, setState] = useState('Open')

    const nav = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('currency')){
            setValuta(localStorage.getItem('currency'))
        }
    }, []);
    const OpenBill = async ()=>{
        try {
            setState('Load')
            await newBill(valuta)
            setState('Info')
            localStorage.removeItem('currency')
        }
        catch (e) {
            setState('Open')
            alert('Ошибка сервера')
        }
    }
    return (
        <>
            {state ==='Load' &&
                <div className="contract info_box"><Loading/></div>
            }
            {state === 'Open'&&
                <div className='contract info_box'>
                    <div onClick={() => nav('/')} className="back--btn"></div>
                    <div className="billData">
                        <h2>Заполнение заявки</h2>
                        <br/>
                        <p>Валюта</p>
                        <select className='mySelect'
                                value={valuta}
                                onChange={e => setValuta(e.target.value)}>
                            <option key={"RUB"} value={"RUB"}>Рубль</option>
                            {valutaCharCode.map((t) =>
                                <option key={t.CharCode} value={t.CharCode}> {t.Name}</option>
                            )}
                        </select>
                        <button onClick={OpenBill}
                                className='myBtn'>
                            Открыть счет
                        </button>

                    </div>
                </div>
            }
            {state === 'Info' &&
                <div style={{width:"40%", padding:"2%"}} className='info_box add_bill'>
                    <h1>Счет открыт</h1>
                    <br/>
                    <div className="pay_field">
                    <Description title={'Номер счета:'} text={ans.account_number}/>
                    <Description title={'Баланс:'} text={ans.balance +getSymbolFromCurrency(ans.currency)}/>
                    <button onClick={()=>nav('/')} className='myBtn'>На главную</button>
                    </div>
                </div>
            }

        </>
    );
};

export default observer(CreateBill);