import React, {useState} from 'react';
import '../../../styles/Common.css'
import '../LK.css'
import '../../Auth/Auth.css'
import AccessChange from "./AccessChange";
import EmailConfirm from "../../../reUsePages/EmailConfirm";
import PersonService from "../../../../service/PersonService";
import Input from "../../../UI/defaultUI/Inputs/Input";
import UserStore from "../../../../store/UserStore";
import {useNavigate} from "react-router-dom";
import {EMPTY_FIELD} from "../../../../consts/StringConsts";
import Loading from "../../../reUsePages/Loading";

const ChangePassword = ({setSt}) => {
    const {person} = UserStore

    const[state, setState] = useState('changePass')
    const [error, setError] = useState(null)
    const [pas, setPas] =useState('')
    const[pas1, setPas1]= useState('')
    const[tfa, setTfa] = useState(null)
    const [code, setCode] = useState('')
   const [isLoad, setIsLoad] = useState(false)

    const nav = useNavigate()
    const checkPas = async (e)=>{
        e.preventDefault()
        if(pas!=pas1) {
            setError('Пароли не совпадают')
            return
        }
        try {
            setIsLoad(true)
            const response = await PersonService.changePas(pas, pas1)
            setState('Confirm')
            setTfa(response.data.tfa_token)
            setError(null)
            setIsLoad(false)

        }catch (e) {
            setIsLoad(false)
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
            setIsLoad(true)
            const response = await PersonService.confirmChange(tfa, code)
            setError(null)
            setState('execute')
            setIsLoad(false)
        }catch (e){
            setError(e.response.data.detail)
            setIsLoad(false)
        }
    }
    return (
        <>
                {state === 'changePass'&&
                    <div className='changefield info_box'>
                        {isLoad? <Loading/>:
                            <>
                        <div onClick={()=>setSt('LK')} className="back--btn"></div>
                        <div className="userData">
                            <form onSubmit={e => checkPas(e)}>
                                <h1>Измененить пароль</h1>
                                <br/>
                                <Input
                                    value={pas}
                                    setValue={setPas}
                                    text={"Новый пароль"}
                                    error={error}
                                    type={"password"}
                                />
                                <Input
                                    value={pas1}
                                    setValue={setPas1}
                                    text={"Подтвердите пароль"}
                                    type={"password"}
                                />
                                {error && <p className='error'>Пароли не совпадают</p>}
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <button className='myBtn'>Подтвердить</button>
                                </div>
                            </form>
                        </div>
                            </>}
                    </div>

                }
                {state === 'execute' &&
                  <div className="changefield info_box" style={{padding:"2%"}}>
                      <h2>Пароль успешно изменен</h2>
                      <br/>
                      <button className={"myBtn"} onClick={()=>nav('/home')}>На главную</button>
                  </div>
                }
            {state ==='Confirm'&&
                <>
                {isLoad? <div className="info_box changefield"><Loading/></div>
                        :
                        <EmailConfirm
                            request={checkPas}
                            state={'changePass'}
                            setState={setState}
                            code={code}
                            setCode={setCode}
                            confirm={ConfirmChange}
                            error={error}/>
                }
                </>
            }
        </>
    );
};

export default ChangePassword;