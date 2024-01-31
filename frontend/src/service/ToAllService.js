import axios from "axios";
import {API} from "../http/path";

export default class ToAllService{
    static async getValuta(){
        return await axios.get(API + 'get_currencies/')
    }
    static async gerCoords(){
        return await axios.get(API+'get_atm/')
    }

}