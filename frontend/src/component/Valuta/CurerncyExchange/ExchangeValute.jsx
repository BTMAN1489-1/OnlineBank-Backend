import React, {useEffect, useState} from 'react';
import '../../styles/Common.css'
import AccountStore from "../../../store/AccountStore";
import {useNavigate, useParams} from "react-router-dom";
import '../valute.css'
import {observer} from "mobx-react-lite";
import TransferService from "../../../service/TransferService";
import EmailConfirm from "../../reUsePages/EmailConfirm";
import BuyValuta from "./BuyValuta";
import SellValuta from "./SellValuta";
import SelectAction from "../../UI/SelectAction";
import {valutaCharCode} from "../../../utils/consts";
import CurrencyStore from "../../../store/CurrencyStore";
import Description from "../../UI/Description";
import getSymbolFromCurrency from "currency-symbol-map";

const ExchangeValute = () => {

    const {getCourse, val ,isLoad, from,buy, total, course, setVal} = CurrencyStore
    const{bills} = AccountStore
    const p = useParams()
    const nav = useNavigate()
    const [bill, setBill] = useState('')
    const [valBill, setValBill] = useState('')
    const valuta = useParams()
    const[valBills, setValBills] = useState([{account_number:''}])
    const[sellBills, setSellBills] = useState([{account_number:''}])
    const[flag, setFlag] = useState(true)
    const [code,setCode] = useState('')
    const [state, setState] = useState('Valuta')
    const [tfa ,setTfa] = useState()
    const[valute, setValute] = useState()
    const [error, setError] = useState(null)
    const [currency, setCurrency] = useState(null)
    useEffect(() => {
        if(course.length === 0)
            getCourse()
    }, []);


    useEffect(() => {
        if(!isLoad){
            if(val)
                setCurrency(course[val])
            else
                setCurrency(course[p.charcode])
        }

    }, [isLoad, val]);
    useEffect(() => {
        if(valute){
            setVal(valute)
        }
    }, [valute]);
    useEffect(()=>{
        setValute(valuta.charcode)
    }, [])
    useEffect(() => {
            setValBills(bills.filter((f)=>f.currency === valute))
            setSellBills(bills.filter((f)=>f.currency !== valute && f.currency ==='RUB'))
    }, [bills, valute]);
    useEffect(() => {
        if(valBills.length)
             setValBill(valBills[0].account_number)
        if(sellBills.length)
            setBill(sellBills[0].account_number)
    }, [valBills, sellBills]);

    const transact = async (e)=>{
        e.preventDefault()
        const amount = flag?buy:total
        const to = flag?valBill:bill
        const descr = flag?'Покупка валюты':'Продажа валюты'
        try {
            const response = await TransferService.Transfer(amount, from, to, descr)

            setError(null)
            setTfa(response.data.tfa_token)
            setState('Confirm')
        }catch (e) {
                setError(e.response.data.detail)
        }
    }
    const Confirm = async (e)=>{
        e.preventDefault()
        try {
            await TransferService.confirmTransfer(tfa, code)
            setError(null)
            setState('success')
        } catch (e) {
            setError(e.response.data.detail)
        }
    }
    return (
                <>
                    {state === 'Valuta' &&
                        <div  className='buy_val info_box'>
                            <div  onClick={()=>nav('/')} className="back--btn"></div>
                            <div className="valData">
                            <h1>Обмен валюты</h1>


                            <SelectAction flag={flag} setFlag={setFlag} case1={'Покупка'} case2={'Продажа'}/>
                            <p style={{marginTop: "4%"}}>Валюта</p>
                            <select className='mySelect'
                                    value={valute}
                                    onChange={e => setValute(e.target.value)}>
                                {valutaCharCode.map((t) =>
                                    <option key={t.CharCode} value={t.CharCode}> {t.Name}</option>
                                )}
                            </select>
                            {currency &&
                            <p>{currency.Nominal} {val} = {flag ? currency.PurchasePrice :
                                currency.SalePrice} RUB</p>
                            }
                            <br/>
                            {flag ?
                                <BuyValuta valBills={valBills}
                                           sellBills={sellBills}
                                           bill={bill}
                                           setTfa={setTfa}
                                           valBill={valBill}
                                           setBill={setBill}
                                           setState={setState}
                                           setValBill={setValBill}
                                           setError={setError}/>
                                :
                                <SellValuta sellBills={sellBills}
                                            bill={bill}
                                            valBill={valBill}
                                            setBill={setBill}
                                            setState={setState}
                                            setError={setError}
                                            setTfa={setTfa}
                                            setValBill={setValBill}
                                            valBills={valBills}/>
                            }
                        </div>
                        </div>
                    }
                    {state === 'Confirm' &&
                        <EmailConfirm
                            setState={setState}
                            state={'Valuta'}
                            code={code}
                            request={transact}
                            error={error}
                            setCode={setCode}
                            confirm={Confirm}/> }
                    {state === 'success' &&
                        <div className='buy_val info_box'>
                            <h1>Успешно</h1>
                            <br/>
                            <h3>{flag?'Покупка валюты':'Продажа валюты'}</h3>
                            <br/>
                            <Description title={'Счет списания'} text={from}/>
                            <Description title={'Сколько'} text={total + getSymbolFromCurrency(valute)}/>
                            <Description title={flag?'Сумма покупки':'Сумма продажи'}text={buy + getSymbolFromCurrency("RUB")}/>
                            <button onClick={()=>nav('/')} className="myBtn">На главную</button>
                        </div>
                    }
                </>

    );
};

export default observer(ExchangeValute);