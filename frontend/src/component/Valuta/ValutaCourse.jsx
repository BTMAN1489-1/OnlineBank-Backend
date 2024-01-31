import React, {useEffect} from 'react';
import '../styles/Common.css'
import './valute.css'
import ValuteItem from "./ValuteItem";
import {observer} from "mobx-react-lite";
import ValutaStore from "../../store/CurrencyStore";
import Loading from "../reUsePages/Loading";

const ValutaCourse = () => {
    const {course, isLoad, getCourse} = ValutaStore

    useEffect(() => {
        if(course.length === 0)
            getCourse()
    }, []);

    return (
        <>
            {isLoad?
                <div className="info_box val_list" style={{flexDirection:"row"}}>
                   <Loading/>
                </div>
               :
                <div className='val_list info_box'>
                    {Object.values(course).map((c) =>
                        <ValuteItem key={c.CharCode} cur = {c} CharCode={c.CharCode} Nominal={c.Nominal}
                         PurchasePrice={c.PurchasePrice} Name={c.Name} SalePrice={c.SalePrice}/>
                    )}
                </div>
                }
            </>
    );
};

export default observer(ValutaCourse);