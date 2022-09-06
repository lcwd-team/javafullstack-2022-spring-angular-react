import { privateHttp } from "./axios-helper"

export const addItemToCart=(productId,quantity)=>{
        return privateHttp.post(`/carts/`,{
            productId:productId,
            quantity:quantity
        }).then(response=>response.data)
}

export const getCart=()=>{
    return privateHttp.get(`/carts/`).then(res=>res.data)
}

export const removeItemFromCart=(productId)=>{
    return privateHttp.put(`/carts/${productId}`).then(res=>res.data)
}