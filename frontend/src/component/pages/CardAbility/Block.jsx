import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import './abil.css'
import '../../styles/Common.css'
import CardService from "../../../service/CardService";
const Block = ({cardNum, visible, setVisible, title, btn, description, action, status}) => {
   const p = useParams()
    const [state, setState] = useState('Block')
    const block = async (e) => {
        e.preventDefault()
        try {
            const response = await CardService.ChangeCardState(p.id, status)
            setState('Access')
        } catch (e) {
        }
    }
    return (
        <>
        {state === 'Block' &&
        <form style={{marginTop: "8%"}} className="block" onSubmit={(e) => block(e)}>
            <h2 style={{textAlign: "center"}}>{title}</h2>
            <p className='blockContent'>{description} ****{cardNum.slice(-4)}?</p>
            <button className='myBtn'>{btn}</button>
        </form>
        }
        {state === 'Access' &&
            <div style={{marginTop: "10%"}} className='block'>
                <h2>Карта ****{cardNum.slice(-4)} {action}</h2>
                <button onClick={()=>setVisible(false)}
                    style={{marginTop:"10%"}} className='myBtn'>Закрыть</button>
            </div>
        }
        </>
    );
};

export default Block;