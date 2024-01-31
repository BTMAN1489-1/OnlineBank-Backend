import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import '../../../styles/Common.css'
import './history.css'
import HistoryItem from "./HistoryItem";
import CardStore from "../../../../store/CardStore";
import {observer} from "mobx-react-lite";
import TransferService from "../../../../service/TransferService";
import Loading from "../../../reUsePages/Loading";

export const CardHistory =observer( () => {
    const {cards} = CardStore
    const p = useParams()
    const[histList, setHistList]= useState([])
    const[isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const getHist =async ()=>{
            setIsLoading(true)
            try {
                const response = await TransferService.getHistory(p.account_number, p.token_card)
                setHistList(Object.values(response.data))
                setIsLoading(false)
            }catch (e){
                setIsLoading(false)
            }
        }
        getHist()

    }, [p]);
    return (
        <>
            {isLoading?
                <div className='history__list info_box'>
                <Loading/>
                </div>:
            <div className='history__list info_box'>
                {p.token_card?
                <h1>История операций
                    ****{cards.find((c)=>c.token_card===p.token_card).card_name.slice(-4)}</h1>
                    :
                    <h1>История операций ****{p.account_number.slice(-4)}</h1>
                }
                <div className='operations'>
                {histList.map((h) =>
                    <HistoryItem key={h.start_transaction} transaction={h} />
                )}
                </div>
            </div>
            }

        </>
    );
});

export default CardHistory;