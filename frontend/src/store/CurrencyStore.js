import ToAllService from "../service/ToAllService";
import {action, makeAutoObservable, observable, runInAction} from "mobx";

class CurrencyStore{
    course =[]
    val = null
    isLoad = false
    from = ''
    total = ''
    buy = 0
    setCourse = (a)=>{
        this.course = a;
    }
    setFrom = (b)=>{
        this.from=b;
    }
    setBuy = (sum)=>{
        this.buy=sum;
    }
    setTotalSum = (sum)=>{
        this.total = sum;
    }
    setVal = (charCode)=>{
        this.val = charCode;
    }
    setIsLoad = (b)=>{
        this.isLoad = b;
    }
    constructor() {
        makeAutoObservable(this, {
            course:observable,
            val:observable,
            isLoad:observable,
            from:observable,
            total:observable,
            buy:observable,
            setCourse:action,
            setIsLoad:action,
            setVal:action,
            setBuy:action,
            setFrom:action,
            setTotalSum:action
        })
    }
    getCourse = async ()=>{
        try {
            this.setIsLoad(true)
            const response = await ToAllService.getValuta()
            runInAction(()=>{
                this.setCourse(response.data)
                this.setIsLoad(false)
            })

        }catch (e){
            this.setIsLoad(false)
        }
    }
}
export default new CurrencyStore()