package com.ecom.payload;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.TreeSet;

public class CartDto {
	private int cartId;
	private UserDto user;

	private Set<CartItemDto> items = new TreeSet<>();

	public int getCartId() {
		return cartId;
	}

	public void setCartId(int cartId) {
		this.cartId = cartId;
	}

	public UserDto getUser() {
		return user;
	}

	public void setUser(UserDto user) {
		this.user = user;
	}

	public Set<CartItemDto> getItems() {
		return items;
	}

	public void setItems(Set<CartItemDto> items) {
		this.items = items;
	}

	
}
