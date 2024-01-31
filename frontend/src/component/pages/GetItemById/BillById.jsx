import React, {useEffect, useState} from 'react';
import CardList from "../Home/CardList";
import '../../styles/Common.css'
import Action from "../../UI/Action";
import axios from "axios";
import {useParams} from "react-router-dom";
import CardService from "../../../service/CardService";
import getSymbolFromCurrency from "currency-symbol-map";
import {setBalance} from "../../../utils/Format";
import Loading from "../../reUsePages/Loading";
const BillById = () => {
    const inf = useParams()
    const [bill, setBill] = useState(
    )
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        const getBill= async ()=>{
            try{
                const response = await CardService.billById(inf.id)
                setBill(response.data[0])
                setIsLoading(false)
            }catch (e) {
                alert('Ошибка')
            }
        }
       getBill()
    }, [inf.id]);
    return (
        <>
            {isLoading?
                <div className=" row-direct infor info_box">
                    <Loading/>
                </div>:
            <div className="infor info_box">
                <div className="descr">
                    <h1  className="descr_txt">WorldSkills Счет</h1>
                    <p className="descr_txt spec">{bill.account_number}</p>
                    <h2 className="bl">{setBalance(bill)} {getSymbolFromCurrency(bill.currency)}</h2>
                </div>
                <div className="descr">
                    <p className="descr_txt spec">Действия</p>
                    <Action
                        path = {'/bill/history/'+bill.account_number}
                        img={'/images/history.png'}
                        height={'50'}
                        width={'50'}
                        name = {'История операций'}/>
                </div>
            </div>
            }
        </>
            );
};

export default BillById;