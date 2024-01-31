import React from 'react';
import './valute.css'
import {useNavigate} from "react-router-dom";
import ValutaStore from "../../store/CurrencyStore";
import {observer} from "mobx-react-lite";

const ValuteItem = ({ cur}) => {
    const{setVal} = ValutaStore
    const router = useNavigate()

    const buyVal = (e)=>{
        setVal(cur.CharCode)
        router('/buyvalute/' + cur.CharCode)
    }
    return (
        <div className='valute__item'>

            <div className='info'>
                <h3 >{cur.CharCode} {cur.Name}</h3>
                <p style={{marginTop:"10px"}}>Количество единиц: {cur.Nominal}</p>
            </div>

            <div className='buy__sell'>
                 <div className='buy_v'>
                     <h4>Продажа</h4>
                     <p style={{marginTop:"5px", marginLeft:"8px"}}>{cur.SalePrice}</p>
                 </div>
                  <div className='buy_v'>
                     <h4>Покупка</h4>
                     <p style={{marginTop:"5px", marginLeft:"8px"}}>{cur.PurchasePrice}</p>
                    </div>
                <button  onClick={e=>buyVal()} className='button_v'>Обменять</button>
            </div>
        </div>
    );
};

export default observer(ValuteItem);