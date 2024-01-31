import {action, makeAutoObservable, observable, runInAction} from "mobx";
import CardService from "../service/CardService";

class AccountStore {
    bills = [{account_number:'', currency:''}];
    bill
    debit =[];
    credit = [];
    ans = {}

    billExcept =[]
    billTo = ''

    isLoad = false;
    error = null;

    constructor() {
        makeAutoObservable(this, {
            bill:observable,
            bills:observable,
            debit:observable,
            credit:observable,
            changeBill:action,
            changeBillTo:action,
            ans:observable,
            getAccounts:action,
            changeBillExcept:action
        })
    }

    getAccounts = async () =>{
        try {
            this.isLoad = true
            const response = await CardService.accountsList();
            runInAction(()=>{
                this.bills =JSON.parse(JSON.stringify(response.data));
                this.debit = response.data.filter((c)=>c.type_account==='debit')
                this.credit = response.data.filter((c)=>c.type_account==='credit')
                this.bill = this.bills[0].account_number
                this.billExcept = this.bills.filter((c)=>c.account_number !==this.bill);
                this.billTo = this.billExcept[0].account_number
                this.isLoad = false
            })
        } catch (e) {
            this.error = e.message
            this.isLoad = false
        }
    }
    getPayAccount =  ()=>{
       return  this.bills.filter((c) => c.balance != 0 ||
            c.description.max_debt_amount > Math.abs(c.balance))
    }
    getPayAccountByCurrency=(charCode)=>{
        return  this.bills.filter((c) => (c.balance != 0 ||
            c.description.max_debt_amount > Math.abs(c.balance)) && c.currency === charCode)
    }

    newBill = async (currency) => {
        try {
            const response = await CardService.openBill(currency)
            this.ans = response.data
            this.bills.push(response.data)
            this.debit.push(response.data)
            this.error = null
        } catch (e) {
            this.error = e.response.data
        }
    }



}
export default new AccountStore();