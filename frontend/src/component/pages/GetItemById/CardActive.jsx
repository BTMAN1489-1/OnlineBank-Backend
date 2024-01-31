import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import Window from "../../UI/Window";
import Block from "../CardAbility/Block";
import RenameCard from "../CardAbility/RenameCard";
import Action from "../../UI/Action";
import {CARD, HISTORY} from "../../../utils/consts";
import getSymbolFromCurrency from "currency-symbol-map";
import {setBalance} from "../../../utils/Format";
import AccountStore from "../../../store/AccountStore";

const CardActive = ({card}) => {
    const {bills} = AccountStore
    const[visibleBlock, setVisibleBlock] = useState(false)
    const[visibleRe, setVisibleRe] = useState(false)
    const[cardName, setCardName]=useState('')
    const getBalance = ()=>{
        let a =  bills.filter((c)=>c.account_number === card.account_number)
        return setBalance(a[0])
    }
    return (
        <div className="infor info_box">
            <Window setVisible={setVisibleBlock} visible={visibleBlock}>
                <Block cardNum={card.card_name} action={'заблокирована'} btn={'Заблокировать'} description={'Вы уверены, что хотите заблокировать карту'} title={'Блокировка карты'}
                       visible={visibleBlock} setVisible={setVisibleBlock} status={0}/>
            </Window>
            <Window setVisible={setVisibleRe} visible={visibleRe}>
                <RenameCard cardNum={card.card_name}  cardId={card.token_card} visible={visibleRe} setVisible={setVisibleRe} setCardName={setCardName}/>
            </Window>
            <div className="descr">
                <h1  className="descr_txt">{card.payment_system} WorldSkills Карта</h1>
                <p className="descr_txt spec">{card.card_name}</p>
                <p className="descr_txt spec"> {card.type_account ==='debit'? ' Дебетовая карта':'Кредитная карта'}</p>
                <h2 className="bl">{getBalance()} {getSymbolFromCurrency(card.currency)}</h2>
            </div>
            <div className="descr">
                <p className="descr_txt spec">Действия</p>
                <div className="row-direct">
                <Action
                    path = {CARD+HISTORY+'/'+card.account_number+'/'+card.token_card}
                    img={'/images/history.png'}
                    height={'50'}
                    width={'50'}
                    name = {'История операций'}/>
                <Action
                    path = {'/payment'}
                    img={'/images/pay.png'}
                    height={'50'}
                    width={'50'}
                    name = {'Оплатить'}/>
                </div>

                <div style={{width:"50%"}} onClick={()=>setVisibleBlock(true)}
                     className="action">
                    <img className="act_img"
                         width='50'
                         height='50'
                         src='/images/block.png'/>
                    <p className='act_txt'>Заблокировать</p>
                </div>
            </div>
        </div>
    );
};

export default observer(CardActive);