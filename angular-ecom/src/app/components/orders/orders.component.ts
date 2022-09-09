import { Component, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any;
  baseUrl:any

  constructor(
    private cartService: CartService,
    private toast: ToastrService,
    private modalService: NgbModal
  ) { 

    this.baseUrl=environment.baseUrl
  }



  ngOnInit(): void {

    this.loadOrders()

  }

  loadOrders() {

    this.cartService.getOrders().subscribe({
      next: (data) => {
        console.log(data);
        this.toast.success("Order loaded")
        this.orders = data
      },
      error: error => {
        console.log(error);
        this.toast.error("Error in loading orders")

      }
    })

  }

  getFormattedDate(time: number) {
    return new Date(time).toDateString()
  }

  selectedOrder: any
  openModal(content: any, orderId: number) {

    this.selectedOrder = this.orders.find((order: any) => order.orderId == orderId)
    console.log(this.selectedOrder);

    this.modalService.open(content, { size: 'lg' })


  }

}
