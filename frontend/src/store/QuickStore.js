import {action, makeAutoObservable, observable} from "mobx";

class QuickStore{
    where='';
    sum = '';
    description='';
    flag = false;
    currency ='';
    from=''

    setWhere=(where)=>{
        this.where = where;
    }
    setFrom = (bill)=>{
        this.from = bill;
    }
    setCurrency = (charCode)=>{
        this.currency = charCode
    }

    setSum = (s) =>{
        this.sum = s;
    }


    setDescription = (desc)=>{
        this.description = desc;
    }

    setFlag = (b)=>{
        this.flag = b;
    }

    constructor() {
        makeAutoObservable(this,{
            where:observable,
            sum:observable,
            description:observable,
            flag:observable,
            currency:observable,
            setSum:action,
            from:observable,
            setFrom:action,
            setWhere:action,
            setDescription:action,
            setFlag:action,
            setCurrency:action
        })
    }

    clearStore = ()=>{
        this.setDescription('');
        this.setSum('');
        this.setWhere('');
        this.setFlag(false)
    }

}
export default new QuickStore()