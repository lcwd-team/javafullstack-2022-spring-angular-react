import {HttpClient} from '@angular/common/http';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  @Output()
  public cartEmitter = new EventEmitter<any>()

  constructor(
    private httpClient: HttpClient
  ) {

  }


  cartChanged(cart: any) {
    this.cartEmitter.emit(cart);
  }


  //get cart items
  getCart() {
    return this.httpClient.get(`${environment.baseUrl}/carts/`)
  }

  //add item to cart
  addItemToCart(productId: number, quantity: number) {
    return this.httpClient.post(`${environment.baseUrl}/carts/`, {
      productId: productId,
      quantity: quantity
    })
  }

  //remove item from cart:
  removeItemFromCart(productId: number) {
    return this.httpClient.put(`${environment.baseUrl}/carts/${productId}`, {})
  }

  //create order
  createOrder(order: any) {
    return this.httpClient.post(`${environment.baseUrl}/orders/`, order)
  }

  //get orders
  getOrders() {
    return this.httpClient.get(`${environment.baseUrl}/orders/`)

  }

  //get all orders

  getAllOrders() {
    return this.httpClient.get(`${environment.baseUrl}/orders/all`)

  }


}
