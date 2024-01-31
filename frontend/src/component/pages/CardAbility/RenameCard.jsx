import React, {useState} from 'react';
import './abil.css'
import '../../styles/Common.css'
const RenameCard = ({visible, setVisible, cardNum, setCardName,cardId}) => {
    const[inp, setInp] = useState('')
    const rename =(e)=>{
        e.preventDefault()
        setCardName(inp)
        localStorage.setItem(cardId, inp)
        setInp('')
        setVisible(false)
    }
   return( <form  className="block" onSubmit={rename}>
        <h2 style={{textAlign:"center"}}>Переименование карты</h2>
        <p className='blockContent'>Введите новое название для карты  ***{cardNum}?</p>
        <input onChange={(e)=>setInp(e.target.value)}
               className='pas' placeholder='Имя'/>
        <button className='myBtn'>Изменить</button>
    </form>
   );
};

export default RenameCard;