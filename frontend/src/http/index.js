import axios from "axios";
import {AUTH} from "./path";


const $api = axios.create({
    withCredentials:true,
    headers:{
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
})

$api.interceptors.request.use((config)=>{
    config.headers.Authorization =localStorage.getItem('token')

    return config;
})

$api.interceptors.response.use((congig)=>{
    return congig;
},async (error)=>{
    const request = error.config;
    request._isExecute = false
    if(error.response.status == 403 && !request._isExecute) {
        request._isExecute = true
        const response = await axios.post(AUTH+'update_api_tokens/',
            {refresh_token:localStorage.getItem('ref_token')},
            {withCredentials: true})
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('ref_token', response.data.access_token);
        return $api.request(request);
    }
    else  {
        return Promise.reject(error)
    }
    })

export default $api;