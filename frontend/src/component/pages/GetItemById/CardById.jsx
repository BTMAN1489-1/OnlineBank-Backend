import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import "../../styles/Common.css";
import './idElements.css';
import '../../UI/Action.css'
import CardService from "../../../service/CardService";
import CardActive from "./CardActive";
import CardBlocked from "./CardBlocked";
import Loading from "../../reUsePages/Loading";

const CardById = () => {
    const inf= useParams()
    const [card, setCard] = useState()

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        const getCard = async ()=>{
            try {
                const response = await CardService.cardById(inf.id)
                setCard(response.data[0])
                setIsLoading(false)
            }catch (e) {
                alert('Ошибка')
            }
        }
        getCard()

    }, [inf.id]);
    return (
           <>
               {isLoading?
                   <div className=" row-direct infor info_box">
                   <Loading/>
                   </div>
                   :
                   <>
                   {card.is_activated ?
                           <CardActive card={card}/>
                           :
                           <CardBlocked card={card}/>
                   }
                   </>
               }
           </>
    );
};

export default CardById;