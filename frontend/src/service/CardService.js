import $api from "../http";
import {API} from "../http/path";

export default class CardService{
    static async cardList() {
        return $api.get(API +'get_cards/')
    }
    static async accountsList(type){
        return  await  $api.get(API+'get_accounts/',
        { params:{
            type_account:type
            }
        });
    }
    static async cardById(token_card){
        return $api.get(API+'get_cards/', {
            params:{
                token_card:token_card
            }
        })
    }
    static async billById(account_number){
        return $api.get(API+'get_accounts/',{
            params:{
                account_number:account_number
            }
        })
    }
    static async openBill(currency){
        return await $api.post(API + 'create_account/',
            {
                currency:currency
            });
    }
    static async openCard(account, paySystem){
        return await $api.post(API + 'create_card/',
            {
                account:account,
                payment_system:paySystem
            })
    }
    static async ChangeCardState(token, status){
        return await $api.post(API + 'change_status_card/',{
            token_card:token,
            is_activated:status
        })
    }
}