import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {CartService} from 'src/app/services/cart.service';
import {environment} from 'src/environments/environment';
import {PaymentService} from "../../services/payment.service";
import {isPlatformBrowser} from "@angular/common";
import {Router} from "@angular/router";
import {WindowRef} from "../../services/WindowRef";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any;
  baseUrl = ''
  orderProceed = false
  order = {
    address: '',
    cartId: ''
  }

  redirect = false

  constructor(
    private cartService: CartService,
    private toast: ToastrService,
    private paymentService: PaymentService,
    private windowRef: WindowRef,
    private router: Router
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
  createOrderAndProceedForPayment() {

    this.order.cartId = this.cart.cartId
    console.log(this.order);

    this.cartService.createOrder(this.order).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toast.success("Order Created")
        this.loadCart()
        this.toast.success("Redirecting to payment page")
        this.redirect = true
        this.startPaymentComponent(data.orderAmount, data);

      },
      error: (error) => {
        console.log(error);
        this.toast.error("Error in creating order")

      }
    })

  }

  private startPaymentComponent(number: number, userOrder: any) {
    this.paymentService.startPayment(number).subscribe({
      next: (data: any) => {
        console.log(data)
        // this.toast.success("Order Created For payment")
        // open the form

        if (data.message === 'CREATED') {
          let options: any = {
            "key": "rzp_test_Hp2rdy1ivO3J3p", // Enter the Key ID generated from the Dashboard
            "amount": data.price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "LCWD Payment",
            "description": "This is ecommerce payment",
            "image": "https://learncodewithdurgesh.com/_next/image?url=%2Fimages%2Fdurgesh_sir.webp&w=1920&q=75",
            "order_id": data.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "https://learncodewithdurgesh.com",
            "prefill": {
              "name": "",
              "email": "",
              "contact": ""
            },
            "notes": {
              "address": ""
            },
            "theme": {
              "color": "#3399cc"
            }
          };


          options.handler = (response: any) => {

            response['user_order_id'] = userOrder.orderId;

            console.log(response)


            this.paymentService.successPayment(response).subscribe({
              next: (res: any) => {
                console.log(res)
                if (res.captured) {
                  this.router.navigate(['/orders'])
                  this.toast.success("Payment done : We are forwarding your order.")
                }


              }
            })


          }


          const rzp = new this.windowRef.nativeWindow.Razorpay(options);
          rzp.open()

        }


      },
      error: error => {
        console.log(error)
        this.toast.error("Error in creating order for payment")
      }
    })
  }


}
