import React, {useEffect, useState} from 'react';
import '../../../styles/Common.css'
import './Openbill.css'
import AccountStore from "../../../../store/AccountStore";
import BillSelect from "../../../Valuta/BillSelect";
import {observer} from "mobx-react-lite";
import {PaySystem} from "../../../../utils/consts";
import CardStore from "../../../../store/CardStore";
import Loading from "../../../reUsePages/Loading";
import Description from "../../../UI/Description";
import {useNavigate} from "react-router-dom";

const CreateCard = () => {
    const {bills} = AccountStore
    const {ans, newCard} = CardStore
    const [bill, setBill] = useState(bills[0].account_number)
    const [paySys,setPaySys] = useState(PaySystem[0])
    const [state, setState] = useState('Create')
    const nav = useNavigate()
    useEffect(() => {
        setBill(bills[0].account_number)
    }, [bills]);

    const createCard = async ()=>{
        try {
            setState('Load')
            await newCard(bill, paySys)
            setState('Info')
        }catch (e){
            alert('Ошибка сервера')
            setState('Create')
        }
    }

    return (
        <>
            {state ==='Load' &&
                <div className="contract info_box"><Loading/></div>
            }
            {state==='Create' &&
            <div className='contract info_box'>
                <div onClick={()=>nav('/')} className='back--btn'></div>
                <div className="billData">
                    <h2>Заполнение заявки</h2>
                    <div>
                        <div className='pay_field'>
                            <p className="add-title">Счет</p>
                            <BillSelect bill={bill} bills={bills} onChange={value => setBill(value)}/>
                        </div>
                        <div className='pay_field'>
                            <p className="add-title">Платежная система</p>
                            <select className='mySelect' value={paySys} onChange={(e) => setPaySys(e.target.value)}>
                                {PaySystem.map((p) =>
                                    <option key={p} value={p}>{p}</option>
                                )}
                            </select>
                        </div>
                        <br/>
                        <button onClick={createCard}
                                className='myBtn'>Подтвердить
                        </button>
                    </div>
                </div>
            </div>
            }
            {state ==='Info' &&
                <div className='contract info_box'>
                    <h1>Карта оформлена</h1>
                    <br/>
                    <div className='pay_field'>
                        <Description title={'Платежная система:'} text={paySys}/>
                        <Description title={'Номер карты:'} text={ans.card_name}/>
                        <button  onClick={()=>nav('/')} className='myBtn'>На главную</button>
                    </div>

                </div>
            }
        </>
    );
};

export default observer(CreateCard);