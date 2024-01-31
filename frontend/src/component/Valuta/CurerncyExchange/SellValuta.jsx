import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import BillSelect from "../BillSelect";
import '../../styles/Common.css'
import ValutaStore from "../../../store/CurrencyStore";
import {useParams} from "react-router-dom";
import CurInput from "../../UI/defaultUI/Inputs/CurInput";
import TransferService from "../../../service/TransferService";

const SellValuta = ({valBills, setValBill, valBill, sellBills,setError, setTfa, setState, bill, setBill }) => {
    const{val, course, isLoad, setBuy, setFrom, setTotalSum,getCourse} = ValutaStore
    const p = useParams()
    const [currency, setCurrency] = useState()

    const [sum, setSum] = useState(0)
    const [total, setTotal] = useState(0)
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
        if(currency && sum)
            setTotal(Number((currency.SalePrice/currency.Nominal)*sum.replace(',','.')).toFixed(2))
    }, [sum, currency, setTotal]);
    const Transact = async (e)=>{
        e.preventDefault()
        setTotalSum(sum)
        setFrom(valBill)
        setBuy(total)
        const descr ='Продажа валюты'
        try {
            const response = await TransferService.Transfer(sum, valBill, bill, descr)
            setError(null)
            setTfa(response.data.tfa_token)
            setState('Confirm')
        }catch (e) {
            setError(e.response.data.detail)
        }
    }
    return (
        <>
            {(valBills.length && valBills.filter((v)=>v.balance !=0).length)?<>
                    <div className='vall_bill'>
                        <p>Выберите счет для продажи</p>
                        {valBills.length &&
                            <BillSelect bills={valBills} bill={valBill} onChange={value => setValBill(value)}/>}
                    </div>
                    <div className='vall_bill'>
                        <p>Выберите счет для перевода</p>
                        {sellBills.length &&
                            <>
                                <BillSelect bills={sellBills} bill={bill} onChange={value => setBill(value)}/>
                                <div className='vall_bill'>
                                   <CurInput sum={sum} setSum={setSum} text={'Количество'}/>
                                    {total>0? <h4>Сумма зачисления:{total} </h4>:<></>}
                                    <button onClick={Transact}
                                            className='myBtn'>Обменять</button>
                                </div>
                            </>}
                    </div>
                </>:
                <div className='vall_bill'>
                    <p>У вас нет подходящего счета для продажи</p>
                </div>}


        </>
    );
};

export default observer(SellValuta);