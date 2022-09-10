package com.ecom.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class CartItem implements  Comparable<CartItem>{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cardItemid;

	@OneToOne
	private Product product;

	private int quantity;

	private double totalProductPrice;
	
	@ManyToOne
	private Cart cart;

	public int getCardItemid() {
		return cardItemid;
	}

	public void setCardItemid(int cardItemid) {
		this.cardItemid = cardItemid;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getTotalProductPrice() {
		return totalProductPrice;
	}

	public void setTotalProductPrice() {

		this.totalProductPrice = this.product.getProductPrice() * this.quantity;

	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}


	@Override
	public int compareTo(CartItem o) {
		return this.getCardItemid()-o.getCardItemid();
	}
}
