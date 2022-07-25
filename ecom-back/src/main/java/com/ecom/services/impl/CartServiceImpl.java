package com.ecom.services.impl;

import java.util.Collections;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.exception.ResourceNotFoundException;
import com.ecom.models.Cart;
import com.ecom.models.CartItem;
import com.ecom.models.Product;
import com.ecom.models.User;
import com.ecom.payload.CartDto;
import com.ecom.payload.ItemRequest;
import com.ecom.repositries.CartRepository;
import com.ecom.repositries.ProductRepository;
import com.ecom.repositries.UserRepository;
import com.ecom.services.CartService;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ModelMapper mapper;

	@Override
	public CartDto addItem(ItemRequest item, String userName) {

		int productId = item.getProductId();
		int quantity = item.getQuantity();

		if (quantity <= 0) {
			throw new ResourceNotFoundException("Invalid Quantity !!");			
		}

		// get the user
		User user = this.userRepository.findByEmail(userName).orElseThrow(() -> new ResourceNotFoundException());

		// get the product from db: productRepository
		Product product = this.productRepository.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Product not found !!"));
		if (!product.isStock()) {
			throw new ResourceNotFoundException("Product is out of stock");
		}
		System.out.println(product.getProductPrice());

		// create new cartItem: with product and quantity

		CartItem cartItem = new CartItem();
		cartItem.setProduct(product);
		cartItem.setQuantity(quantity);
		cartItem.setTotalProductPrice();

		// getting cart from user
		Cart cart = user.getCart();

		// if cart is null that means user does not have any cart
		if (cart == null) {
			// we will create new cart
			cart = new Cart();
			cart.setUser(user);

		}

		// add items mein cart ko

		Set<CartItem> items = cart.getItems();

		AtomicReference<Boolean> flag = new AtomicReference<>(false);

		Set<CartItem> newItems = items.stream().map((i) -> {
			// changes
			if (i.getProduct().getProductId() == product.getProductId()) {

				i.setQuantity(quantity);
				i.setTotalProductPrice();
				flag.set(true);
			}
			return i;
		}).collect(Collectors.toSet());

		// check
		if (flag.get()) {
			// newItems ko items ki jagah set karenge
			items.clear();
			items.addAll(newItems);
		} else {
			cartItem.setCart(cart);
			items.add(cartItem);
		}

		Cart updatedCart = this.cartRepository.save(cart);

		return this.mapper.map(updatedCart, CartDto.class);
	}

	@Override
	public CartDto get(String userName) {

		User user = this.userRepository.findByEmail(userName)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with given username !!"));

		Cart cart = this.cartRepository.findByUser(user)
				.orElseThrow(() -> new ResourceNotFoundException("Cart not found !!"));

		return this.mapper.map(cart, CartDto.class);
	}

	@Override
	public CartDto removeItem(String username, int productId) {
		User user = this.userRepository.findByEmail(username)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with given username !!"));

		Cart cart = user.getCart();

		Set<CartItem> items = cart.getItems();

		boolean result = items.removeIf((item) -> item.getProduct().getProductId() == productId);
		System.out.println(result);

		Cart updatedCart = cartRepository.save(cart);

		return this.mapper.map(updatedCart, CartDto.class);
	}

}
