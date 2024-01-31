import React, {useState} from 'react';
import '../../../styles/Common.css'
import '../LK.css'
import EmailConfirm from "../../../reUsePages/EmailConfirm";
import AccessChange from "./AccessChange";
import PersonService from "../../../../service/PersonService";
import Input from "../../../UI/defaultUI/Inputs/Input";
import {EMPTY_FIELD} from "../../../../consts/StringConsts";
import Loading from "../../../reUsePages/Loading";

const ChangeLogin = ({setSt}) => {
    const [state, setState] = useState('Login')
    const [login, setLogin] = useState('')
    const[error, setError] = useState(null)
    const [loginError, setLoginError] = useState(null)
    const [code, setCode] = useState('')
    const [tfa, setTfa] = useState()
    const [load, setLoad] = useState()
    const changeLog = async (e)=>{
        e.preventDefault()
        if(!login){
            setLoginError(EMPTY_FIELD)
            return
        }
        try {
            setLoad(true)
            const response = await PersonService.changeLogin(login)
            setState('Confirm')
            setTfa(response.data.tfa_token)
            setLoginError(null)
            setLoad(false)
        }catch (e) {
            setLoad(false)
            setError(e.response.data.detail)
        }
    }
    const ConfirmChange =async (e)=>{
        e.preventDefault()
        if(!code){
            setError(EMPTY_FIELD)
            return
        }
        try{
            setLoad(true)
            const response = await PersonService.confirmChange(tfa, code)
            setError(null)
            setState('execute')
            setLoad(false)
        }catch (e){
            setLoad(false)
           setError(e.response.data.detail)
        }
    }
    
    return (
        <>
            {state ==='Login' &&
            <div className="changefield info_box">
                {load?<Loading/>:
                    <>
                        <div onClick={() => setSt('LK')}
                             className="back--btn"></div>
                        <div className="userData">
                            <form onSubmit={changeLog}>
                                <h1>Измененить логин</h1>
                                <br/>
                                <Input
                                    value={login}
                                    setValue={setLogin}
                                    text={"Новый логин"}
                                />
                                {loginError && <p className='error'>{loginError}</p>}
                                <button onClick={e => changeLog(e)} className='myBtn'>Подтвердить</button>
                            </form>
                        </div>
                    </>}
            </div>
            }
            {state ==='Confirm' &&
                <>
                    {load ? <div className='changefield info_box'><Loading/></div> :
                        <EmailConfirm
                            setCode={setCode}
                            confirm={ConfirmChange}
                            setState={setState}
                            state={'Login'}
                            error={error}
                            request={changeLog}
                            code={code}/>
                    }
                </>
            }
            {state==='execute' &&
                <AccessChange action={'Логин успешно изменен'}/>
            }
        </>
    );
};

export default ChangeLogin;