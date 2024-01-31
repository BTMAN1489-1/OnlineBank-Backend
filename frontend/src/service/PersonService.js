import $api from "../http";
import {API, AUTH} from "../http/path";

export default class PersonService{
    static async personInfo(){
        return await $api.get(API+'user_info/')
    }
    static async changePas(pas , rePas){
        return await $api.post(AUTH+ 'change_auth/',{
            password:pas,
            re_password:rePas
        })
    }
    static async changeLogin(login){
        return await $api.post(AUTH+ 'change_auth/',{
            new_login:login
        })
    }
    static async confirmChange(tfa, code){
        return await $api.put(AUTH + 'change_auth/',{
            tfa_token:tfa,
            confirm_code:code
        })
    }
}