import axios from 'axios'
import { checkLogin, getToken } from '../auth'

export const BASE_URL='http://localhost:8081'
export const http=axios.create({
    baseURL:BASE_URL
})

export const privateHttp=axios.create({
  baseURL:BASE_URL    
})

privateHttp.interceptors.request.use(request=>{

    console.log("interceptor executed");
    //change the request :add the Authorization header
    let token=getToken()
    if(token){
        console.log("token added to header")
        request.headers.common.Authorization=`Bearer ${token}`
    }
    return request;
}, error=>Promise.reject(error))
