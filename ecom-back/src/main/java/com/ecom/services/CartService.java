package com.ecom.services;

import com.ecom.payload.CartDto;
import com.ecom.payload.ItemRequest;

public interface CartService {

	// add item to cart
	// we will check the availability of card if cart is available then we will add
	// item to cart otherwise we will create a new card and add the item to it

	CartDto addItem(ItemRequest item, String userName);

	// get card of user
	CartDto get(String userName);

	// remove item from cart
	CartDto removeItem(String username, int itemId);

}
