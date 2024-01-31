import React from 'react';
import CurrencyInput from "react-currency-input-field";
import '../defaultUI.css'

const CurInput = ({sum, setSum, error, text, suf}) => {
    return (
        <CurrencyInput
            className={error?"myInput error--input":"myInput"}
            placeholder={(text !== null) ? text : "Сумма платежа"}
            decimalsLimit={2}
            allowDecimals={true}
            defaultValue={sum}
            decimalSeparator={'.'}
            allowNegativeValue={false}
             maxLength={9}
            suffix={suf}
            onValueChange={(e) => setSum(e)}
        />
    );
};

export default CurInput;