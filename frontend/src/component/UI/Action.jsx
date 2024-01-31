import React from 'react';
import './Action.css'
import {useNavigate} from "react-router-dom";
const Action = (props) => {
    const router = useNavigate()
    return (
        <div onClick={()=> router(props.path)}
            className="action">
            <img className="act_img"
                 width={props.width}
                 height={props.height}
                 src={props.img} alt={"."}/>
            <p className='act_txt'>{props.name}</p>
        </div>
    );
};

export default Action;