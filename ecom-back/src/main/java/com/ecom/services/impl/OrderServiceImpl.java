package com.ecom.services.impl;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.exception.ResourceNotFoundException;
import com.ecom.models.Cart;
import com.ecom.models.CartItem;
import com.ecom.models.Order;
import com.ecom.models.OrderItem;
import com.ecom.models.User;
import com.ecom.payload.OrderDto;
import com.ecom.payload.OrderRequest;
import com.ecom.repositries.CartRepository;
import com.ecom.repositries.OrderRepository;
import com.ecom.repositries.UserRepository;
import com.ecom.services.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public OrderDto createOrder(OrderRequest request, String username) {

        User user = this.userRepository.findByEmail(username).orElseThrow(ResourceNotFoundException::new);
        int cartId = request.getCartId();
        String address = request.getAddress();

        Cart cart = this.cartRepository.findById(cartId).orElseThrow(ResourceNotFoundException::new);

        Set<CartItem> items = cart.getItems();

        Order order = new Order();
        AtomicReference<Double> totalOrderPrice = new AtomicReference<>(0.0);
        Set<OrderItem> orderItems = items.stream().map((cartItem) -> {

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalProductPrice(cartItem.getTotalProductPrice());
            orderItem.setOrder(order);
            totalOrderPrice.set(totalOrderPrice.get() + orderItem.getTotalProductPrice());

            //
            int productId = orderItem.getProduct().getProductId();
            // product:- fetch

            // update the product quantity

            // save the product

            return orderItem;

        }).collect(Collectors.toSet());

        order.setItems(orderItems);
        order.setBillingAddress(address);
        order.setPaymentStatus("NOT PAID");
        order.setOrderAmount(totalOrderPrice.get());
        order.setOrderCreated(new Date());
        order.setOrderDelivered(null);
        order.setOrderStatus("CREATED");
        order.setUser(user);

        Order savedOrder = this.orderRepository.save(order);

        cart.getItems().clear();

        this.cartRepository.save(cart);

        return this.mapper.map(savedOrder, OrderDto.class);
    }

    @Override
    public OrderDto updateOrder(OrderDto orderDto, int orderId) {

        Order order = this.orderRepository.findById(orderId).get();
        order.setPaymentStatus(orderDto.getPaymentStatus());
//        .... update order information

        this.orderRepository.save(order);
        return this.mapper.map(order, OrderDto.class);
    }

    @Override
    public void deleteOrder(int orderId) {
        // TODO Auto-generated method stub

    }

    @Override
    public List<OrderDto> getAll() {
        List<Order> all = this.orderRepository.findAll();
        return all.stream().map(order -> this.mapper.map(order, OrderDto.class)).collect(Collectors.toList());
    }

    @Override
    public OrderDto get(int orderId) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<OrderDto> getOrderOfUser(String username) {
        User user = this.userRepository.findByEmail(username).orElseThrow(() -> new ResourceNotFoundException("User not found with given user"));
        List<Order> ordersOfUser = this.orderRepository.findByUser(user);
        return ordersOfUser.stream().map(order -> this.mapper.map(order, OrderDto.class)).collect(Collectors.toList());
    }

}
