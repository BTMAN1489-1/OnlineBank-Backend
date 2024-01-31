import axios from "axios";
import {API, AUTH} from "../http/path";

export default class AuthService{
    static async registration(account, login,  password, re_password ){
        return axios.post(AUTH + 'registration/',
            {account, login, password, re_password})
    }
    static async login(login,  password){
        return axios.post(AUTH, {login, password}).catch(function (error){
            if(error.response) {
                return Promise.reject(error)
            }
    });
    }
 
    static async has_acc(account){
        return axios.get(API+ 'has_account/', {
            params:{
                account_number:account
            }
        })
    }
    static async confirmation(tfa_token, confirm_code){
        return axios.put(AUTH, {
            tfa_token:tfa_token,
            confirm_code:confirm_code
        })
    }
    static async confirmRegistration(tfa, code){
        return axios.put(AUTH +'registration/',{
            tfa_token:tfa,
            confirm_code:code
        })
    }
    static async refreshToken(){

    }
}