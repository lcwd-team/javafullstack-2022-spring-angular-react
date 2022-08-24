import axios from "axios";

const BASE_URL='http://localhost:8081'

export const createUser=(data)=>{
    return axios.post(`${BASE_URL}/users/`,data).then(response=>response.data)
}