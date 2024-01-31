import {action, makeAutoObservable, observable, runInAction} from "mobx";
import CardService from "../service/CardService";

class CardStore {
    cards = [];
    card;
    isLoading = false;
    cardError = null;
    ans = {}
    constructor() {
        makeAutoObservable(this,{
            cards:observable,
            ans:observable,
            card:observable,
            cardError:observable,
            getCards:action,
            setAns:action
        }

        )
    }
    getCards = async () =>{
        try {
            this.isLoading = true
            const response = await CardService.cardList();
            runInAction(()=>{
                this.cards = response.data;
                this.isLoading = false
            })
        } catch (e) {
            this.cardError = e.message
            this.isLoading = false
        }
    }
    setAns = (a)=>{
        this.ans = a;
    }
    newCard = async (account, paySystem)=>{
        try {
            const response = await CardService.openCard(account, paySystem)
            this.setAns(response.data)
            this.cards.push(response.data)
        }catch (e) {
            this.cardError = e.response.data
        }
    }


}
export default new CardStore();