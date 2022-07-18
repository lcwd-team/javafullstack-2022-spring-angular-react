package com.ecom.repositries;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.models.Cart;
import com.ecom.models.User;

public interface CartRepository extends JpaRepository<Cart, Integer> {

	Optional<Cart> findByUser(User user);

}
