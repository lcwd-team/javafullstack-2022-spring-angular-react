import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  productId: any;
  productDetail: any;
  baseUrl: string;
 
  constructor(
    private activatedRoute:ActivatedRoute,
    private product:ProductService,
    private toast:ToastrService,
    private cartService:CartService
  ) { 
    this.baseUrl=environment.baseUrl
  }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe((value:any)=>{
      this.productId=value.productId
      this.getProduct();
    })

  }
  getProduct() {
   this.product.loadProductById(this.productId).subscribe({
    next:(data:any)=>{
      console.log(data);
      this.productDetail=data;
      
    },
    error:(error)=>{
      console.log(error);
      this.toast.error("Error in loading product")
      
    }
   })
  }

   //add item to card

   addToCart(){
    this.cartService.addItemToCart(this.productDetail.productId,1).subscribe({
      next:data=>{
        console.log(data);
        this.toast.success("Item added to card")
        this.cartService.cartChanged(data)
      },
      error:error=>{
        console.log(error);
        this.toast.error("Error while adding to cart")
        
      }
    })
  }


}
