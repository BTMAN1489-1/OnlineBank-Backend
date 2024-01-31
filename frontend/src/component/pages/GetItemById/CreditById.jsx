import React, {useEffect, useState} from 'react';
import CardList from "../Home/CardList";
import Action from "../../UI/Action";
import axios from "axios";
import {useParams} from "react-router-dom";
import CardService from "../../../service/CardService";
import getSymbolFromCurrency from "currency-symbol-map";
import Loading from "../../reUsePages/Loading";

const CreditById = () => {
    const inf = useParams()
    const [credit, setCredit] = useState()
    const[isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        const getBill= async ()=>{
            try{
                const response = await CardService.billById(inf.id)
                setCredit(response.data[0])
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
                </div>
                :
            <div className="infor info_box">
                <div className="descr">
                    <h1  className="descr_txt">WorldSkills  Кредит наличными</h1>
                    <p className="descr_txt spec">{credit.account_number}</p>
                    <p className="bl"><b>Лимит:</b> {credit.description.max_debt_amount} {getSymbolFromCurrency(credit.currency)}</p>
                    <p className="bl"><b>Процентная ставка:</b> {credit.description.description.percent_rate}%</p>
                    <p className="bl"><b>Задолженность:</b> {credit.balance.replace('-','')} {getSymbolFromCurrency(credit.currency)}</p>
                    <Action path={'/credit/history/' + credit.account_number}
                            img={'/images/history.png'}
                            width={'50'}
                            height={'50'}
                            name={'История операций'}
                            />
                </div>
            </div>
            }
        </>

    );
};

export default CreditById;