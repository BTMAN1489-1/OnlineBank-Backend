import {action, makeObservable, observable, runInAction} from "mobx";
import PersonService from "../service/PersonService";
import AuthService from "../service/AuthService";
import axios from "axios";
import {AUTH} from "../http/path";

class UserStore{
    person = {firstName:'', lastName:'', thirdName:'',sex:'', email:'', telephone:'', login:'' }
    Load = false
    isAuth = false
    tfa = ''
    AuthError = null;
    constructor() {

        makeObservable(this, {
            Load:observable,
            isAuth:observable,
            tfa:observable,
            AuthError:observable,
            person:observable,
            setAuth:action,
            setAuthError:action,
            setLoad:action
        })
    }

    setTfa(t){
        this.tfa = t
    }
    setAuth(b){
        this.isAuth = b;
    }
    setLoad(b){
        this.Load = b;
    }
    setAuthError(s){
        this.AuthError = s;
    }
    logout = ()=>{
        this.setAuth(false)
        localStorage.removeItem('token')
        localStorage.removeItem('ref_token')
    }
    SiqnIn = async (login, pas)=>{
        try{
            const response = await AuthService.login(login, pas)
            this.setTfa(response.data.tfa_token)
            this.setAuthError(null)
        }catch (e) {
            this.setAuthError(e.response.data.detail)
        }
    }
    ConfirmLogin = async(code)=>{
        try{
            const response = await AuthService.confirmation(this.tfa, code)
            this.setAuthError(null)
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('ref_token', response.data.refresh_token)
            this.setAuth(true)
        }catch (e) {
            console.log(e.response.data.detail)
        }
    }
    SiqnUp = async (account, login, pas, rePas)=>{
        try {
            const response = await AuthService.registration(account, login, pas, rePas);
            this.setTfa(response.data.tfa_token)
            this.setAuthError(null)
        }catch (e) {
            this.setAuthError(e.response.data.detail)
        }
    }
    ConfirmReg = async(code)=>{
        try {
            const response = await AuthService.confirmRegistration(this.tfa, code)
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('ref_token', response.data.refresh_token)
            this.setAuth(true)
            this.setAuthError(null)
        }catch (e) {
            this.setAuthError(e.response.data.detail)
        }
    }
    checkAuth = async ()=>{
        this.setLoad(true);
        try {
            const response =  await axios.post(AUTH +'update_api_tokens/',
                {refresh_token:localStorage.getItem('ref_token')},
                {withCredentials: true})
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('ref_token', response.data.refresh_token)
            this.setAuth(true)
        }catch (e) {

        }
        finally {
            this.setLoad(false);
        }
    }

    getPersonInfo =  async ()=>{
            try{
                this.setLoad(true);
                const response = await PersonService.personInfo();
                runInAction(()=> {
                    this.person.firstName = response.data.first_name;
                    this.person.lastName = response.data.second_name;
                    this.person.thirdName = response.data.third_name;
                    this.person.sex = response.data.sex;
                    this.person.login = response.data.login;
                    this.person.email = response.data.email;
                    this.person.telephone = response.data.phone_number;
                    this.setLoad(false)
                })
            }catch (e){

                this.setLoad(false);
            }
    }
}
export default new UserStore();