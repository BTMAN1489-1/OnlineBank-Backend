import React, {useEffect, useState} from 'react';
import '../../../styles/Common.css'
import './MoneyToSomewhere.css'
import './PaymentElem.css'
import CardSelect from "./CardSelect";
import BillSelect from "../../../Valuta/BillSelect";
import {observer} from "mobx-react-lite";
import AccountStore from "../../../../store/AccountStore";
import CardStore from "../../../../store/CardStore";
import SelectAction from "../../../UI/SelectAction";
import TransferService from "../../../../service/TransferService";
import Input from "../../../UI/defaultUI/Inputs/Input";
import CurInput from "../../../UI/defaultUI/Inputs/CurInput";
import EmailConfirm from "../../../reUsePages/EmailConfirm";
import {EMPTY_FIELD, SUM_ERROR} from "../../../../consts/StringConsts";
import {billFormat} from "../../../../utils/Format";
import Execute from "./TransferSteps/Execute";
import getSymbolFromCurrency from "currency-symbol-map";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import Loading from "../../../reUsePages/Loading";
import QuickStore from "../../../../store/QuickStore";

const PayService = observer(() => {
    const {bills, getPayAccount, getPayAccountByCurrency} = AccountStore;
    const {sum, where, description,currency , flag,from, setFrom,setFlag, clearStore} = QuickStore
    const [payBills, setPayBills] = useState([])
    useEffect(() => {
        if(bills.length !==0) {
            if (flag)
                setPayBills(getPayAccountByCurrency(currency))
            else {
                setPayBills(getPayAccount)
            }
        }
    }, [flag, bills]);
    useEffect(()=>{
        if(payBills.length !== 0)
            setBill(payBills[0].account_number)
    }, [payBills])
    const [to, setTo] = useState('')
    const [pay, setPay] = useState('')
    const [desc, setDesc] = useState('')
    useEffect(() => {
        if(flag){
            setPay(sum)
            setTo(where)
            setDesc(description)
        }

    }, [flag]);
    // useEffect(()=>{
    //     if(desc && to){
    //         setFlag((desc === description && to === where))
    //     }
    //
    // },[desc, to])
    const [bill, setBill] = useState(bills[0].account_number)
    const [state, setState] = useState('service')
    const [cookie, setCookie] = useCookies(['hist'])
    const [tfa, setTfa] =useState('')
    const [descError, setDescError] = useState(null)
    const [whereError, setWhereError] = useState(null)
    const [sumError, setSumError] = useState(null)
    const [error, setError] = useState(null)

    const[code, setCode] = useState('')
    const [check, setCheck] = useState(false)
    const [add, setAdd] = useState(false)
    const  nav = useNavigate()
    useEffect(()=>{
        if(check) {
            setFlag(false)
            setSumError(pay ? null : EMPTY_FIELD)
            setSumError(pay > 0 ? null : SUM_ERROR)
            setDescError(desc ? null : EMPTY_FIELD)
            setWhereError(to ? null : EMPTY_FIELD)
        }
    },[check, pay, desc, to])
    const isValid = ()=>{
        let sum_error = pay ? null : EMPTY_FIELD
        let sum_er = pay > 0 ? null : SUM_ERROR
        let desc_error = desc? null : EMPTY_FIELD
        let where_error =to ? null : EMPTY_FIELD
        let where_len = to.length === 24?null:"Неверно введен счет"
        setSumError(sum_error)
        setSumError(sum_er)
        setDescError(desc_error)
        setWhereError(where_error)
        setWhereError(where_len)
        return !sum_error && !sum_er && !where_error && !sum_er && !where_len
    }
    const setAccount =(b)=>{billFormat(b, setTo)}
    const getCurrency = ()=>{
        return bills.filter((b)=>b.account_number === from)
    }

    const sendDuty = async (e)=> {
        e.preventDefault()
        setCheck(true)
        if(isValid()) {
            try {
                setState('Load')
                const response = await TransferService.Transfer(pay.replace(',', '.'),
                    bill, to.replace(/\s/g, ''), desc)
                setTfa(response.data.tfa_token)
                setState('confirmation')
                setFrom(bill)
                setError(null)
                if(add){
                    let a = cookie.hist
                    a.push({to:to, sum:pay,description:desc, currency:getCurrency()[0].currency})
                    setCookie('hist', a)
                }
            } catch (e) {
                setState('service')
                if(e.response.data.account_recv){
                    setWhereError(e.response.data.account_recv)
                }else {
                    setSumError(e.response.data.detail)
                    setWhereError(null)
                }

            }
        }
    }
    const Confirm =async (e)=>{
        e.preventDefault()
        if(!code){
            setError(EMPTY_FIELD)
            return
        }
        try {
            setState('Load')
            const response = await TransferService.confirmTransfer(tfa, code)
            setState('access')
        }catch (e) {
            setState('confirmation')
            setError(e.response.data)
        }
    }
    const onClickHandler = ()=>{
        setFlag(false)
        nav('/')
    }
    return (
        <>
            {state ==='Load' && <div className="cardholder info_box"><Loading/></div> }
            {state==='service' &&
                <div className='cardholder info_box'>
                    <div onClick={onClickHandler} className="back--btn"></div>
                    <div className="transferData">
                    <h1>Оплатить</h1>
                    <form onSubmit={sendDuty} className='service'>
                        <h4 className='pay_header'>Выберите счет</h4>
                        {payBills.length!==0?
                        <BillSelect bills={payBills} bill={bill} onChange={value => setBill(value)}/>
                            :
                            <input className="myInput" disabled={true} value='Недостаточно средств'/>}
                        <h4 className='pay_header'>Назначение платежа</h4>
                        <Input
                            value={desc}
                            setValue={setDesc}
                            text={"Описание платежа"}
                            error={descError}
                        />
                        {descError && <p className="error">{descError}</p>}
                        <h4 className='pay_header'>Номер счета для оплаты</h4>
                        <Input
                            value={to}
                            setValue={setAccount}
                            text={"Счет"}
                            error={whereError}
                        />
                        {whereError && <p className="error">{whereError}</p>}
                        <h4 className='pay_header'>Сумма перевода</h4>
                        <CurInput
                            sum={sum}
                            text={'0'}
                            setSum={setPay}
                            suf={flag?getSymbolFromCurrency(currency):''}
                            error={sumError}/>
                        {sumError && <p className="error">{sumError}</p>}
                        {error && <p className="error">{error}</p>}
                        {!flag &&
                        <label className="checkBox">
                            Добавить на панель быстрых платежей
                            <input
                                type="checkbox"
                                checked={add}
                                onChange={() => setAdd(!add)}
                            />
                            <span className="checkmark"></span>
                        </label>
                        }
                        <button className='myBtn'>Продолжить</button>
                    </form>
                </div>
                </div>
            }
            {state ==='confirmation'&&
                <EmailConfirm confirm={Confirm} error={error} setState={setState} state={'service'} code={code} setCode={setCode} />
            }
            {state ==='access' &&
                <Execute
                    title={"Успешно"}
                    type={desc}
                    from={from}
                    to={to.replace(/\s/g, '')}
                    sum={pay + getSymbolFromCurrency(getCurrency()[0].currency)}/>
            }
        </>
    );
});

export default PayService;