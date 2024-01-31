import $api from "../http";
import {API} from "../http/path";
import axios from "axios";

export default class TransferService {
    static async Transfer(amount, from, to, description, cardFrom, cardTo){
            return $api.post(API +'transfer_money/',{
                amount_money:amount,
                account_send: from,
                account_recv:to,
                card_number_send:cardFrom,
                card_number_recv:cardTo,
                description:description
            })
    }
    static async confirmTransfer(tfa, code){
        return $api.put(API+'transfer_money/', {
            tfa_token:tfa,
            confirm_code:code
        })
    }
    static async isClient(account){
        return axios.get(API + 'has_account/', {params:{
                account_number:account
            }
        })
    }
    static async getHistory(account, token){
        return $api.get(API + 'get_operations/', {
            params:{
                account_number:account,
                token_card:token,
                status_operation:'success'
            }
        })
    }
}
