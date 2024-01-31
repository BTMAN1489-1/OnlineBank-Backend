import React, {useState} from 'react';
import './CardList.css'
import './Arrow.css'
import CardItem from "./CardItem";
import BillItem from "./BillItem";
import CreditCard from "./CreditCard";
import {observer} from "mobx-react-lite";

const ItemList = ({cards, title}) => {
    const[visible, setVisible] = useState(true)

    return (
        <div className="list_type">
            <div  onClick={()=>setVisible(!visible)}
                  className="title_list">
                <p className="name_list" >{title}</p>
                <div className={visible?"arrow isvis": "arrow"}>
                </div>
            </div>

            <div id="list-content" className="list_accounts" style={visible?{display:"flex"}:{display:"none"}}>
                {cards.length !== 0 && title === 'Карты' &&
                    cards.map((card) =>
                        <CardItem key={card.card_name}
                                  card={card}/>
                    )}
                {cards.length !== 0 && title === 'Счета' &&
                    cards.map((card) =>
                       <BillItem bill = {card} key={card.account_number}/>
                    )}
                {cards.length !== 0 && title === 'Кредиты' &&
                    cards.map((card) =>
                        <CreditCard key={card.account_number}
                                  credit={card}/>
                    )}
            </div>
        </div>
    );
};

export default observer(ItemList);