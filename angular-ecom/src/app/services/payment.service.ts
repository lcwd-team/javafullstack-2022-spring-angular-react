import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient
  ) {
  }


  startPayment(price: number) {
    let f = new FormData();
    f.append('price', price + '');
    return this.http.post(`${environment.baseUrl}/payment/create`, f);
  }


  successPayment(response: any) {
    let f = new FormData();
    f.append("razorpay_signature", response.razorpay_signature);
    f.append("razorpay_order_id", response.razorpay_order_id);
    f.append("razorpay_payment_id", response.razorpay_payment_id);
    f.append("user_order_id", response.user_order_id);
    console.log(f)

    return this.http.post(`${environment.baseUrl}/payment/success`, f);
  }
}
