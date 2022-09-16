import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/category.service'
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product = new Product('', '', 0, 0, true, true, '', 0)


  categories: any;

  constructor(
    private categoryService: CategoryService,
    private toast: ToastrService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {

    this.getCategories();

  }

  getCategories() {
    this.categoryService.loadCategories().subscribe({
      next: data => {
        this.categories = data
        console.log(this.categories);

      },
      error: error => {
        console.log(error);
        alert("error in loading categories")

      }
    })
  }

  //submit the product
  submitProduct(event: Event) {
    event.preventDefault()
    console.log(this.product);

    // check the product details 
    if (this.product.getProductName().trim() === '') {
      this.toast.error("Product Name is required !!")
      return
    }

    if (this.product.getProductDesc().trim() === '') {
      this.toast.error("Product description is required !!")
      return
    }
    if (this.product.getProductPrice() <= 0) {
      this.toast.error("Invalid price !!")
      return
    }
    if (this.product.getProductQuantity() <= 0) {
      this.toast.error("Invalid price !!")
      return
    }

    if (this.product.getCategoryId() === 0) {
      this.toast.error("Must Select category !!")
      return
    }


    //create product api call
    this.productService.createProduct(this.product).subscribe({
      next: data => {
        console.log("Created Product");
        console.log(data)
        this.toast.success("Product is created")
        this.product = new Product('', '', 0, 0, true, true, '', 0)

      },
      error: error => {
        console.log(error);

        if (error.status == 403) {
          this.toast.error("you dont have enough permission to perform this operation")
        } else {
          this.toast.error("Error in creating product")
        }

      }
    })


  }

}


