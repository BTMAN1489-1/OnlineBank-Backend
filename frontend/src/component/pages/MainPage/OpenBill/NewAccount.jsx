import React from 'react';
import Action from "../../../UI/Action";
import './Openbill.css'
import '../../../styles/Common.css'
const NewAccount = () => {
    return (
        <div className='new_acc info_box'>
        <Action path ={'/new_card'}
                img = {'/images/card.png'}
                height = {50}
                width = {50}
                name={'Оформить карту'}
        />
        <Action path ={'/new_bill'}
                img = {'/images/plus.png'}
                height = {50}
                width = {50}
                name={'Открыть счет'}
        />
    </div>
    );
};

export default NewAccount;