import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  categories: any
  products: any;
  categoryId: any

  constructor(
    private category: CategoryService,
    private product: ProductService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private cartService:CartService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((values: any) => {
      this.products=undefined
      this.pageNumber=0
      console.log(values.categoryId);
      this.categoryId = values.categoryId
      this.getProducts(values.categoryId, this.pageNumber, this.pageSize)
    })
    this.getCategories()
  }


  getCategories() {
    this.category.loadCategories().subscribe({
      next: (data) => {
        //success
        console.log(data);
        this.categories = data
      },
      error: (error) => {
        //error
        console.log(error);
        this.toast.error("Error in loading categories")
      },
      complete: () => {
      }
    })

  }



  getProducts(categoryId: any, pageNumber: any, pageSize: any) {
    let ob: any
    if (categoryId.trim() === 'all') {
      ob = this.product.loadProducts(pageSize = pageSize, pageNumber = pageNumber)
    } else {
      ob = this.product.loadProductsByCategory(categoryId, pageSize = pageSize, pageNumber = pageNumber)
    }
    ob.subscribe({
      next: (data: any) => {
        console.log(data);
        if (this.products) {
          //already data is there
          this.products.content = this.products.content.concat(data.content)
          this.products.lastPage = data.lastPage
          this.products.pageNumber = data.pageNumber
          this.products.pageSize = data.pageSize
          this.products.totalElements = data.totalElements
          this.products.totalPages = data.totalPages

        } else {
          //first time
          this.products = data
        }
        this.loading=false

      },
      error: (error: any) => {
        console.log(error);
        this.toast.error("Error in loading products")
        this.loading=false
      }
    })
  }

  pageNumber = 0
  pageSize = 30
  loading=false
  onScroll() {

    if (this.products.lastPage) {
      console.log("already at last page");
      return
    }

    this.loading=true

    setTimeout(() => {

      this.pageNumber = this.pageNumber + 1;
      console.log("page scrolled " + this.pageNumber);
      this.getProducts(this.categoryId, this.pageNumber, this.pageSize)


    }, 1000);


  }


  //add item to card

  addToCart(product:any){
    console.log(product)
    this.cartService.addItemToCart(product.productId,1).subscribe({
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
