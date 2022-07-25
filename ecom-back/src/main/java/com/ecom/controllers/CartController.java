package com.ecom.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.payload.CartDto;
import com.ecom.payload.ItemRequest;
import com.ecom.services.CartService;

@RestController
@RequestMapping("/carts")
public class CartController {

	String userName = "durgesh@dev.com";
	@Autowired
	private CartService cartService;

	@PostMapping("/")
	public ResponseEntity<CartDto> addItemToCart(@RequestBody ItemRequest reqeust) {

		// authentication: dynamic

		CartDto cartDto = this.cartService.addItem(reqeust, userName);
		return new ResponseEntity<CartDto>(cartDto, HttpStatus.OK);

	}

	// get cart

	@GetMapping("/")
	public ResponseEntity<CartDto> getCart() {
		CartDto cartDto = this.cartService.get(userName);
		return new ResponseEntity<CartDto>(cartDto, HttpStatus.OK);
	}

	@PutMapping("/{productId}")
	public ResponseEntity<CartDto> removeProductFromcart(@PathVariable int productId) {
		CartDto cartDto = this.cartService.removeItem(userName, productId);
		return new ResponseEntity<CartDto>(cartDto, HttpStatus.OK);
	}

}
