package com.ecom.payload;


import com.ecom.models.User;

public class PaymentOrderResponse {

    private String message;
    private String orderId;
    private String price;
    private String orderInformation;


    public PaymentOrderResponse(String message, String orderId, String price, String orderInformation) {
        this.message = message;
        this.orderId = orderId;
        this.price = price;
        this.orderInformation = orderInformation;
    }


    public PaymentOrderResponse() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getOrderInformation() {
        return orderInformation;
    }

    public void setOrderInformation(String orderInformation) {
        this.orderInformation = orderInformation;
    }
}
