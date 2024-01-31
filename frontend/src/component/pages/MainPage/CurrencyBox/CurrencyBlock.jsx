import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import '../main.css'
import '../../../styles/Common.css'
import CurrencyStore from "../../../../store/CurrencyStore";
import Loading from "../../../reUsePages/Loading";
import './CurBox.css'
import {useNavigate} from "react-router-dom";
const CurrencyBlock = () => {
    const {course, getCourse, isLoad} = CurrencyStore
    const nav  = useNavigate()
    useEffect(() => {
        if(course.length === 0)
            getCourse()
    }, []);
    return (
        <div className="valute--main  info_box">
            <h2>Валюта</h2>
            <div>
                {isLoad ||course.length === 0 ?
                    <div className="row-direct">
                        <br/>
                        <Loading/>
                    </div>:
                    <>
                        <table className="curTable">
                            <tbody>
                            <tr>
                                <td className="TableTitle" width={"60%"}>Валюта</td>
                                <td className="TableTitle">Купить</td>
                                <td className="TableTitle">Продать</td>
                            </tr>
                            <tr>
                                <td width={"60%"}>{course["USD"].CharCode}
                                <p>{course["USD"].Name}</p>
                                </td>
                                <td>{course["USD"].PurchasePrice} </td>
                                <td className="priceTab"> {course["USD"].SalePrice}</td>
                            </tr>
                            <tr>
                                <td width={"60%"}>{course["EUR"].CharCode}
                                    <p>{course["EUR"].Name}</p>
                                </td>
                                <td>{course["EUR"].PurchasePrice}</td>
                                <td className="priceTab">{course["EUR"].SalePrice}</td>
                            </tr>
                            <tr>
                                <td width={"60%"}>{course["CNY"].CharCode}
                                    <p>{course["CNY"].Name}</p>
                                </td>
                                <td>{course["CNY"].PurchasePrice}</td>
                                <td className="priceTab">{course["CNY"].SalePrice}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div style={{display:"flex", flexDirection:"column", alignItems:"start"}}>
                            <button
                                onClick={()=>nav('/currency')}
                                className="btn__link">Смотреть все</button>
                            <button
                                onClick={()=>nav('/buyvalute/USD')}
                                className="btn__link">Обменять</button>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default observer(CurrencyBlock)
;