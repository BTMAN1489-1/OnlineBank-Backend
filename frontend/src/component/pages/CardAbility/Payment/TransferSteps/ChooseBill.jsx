import React from 'react';
import BillSelect from "../../../../Valuta/BillSelect";
import '../MoneyToSomewhere.css'
const ChooseBill = ({allBills, bills, bill,setBill, billExcept, billTo, setBillExcept, setBillTo}) => {

    const changeBillExcept = (newBill)=>{
        setBill(newBill)
        setBillExcept(allBills.filter((c)=>c.account_number !== newBill))
        if (newBill === billTo) {
            billTo = billExcept[0].account_number;
        }
    }

    return (
        <div className="cardFrom">
            <p>Откуда</p>
            {bills.length &&
                <BillSelect
                    bills={bills}
                    bill={bill}
                    onChange={value => changeBillExcept(value)}/>
            }

            <div className="cardFrom">
                <p>Куда</p>
                {billExcept.length &&
                    <BillSelect
                        bills={billExcept}
                        bill={billTo}
                        onChange={value =>setBillTo(value)}/>
                }
            </div>
        </div>
            );
};

export default ChooseBill;