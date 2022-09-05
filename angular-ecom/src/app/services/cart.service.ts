import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private httpClient:HttpClient
  ) { 

  }

  //get cart items
  getCart(){
    return this.httpClient.get(`${environment.baseUrl}/carts/`)
  }

  //add item to cart
  addItemToCart(productId:number,quantity:number){
    return this.httpClient.post(`${environment.baseUrl}/carts/`,{
      productId:productId,
      quantity:quantity
    })
  }

  //remove item from cart:
  removeItemFromCart(productId:number){
    return this.httpClient.put(`${environment.baseUrl}/carts/${productId}`,{})
  }


}
