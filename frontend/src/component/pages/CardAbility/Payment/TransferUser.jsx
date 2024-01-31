import React, {useEffect, useState} from 'react';
import '../../../styles/Common.css'
import './MoneyToSomewhere.css'
import {observer} from "mobx-react-lite";
import AccountStore from "../../../../store/AccountStore";
import BillSelect from "../../../Valuta/BillSelect";
import TransferService from "../../../../service/TransferService"
import {billFormat} from "../../../../utils/Format";
import EmailConfirm from "../../../reUsePages/EmailConfirm";
import Execute from "./TransferSteps/Execute";
import getSymbolFromCurrency from "currency-symbol-map";
import {TO_USER, TRANSFER_EXECUTE, USER_DOESNT_EXIST} from "../../../../consts/StringConsts";
import Loading from "../../../reUsePages/Loading";
import CheckTransfer from "./TransferSteps/CheckTransfer";
import CurInput from "../../../UI/defaultUI/Inputs/CurInput";
import {useNavigate} from "react-router-dom";

export const TransferUser = observer(() => {
    const {bills} = AccountStore

    const [state, setState] = useState('chooseMan')
    const [error, setError] = useState(null)
    const [tfa, setTfa] = useState('')
    const [bill, setBill] = useState(bills[0].account_number)
    const [code, setCode] = useState('')
    const [billUser, setBillUser] = useState('')
    const [sum, setSum] = useState('')
    const[payBills, setPayBills] = useState([])
    const nav = useNavigate()
    useEffect(() => {
        setPayBills(bills.filter((c)=>c.balance != 0))
        setBill(bills[0].account_number)
    }, [bills]);
    useEffect(()=>{
        if(payBills.length!==0){
            setBill(payBills[0].account_number)
        }
    },[payBills])

    const getCur=()=>{
        return  bills.filter((c) => c.account_number === bill);
    }
    const checkBill = async (e) => {
        e.preventDefault()
        if (!billUser) {
            setError('Поле не может быть пустым');
            return;
        }
        if (billUser.replace(/\s/g, '').length < 20) {
            setError('Неправильно введен номер счета');
            return;
        }
        try {
            setState('Load')
            const response = await TransferService.isClient(billUser.replace(/\s/g, ''))
            if (Boolean(response.data.has_account)) {
                setError(null)
                setState("chooseCard")
            } else {
                setState('chooseMan')
                setError(USER_DOESNT_EXIST)

            }
        } catch (error) {
            setError(error.response.data.detail)
        }
    }
    const postPay = async (e) => {
        e.preventDefault()
        if (!sum) {
            setError('Поле не может быть пустым')
            return;
        }
        if (sum.replace(',', '.') < 0.01) {
            setError(' ')
            return
        }
        setError(null)
        try {
            setState('Load')
            const response = await TransferService.Transfer(sum.replace(',', '.'), bill,
                billUser.replace(/\s/g, ''), 'Перевод клиенту банка')
            setTfa(response.data.tfa_token)
            setState('Confirm')
            setError(null)

        } catch (e) {
            setState("chooseCard")
            setError(e.response.data.detail)
        }
    }

    const Confirmation = async (e) => {
        e.preventDefault()
        try {
            setState('Load')
            await TransferService.confirmTransfer(tfa, code)
            setError(null)
            setState('access')
        } catch (e) {
            setState('Confirm')
            setError(e.response.data.detail)
        }
    }


    return (
        <>
            {state === 'Load'  &&
                <div className="row-direct cardholder info_box" >
                    <Loading/>
                </div>
            }
            {state === 'chooseMan' &&
                <div className='cardholder info_box'>
                    <div
                        onClick={()=>nav('/home')}
                        className="back--btn">
                    </div>
                    <div className="transferData">
                        <form onSubmit={(e) => checkBill(e)}>
                            <h1>Получатель</h1>
                            <br/>
                            <p className="cardFrom">Введите номер счета</p>
                            <input
                                value={billUser}
                                className={error ? "myInput error--input" : "myInput"}
                                type="text"
                                onChange={e => billFormat(e.target.value, setBillUser)}
                            />
                            {error && <span className='error'>{error}</span>}
                            <button className='myBtn'>Продолжить</button>
                        </form>
                    </div>
                </div>
            }
            {state === 'chooseCard' &&
                <div className='cardholder info_box'>
                    <div onClick={()=>setState('chooseMan')} className="back--btn"></div>
                    <div className="transferData">
                    <form onSubmit={()=>setState('Check')}>
                        <h1>Детали перевода</h1>
                        <br/>
                        <div className='cardFrom'>
                            <p>Откуда</p>
                            {bills.length &&
                                <BillSelect bills={payBills} bill={bill} onChange={t=>setBill(t)}/>}
                        </div>
                        <CurInput
                            sum={sum}
                            setSum={setSum}
                            text={'Сумма перевода'}
                            error={error}/>
                        {error && <span style={{color: "blueviolet"}}>{error}</span>}
                        <button className='myBtn' >Продолжить</button>
                    </form>
                    </div>
                </div>
            }
            {state ==='Check'&&
                <CheckTransfer
                    from={bill}
                    confirm = {postPay}
                    to={billUser}
                    sum={sum  + ' '+ getSymbolFromCurrency(getCur(payBills, bill)[0].currency)}
                    setState={setState}/>}

            {state === 'Confirm' &&
                <EmailConfirm
                    code={code}
                    setCode={setCode}
                    state={'Check'}
                    request={postPay}
                    setState={setState}
                    confirm={Confirmation}/>
            }
            {state === 'access' &&
               <Execute
                   from={bill}
                   to={billUser.replace(/\s/g, '')}
                   sum={sum + getSymbolFromCurrency(getCur(payBills, bill)[0].currency)}
                   type={TO_USER}
                   title={TRANSFER_EXECUTE}
               />
            }
        </>
    );
});

export default TransferUser;

