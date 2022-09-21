import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {
  orders: any;
  baseUrl: string;

  constructor(
    private orderService: CartService,
    private toast: ToastrService,
    private modalService: NgbModal
  ) {

    this.baseUrl = environment.baseUrl
  }

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders() {
    this.orderService.getAllOrders().subscribe({
      next: data => {
        this.orders = data
        console.log(this.orders)
      },
      error: error => {
        console.log(error)

      }
    })
  }

  getDate(number: number) {
    return new Date(number).toDateString()
  }

  selectedOrder: any

  openModal(content: any, orderId: number) {

    this.selectedOrder = this.orders.find((order: any) => order.orderId == orderId)
    console.log(this.selectedOrder);

    this.modalService.open(content, {size: 'lg'})


  }

}
