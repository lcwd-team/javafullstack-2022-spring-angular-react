package com.ecom.repositries;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.models.Order;
import com.ecom.models.User;

public interface OrderRepository extends JpaRepository<Order, Integer> {

	List<Order> findByUser(User user);

}
