import React, {useEffect} from 'react';
import './CardList.css'

import {useLocation} from "react-router-dom";
import AccountStore from "../../../store/AccountStore";
import {observer} from "mobx-react-lite";
import CardStore from "../../../store/CardStore";
import UserStore from "../../../store/UserStore";
import ItemList from "./ItemList";
import Loading from "../../reUsePages/Loading";

export const CardList = observer( () => {
    const {isAuth} = UserStore;
    const {getAccounts, credit,debit, isLoad, bills} = AccountStore;
    const {getCards, isLoading, cards} = CardStore;
    const  p = useLocation()

    useEffect(() => {
        getAccounts()
    }, []);
    useEffect(() => {
        getCards()
    }, []);
    if (p.pathname === '/atm' || p.pathname === '/currency' || !isAuth)
        return null
    return (
        <div className="new_cardList">
            {(isLoad || isLoading) ?
                <div className="title_list" >
                <Loading/>
                </div>
                :
                <>
                    <ItemList cards={bills} title={"Счета"}/>
                    <ItemList cards={cards} title={"Карты"}/>
                    <ItemList cards={credit} title={"Кредиты"}/>
                </>
            }
        </div>

    );
});

export default CardList;