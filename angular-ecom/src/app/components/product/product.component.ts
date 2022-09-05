import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: any

  @Output() productAddedEvent=new EventEmitter<any>()

  baseUrl: string = ''
  constructor() {
    this.baseUrl = environment.baseUrl
  }

  ngOnInit(): void {
  }

  addToCardButtonClick(product:any){
    this.productAddedEvent.next(product)
  }

}
