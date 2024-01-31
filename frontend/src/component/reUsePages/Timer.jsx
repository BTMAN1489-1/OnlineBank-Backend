import React from 'react';

const Timer = ({Request, error}) => {
    const [ seconds, setSeconds ] = React.useState(200);

    React.useEffect(() => {
        if (seconds > 0 ) {
            setTimeout(setSeconds, 1000, seconds - 1);
        }
    }, [seconds]);
    const getTime = ()=>{
        let min = Math.floor(seconds/60)
        let sec = seconds %60
        if(sec > 9) return (min + `:${sec}`)
        else  return (min + `:0${sec}`)
    }
    const onClickHandler=(e)=>{
        setSeconds(200)
        Request(e)
    }
    return (
        <div>
            {seconds && !error?
                <p style={{marginLeft:"10px", color:"grey"}}>Через {getTime()} код можно получить повторно</p>
                :
                <button onClick={onClickHandler} className="btn__link">Отправить код повторно</button>
            }
        </div>
    );
};

export default Timer;