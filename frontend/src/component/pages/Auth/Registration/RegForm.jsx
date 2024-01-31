import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import TransferService from "../../../../service/TransferService";
import {ACCOUNT_PATTERN, EMPTY_FIELD, USER_DOESNT_EXIST} from "../../../../consts/StringConsts";
import {billFormat} from "../../../../utils/Format";
import '../Auth.css'
import '../../../styles/Common.css'
import EnterLogin from "./EnterLogin";

const RegForm = () => {
    const router = useNavigate()
    const [state, setState] = useState('SignUp')

    const [account, setAccount] = useState('')
    const[error,setError] = useState(null)
    const inital= async (e)=>{
        e.preventDefault()
        let acc_er = !account?EMPTY_FIELD:(account.replace(/\s/g, ' ').length<20?ACCOUNT_PATTERN:null)
        setError(acc_er)
        if(acc_er)return
        try {
            const response = await TransferService.isClient(account.replace(/\s/g, ''))
            if(Boolean(response.data.has_account)){
                setState('Reg')
                setError(null)
            }else {
                setError(USER_DOESNT_EXIST)
            }
        }catch (e){
          alert('Ошибка')
        }
    }


    return (
        <>
            {state ==='SignUp' &&
                <div className='reg__modal'>
                    <button onClick={()=>router('/')}
                            className='reg__link'>На главную</button>
                    <br/>
                    <h1>Регистрация</h1>
                    <br/>
                    <p style={{marginRight:"auto"}}>Введите номер счета</p>
                    <input
                        value={account}
                        placeholder="Номер счета"
                        className={error ?"myInput error--input": "myInput"}
                        onChange={e => billFormat(e.target.value, setAccount)}
                    />
                    {error&& <span className="error">{error}</span>}
                    <button onClick={e=>inital(e)}
                            className="myBtn">Продолжить</button>
                </div>
            }
            {
                state==='Reg' &&
                <EnterLogin setState={setState}  account={account}/>
            }

        </>
    );
};

export default observer(RegForm);