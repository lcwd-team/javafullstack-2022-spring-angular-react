package com.ecom.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.ecom.exception.ResourceNotFoundException;
import com.ecom.models.Cart;
import com.ecom.models.User;
import com.ecom.payload.CartDto;
import com.ecom.payload.ItemRequest;
import com.ecom.repositries.CartRepository;
import com.ecom.repositries.UserRepository;
import com.ecom.services.CartService;

public class CartServiceImpl implements CartService {

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ModelMapper mapper;

	@Override
	public CartDto addItem(ItemRequest item, String userName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CartDto get(String userName) {

		User user = this.userRepository.findByEmail(userName)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with given username !!"));

		Cart cart = this.cartRepository.findByUser(user).orElseThrow();

		return this.mapper.map(cart, CartDto.class);
	}

	@Override
	public CartDto removeItem(String username, int itemId) {
		// TODO Auto-generated method stub
		return null;
	}

}
