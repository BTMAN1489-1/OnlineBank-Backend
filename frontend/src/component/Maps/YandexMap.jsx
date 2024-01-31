import React, {useEffect, useState} from 'react';
import {GeolocationControl, Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import './Maps.css'
import ToAllService from "../../service/ToAllService";
import PointItem from "./PointItem";
import Loading from "../reUsePages/Loading";

const YandexMap = () => {
    const[coord, setCoords] = useState([])
    const [point, setPoint] = useState( [43.025143920543236, 131.89073607706007])
    const[isLoad, setIsLoad] = useState(false)

    useEffect(() => {
        setIsLoad(true)
        const gerCoord = async ()=>{
            try{
                const response = await ToAllService.gerCoords()
                setCoords(response.data)
                setIsLoad(false)
            }catch (e){
                alert('Ошибка')
            }
        }
        gerCoord()

    }, []);
    return (
        <YMaps query={{apikey:"008189ba-0f43-41e3-a99d-0581c46ee5d5"}}>
                <div className="yandex-map">
                    {coord.length !== 0 &&
                        <div className="address_list">
                            <h2 style={{marginBottom: "4%"}}>Отделения банка</h2>
                            {isLoad ?
                                <Loading/>
                                : <>
                                    {coord.map((c) => (
                                        <PointItem key={c.latitude}
                                                   coord={point}
                                                   setPoint={setPoint}
                                                   point={c}/>
                                    ))
                                    }
                                </>
                            }
                        </div>
                    }
                    <Map
                        modules={["geolocation"]}
                        state={{center: point,zoom:18}}
                        className={"map"}

                    >
                        <GeolocationControl state={{enabled:true}}/>
                        {coord.length !==0 &&
                            <div>
                                { coord.map((c) => (
                                    <div key={c.longitude}>
                                    <Placemark options={{iconColor:"#6B3FA0"}}  geometry={[c.latitude,c.longitude]}/>
                                    </div>
                                ))
                                }
                            </div>
                            }
                    </Map>


                </div>

        </YMaps>
    );
};

export default YandexMap;