import React, {useEffect, useState} from 'react';
import {WEEK_DAY} from "./g";
import Point from "./Point";
import './Maps.css'
const PointItem = ({point, setPoint, coord}) => {
    const date = new Date().toLocaleDateString('en-US', {weekday:"short"})
    const d = new Date()
    const [visible, setVisible] = useState(false)
    const [isWork, setIsWork] = useState()
    const [flag, setFlag] = useState(false)
    useEffect(() => {
            if(coord[0] == point.latitude && coord[1] == point.longitude){

                setFlag(true)
            }else {
                setFlag(false)
            }
    }, [coord]);
    useEffect(() => {
        if(point.description.schedule[date] ==='Круглосуточно' ||
            (d.getHours()>= point.description.schedule[date].slice(0,2) && d.getHours()< point.description.schedule[date].slice(5,7))){
            setIsWork('Открыто')
        }else {
            setIsWork('Закрыто')
        }

    }, []);
    const showSchedule = (e)=>{
        e.stopPropagation()
        setVisible(!visible)
    }
    const setCoord = ()=>{
        setVisible(true)
        setPoint( [point.latitude, point.longitude])
    }
    return (
        <div onClick={setCoord}
             className="point--item"
             style={flag?{background:"whitesmoke"}:{}}
        >
            <div className="row-direct" style={{width:"100%"}}>
                <Point Fill={flag}/>
                <h2 className="address">{point.description["address"]}</h2>
            </div>
            <div className="description">
                <div style={{marginLeft:"30px"}}>
                    <div className="row-direct atm-list">
                        <h4>{point.description.about}:</h4>
                        <p className="atm_line"
                            style={isWork==='Открыто'?{color:"mediumaquamarine"}:{color:"blueviolet"}}>{isWork}</p>
                    </div>
                    <div className="row-direct atm-list">
                        <h4>{WEEK_DAY[date][1]}:</h4>
                        <p className="atm_line">
                            {point.description.schedule[date]}</p>
                    </div>
                </div>
            </div>
            <button
                onClick={showSchedule}
                className="btn__link" >График работы</button>
        <div className="schedule" style={!visible?{display:"none"}:{}}>
            <p className="atm-list"><b>{WEEK_DAY.Mon[0]}</b>: {point.description.schedule.Mon}</p>
            <p className="atm-list"><b>{WEEK_DAY.Tue[0]}</b>: {point.description.schedule.Tue}</p>
            <p className="atm-list"><b>{WEEK_DAY.Wed[0]}</b>: {point.description.schedule.Wed}</p>
            <p className="atm-list"><b>{WEEK_DAY.Thu[0]}</b>: {point.description.schedule.Thu}</p>
            <p className="atm-list"><b>{WEEK_DAY.Fri[0]}</b>: {point.description.schedule.Fri}</p>
            <p className="atm-list"><b>{WEEK_DAY.Sat[0]}</b>: {point.description.schedule.Sat}</p>
            <p className="atm-list"><b>{WEEK_DAY.Sun[0]}</b>: {point.description.schedule.Sun}</p>
        </div>
        </div>
    );
};

export default PointItem;