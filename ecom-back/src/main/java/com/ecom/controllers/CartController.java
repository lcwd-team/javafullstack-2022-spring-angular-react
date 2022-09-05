package com.ecom.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecom.payload.CartDto;
import com.ecom.payload.ItemRequest;
import com.ecom.services.CartService;

import java.security.Principal;

@RestController
@RequestMapping("/carts")
public class CartController {

    Logger logger = LoggerFactory.getLogger(CartController.class);

    @Autowired
    private CartService cartService;

    @PostMapping("/")
    public ResponseEntity<CartDto> addItemToCart(@RequestBody ItemRequest reqeust, Principal principal) {

        // authentication: dynamic

        CartDto cartDto = this.cartService.addItem(reqeust, principal.getName());
        return new ResponseEntity<CartDto>(cartDto, HttpStatus.OK);

    }

    // get cart

    @GetMapping("/")
    public ResponseEntity<CartDto> getCart(Principal principal) {
        CartDto cartDto = this.cartService.get(principal.getName());
        return new ResponseEntity<CartDto>(cartDto, HttpStatus.OK);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<CartDto> removeProductFromcart(@PathVariable int productId,Principal principal) {
        CartDto cartDto = this.cartService.removeItem(principal.getName(), productId);
        return new ResponseEntity<CartDto>(cartDto, HttpStatus.OK);
    }

}
