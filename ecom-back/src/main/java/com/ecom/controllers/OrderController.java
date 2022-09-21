package com.ecom.controllers;

import com.ecom.models.Order;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecom.payload.OrderDto;
import com.ecom.payload.OrderRequest;
import com.ecom.services.OrderService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {


    @Autowired
    private OrderService orderService;

    @PostMapping("/")
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderRequest request, Principal principal) {
        OrderDto createOrder = this.orderService.createOrder(request, principal.getName());
        return new ResponseEntity<OrderDto>(createOrder, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<OrderDto>> getOrders(Principal principal) {
        return new ResponseEntity<>(this.orderService.getOrderOfUser(principal.getName()), HttpStatus.OK);
    }

    @GetMapping("/all")
    public List<OrderDto> getAllOrders(){
        return this.orderService.getAll();
    }

}
