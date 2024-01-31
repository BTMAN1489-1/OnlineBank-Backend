import React from 'react';
import './reUseConfirm.css'
import '../styles/Common.css'
import VerifyInput from "../UI/VerifyInput";
import {EMAIL_MSG, NEXT} from "../../consts/StringConsts";
import Timer from "./Timer";

const EmailConfirm = ({code, setCode, confirm, error, setState, state, request}) => {
    return (
            <div className='email__block info_box' >
                <div onClick={()=>setState(state)}
                    className="back--btn"></div>
                <h2 className="email-title">{EMAIL_MSG}</h2>
                <VerifyInput code={code} setCode={setCode}/>
                {error && <p className="error">{error}</p> }
                <Timer Request={request} error={error}/>
                <button onClick={confirm}
                        className='myBtn'>{NEXT}</button>
                <br/>
            </div>
    );
};

export default EmailConfirm;