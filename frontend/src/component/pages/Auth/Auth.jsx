import React, {useEffect, useState} from 'react';
import '../../styles/Common.css'
import './Auth.css'
import {useNavigate} from "react-router-dom";
import {ATMS} from "../../../utils/consts";
import {observer} from "mobx-react-lite";
import UserStore from "../../../store/UserStore";
import '../../UI/confirmCodeInput.css'
import EmailConfirm from "../../reUsePages/EmailConfirm";
import Loading from "../../reUsePages/Loading";
import {EMPTY_FIELD, PASS_PATTERN} from "../../../consts/StringConsts";

const Auth = () => {
    const{tfa, SiqnIn, AuthError, setAuthError, ConfirmLogin} = UserStore
    const router = useNavigate()
    const[state, setState] = useState('SignIn')

    const [pas, setPas] = useState('')
    const [log, setLog] = useState('')
    const[code, setCode] = useState('')
    const [pasError, setPasError] = useState(null)
    const [logError, setLogError] = useState(null)
    const[error, setError] = useState(null)
    useEffect(()=>{
        if(tfa)
            setState('Confirm')
    },[tfa])
    useEffect(() => {
        if(AuthError){
            setState('SignIn')
        }
    }, [AuthError]);
    const siqnIn=async (e)=>{
        e.preventDefault()
        if(CheckData()) {
            try {
                setState('Load')
                await SiqnIn(log, pas)

            } catch (e) {
                setState('SignIn')

            }
        }
    }
    const CheckData = ()=>{
        let pas_pat =!pas?EMPTY_FIELD:((pas && pas.length <8)?PASS_PATTERN:null)
        let log_er = log?null:EMPTY_FIELD
        setPasError(pas_pat)
        setLogError(log_er)
        return !log_er && !pas_pat
    }
    const confirm= async (e)=>{
        e.preventDefault()
        if(code) {
            try {
                setState('Load')
                await ConfirmLogin(code)
                setState('Confirm')
            } catch (e) {
                setState('SignIn')
            }
        }
        else {
            setAuthError(EMPTY_FIELD)
        }



    }
    return (
        <>
            {state ==='Load' &&
                <div className='reg__modal'><Loading/></div>
            }
            {state ==='SignIn' &&
                <div className="reg__modal">
                    <h1 className='head__reg'>Добро пожаловать!</h1>
                    <form  className="reg_form" style={{width:"100%"}} onSubmit={(siqnIn)}>
                        <input className={(AuthError || pasError)?'myInput error--input':'myInput'}
                               placeholder='Логин'
                               value={log}
                               onChange={(e)=>setLog(e.target.value)}
                        />
                        {logError && <span className='error'>{logError}</span>}
                        <input className={(AuthError || pasError)?'myInput error--input':'myInput'}
                               placeholder='Пароль'
                               value={pas}
                               type={"password"}
                        onChange={(e)=>setPas(e.target.value)}/>
                        {pasError && <span className="error">{pasError}</span>}
                        {AuthError&& <p className='error'>{AuthError}</p>}
                        <button className="myBtn">Продолжить</button>
                    </form>
                    <div className='reg__nav'>
                        <button  onClick={()=>router('/registration')} className='reg__link'>Зарегистрироваться</button>
                        <button onClick={()=>router(ATMS)} className='reg__link'>Ближайшие банкоматы</button>
                    </div>
                </div>
            }
            {state === 'Confirm' &&
                <EmailConfirm code={code}
                              setCode={setCode}
                              state={'SignIn'}
                              setState={setState}
                              confirm={confirm}
                              request={siqnIn}
                              error={AuthError}/>
            }
        </>
    );
};

export default observer(Auth);