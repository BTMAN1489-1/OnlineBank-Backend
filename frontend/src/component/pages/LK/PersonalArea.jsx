import React, {useState} from 'react';
import LK from "./LK";
import ChangePassword from "./PersonAbility/ChangePassword";
import ChangeLogin from "./PersonAbility/ChangeLogin";

const PersonalArea = () => {
    const [state, setState] = useState('LK')
    return (
        <>
            {state ==='LK' && <LK setState={setState}/>}
            {state ==='pas' && <ChangePassword setSt={setState}/>}
            {state === 'login' && <ChangeLogin setSt={setState}/>}
        </>
    );
};

export default PersonalArea;