import React from 'react';
import '../../styles/Common.css'
import './LK.css'
import {observer} from "mobx-react-lite";
import Description from "../../UI/Description";
import UserStore from "../../../store/UserStore";
import Loading from "../../reUsePages/Loading";

export const LK =observer (({setState}) => {
   const {person, Load } = UserStore
    return (
        <>
            {Load ?
                <div className="personal info_box">
                        <Loading/>
                </div>
                    :
            <div className="personal info_box">
                <br/>
                <h1>Личный кабинет</h1>
                <div className='person'>
                    {person.sex==='female'?
                        <img className="lk_i" src = '/images/women.png'/>
                        :
                        <img className="lk_i" src = '/images/man.png'/>}
                    <p data-testid = "ln" className='lk_name' >{person.lastName} {person.firstName} {person.thirdName}</p>
                </div>
                <div className="lk_about">
                    <Description title={"Телефон:"} text={person.telephone}/>
                    <Description title={"Почта:"} text={person.email}/>
                </div>


                <div className='lk_act'>
                    <div onClick={()=> setState('pas')}
                         className="action">
                        <img className="act_img"
                             width={"50"}
                             height={"50"}
                             src={"/images/key.png"}/>
                        <p className='act_txt'>Изменить пароль</p>
                    </div>

                    <div onClick={()=> setState('login')}
                         className="action">
                        <img className="act_img"
                             width={"50"}
                             height={"50"}
                             src={"/images/rename.png"}/>
                        <p className='act_txt'>Изменить логин</p>
                    </div>
                    {/*<Action*/}
                    {/*    path = {'/editpassword' }*/}
                    {/*    img={'/images/key.png'}*/}
                    {/*    width = "50"*/}
                    {/*    height = "50"*/}
                    {/*    name = {'Изменить пароль'}/>*/}
                    {/*<Action*/}
                    {/*    path = {'/editlogin' }*/}
                    {/*    img={'/images/change.png'}*/}
                    {/*    width = "50"*/}
                    {/*    height = "50"*/}
                    {/*    name={'Изменить логин'}/>*/}
                </div>
            </div>
            }
        </>
    );
});

export default LK;