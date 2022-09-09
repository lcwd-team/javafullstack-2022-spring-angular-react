package com.ecom.services;

import java.util.List;

import com.ecom.models.Order;
import com.ecom.payload.OrderDto;
import com.ecom.payload.OrderRequest;

public interface OrderService {

    // create order

    OrderDto createOrder(OrderRequest request, String username);

    // update order
    OrderDto updateOrder(OrderDto orderDto, int orderId);

    // delete order
    void deleteOrder(int orderId);

    // get all orders
    List<OrderDto> getAll();

    // get single order
    OrderDto get(int orderId);

    List<OrderDto> getOrderOfUser(String username);

}
