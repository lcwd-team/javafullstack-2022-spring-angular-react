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
  baseUrl=''

  constructor(
    private cartService:CartService,
    private toast:ToastrService
  ) {

    this.baseUrl=environment.baseUrl
   }

  ngOnInit(): void {
    this.loadCart()
  }
  loadCart() {
  
    this.cartService.getCart().subscribe(
      {
        next:data=>{
          console.log(data);
          this.cart=data
          
        },
        error:error=>{
          console.log(error)
        }
      }
    )

  }
  
  removeItem(item:any){
    this.cartService.removeItemFromCart(item.product.productId).subscribe({
      next:data=>{
        console.log(data);
        this.cart=data
        this.toast.success("Item is removed from cart")
        
      },
      error:error=>{
        console.log(error);
        
      }
    })
  }

  quantityChange(productId:any,quantity:any){
    this.cartService.addItemToCart(productId,quantity).subscribe({
      next:data=>{
        console.log(data);
        this.cart=data
        this.toast.success("Quantity Changes")
        
      },
      error:error=>{
        console.log(error);
        
      }
    })
  }

}
