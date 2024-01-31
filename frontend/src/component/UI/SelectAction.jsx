import React from 'react';
import './Components.css'
const SelectAction = ({flag, setFlag, case1, case2}) => {
    return (
        <div className='select_action'>
            <button
                onClick={()=>setFlag(true)}
                style={flag?{color:'mediumaquamarine'}:{color:'gray'}}
                className='action_btn'>
                {case1}
            </button>
            <button
                onClick={()=>setFlag(false)}
                style={flag?{color:'gray'}:{color:'mediumaquamarine'}}
                className='action_btn'>
                {case2}
            </button>
        </div>
    );
};

export default SelectAction;