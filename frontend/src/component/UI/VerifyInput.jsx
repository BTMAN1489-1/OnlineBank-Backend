import React from 'react';
import './confirmCodeInput.css'
import VerificationInput from "react-verification-input";
const VerifyInput = ({code, setCode}) => {
    return (
        <>
        <VerificationInput
            value={code}
            length={6}
            classNames={
                {container:"container",
                    character:"character",
                    characterFilled:"character--filled",
                    characterSelected:"character--selected"}
            }
            autoFocus={true}
            validChars="0-9"
            placeholder={' '}
            onChange={(e)=>setCode(e)}/>
        </>
    );
};

export default VerifyInput;