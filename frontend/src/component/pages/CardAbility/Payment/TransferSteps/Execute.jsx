import React from 'react';
import '../MoneyToSomewhere.css'
import './ExecTransfer.css'
import Description from "../../../../UI/Description";
import QuickStore from "../../../../../store/QuickStore";
import {useNavigate} from "react-router-dom";
const Execute = ({title, type, sum, from, to})=> {
    const nav = useNavigate()
    const {clearStore} = QuickStore
    const onClickHandler = ()=>{
        clearStore()
        nav('/')
    }
    return (
        <div className="cardholder info_box">
            <div onClick={onClickHandler} className="back--btn"></div>
            <div className="transferData">
            <h1 >{title}</h1>
            <p className="about--transfer">{type}</p>
            <br/>
            <h2 className="about--transfer">Подробности операции:</h2>
            <Description title={"Откуда:"} text={from}/>
            <Description title={"Куда:"} text={to}/>
            <Description title={"Сумма перевода:"} text={sum}/>
            </div>
        </div>
    );
};

export default Execute;