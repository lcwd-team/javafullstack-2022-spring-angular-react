import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any;
  baseUrl = ''
  orderProceed=false
  order={
    address:'',
    cartId:''
  }

  redirect=false

  constructor(
    private cartService: CartService,
    private toast: ToastrService
  ) {

    this.baseUrl = environment.baseUrl
  }

  ngOnInit(): void {
    this.loadCart()
  }
  loadCart() {

    this.cartService.getCart().subscribe(
      {
        next: data => {
          console.log(data);
          this.cart = data
          this.cartService.cartChanged(this.cart)
        

        },
        error: error => {
          console.log(error)
        }
      }
    )

  }

  removeItem(item: any) {
    this.cartService.removeItemFromCart(item.product.productId).subscribe({
      next: data => {
        console.log(data);
        this.cart = data
        this.toast.success("Item is removed from cart")
        this.cartService.cartChanged(this.cart)
      },
      error: error => {
        console.log(error);
        this.toast.error(error.error)

      }
    })
  }

  quantityChange(productId: any, quantity: any) {
    this.cartService.addItemToCart(productId, quantity).subscribe({
      next: data => {
        console.log(data);
        this.cart = data
        this.toast.success("Quantity Changes")
        this.cartService.cartChanged(this.cart)
      },
      error: error => {
        console.log(error);

      }
    })
  }

  //createOrderAndProceedForPayment
  createOrderAndProceedForPayment(){

    this.order.cartId=this.cart.cartId
    console.log(this.order);
    
    this.cartService.createOrder(this.order).subscribe({
      next:data=>{
        console.log(data);
        this.toast.success("Order Created")
        this.loadCart()
        this.toast.success("Redirecting to payment page")
        this.redirect=true
        
      },
      error:(error)=>{
        console.log(error);
        this.toast.error("Error in creating order")
        
      }
    })

  }

}
