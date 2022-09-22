import {privateHttp} from "./axios-helper";

export function createOrder(price) {
    let formData = new FormData();
    formData.append("price", price);
    return privateHttp.post(`/payment/create`, formData).then(res => res.data)
}

export function successPayment(info) {

    let f = new FormData();
    f.append("razorpay_signature", info.razorpay_signature);
    f.append("razorpay_order_id", info.razorpay_order_id);
    f.append("razorpay_payment_id", info.razorpay_payment_id);
    f.append("user_order_id", info.user_order_id);


    return privateHttp.post(`/payment/success`, f).then(res => res.data)

}
