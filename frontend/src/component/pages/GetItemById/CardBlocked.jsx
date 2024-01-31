import React, {useState} from 'react';
import Window from "../../UI/Window";
import Block from "../CardAbility/Block";

const CardBlocked = ({card}) => {
    const[visibleBlock, setVisibleBlock] = useState(false)

    return (
        <div className="infor info_box">
            <Window setVisible={setVisibleBlock} visible={visibleBlock}>
                <Block cardNum={card.card_name} visible={visibleBlock} setVisible={setVisibleBlock} status={1}
                       title={'Разблокировать карту'} action={'разблокирована'} description={'Вы хотите разблокировать карту'} btn={'Разблокировать'}/>
            </Window>
            <div className="descr">
                <h1  className="descr_txt">{card.payment_system} WorldSkills Card</h1>
                <h3 className='descr_txt'>{localStorage.getItem(card.token_card)}</h3>
                <p className="descr_txt spec">{card.card_name}</p>
                <h1 style={{marginTop:"5%"}} className='descr_txt'>Карта заблокирована</h1>
            </div>
            <div className="descr">
                <p className="descr_txt spec">Действия</p>

                <div onClick={()=>setVisibleBlock(true)}
                     className="action">
                    <img className="act_img"
                         width='50'
                         height='50'
                         src='/images/block.png'/>
                    <p className='act_txt'>Разблокировать</p>
                </div>
            </div>
        </div>
    );
};

export default CardBlocked;