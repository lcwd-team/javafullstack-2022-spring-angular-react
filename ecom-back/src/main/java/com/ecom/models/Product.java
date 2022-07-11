package com.ecom.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="ecom_products")
public class Product {

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int productId;
	
	@Column(name = "product_brand_namne",length = 300,unique = true)
	private String productName;
	
	private String productDesc;
	
	private double productPrice;
	
	private boolean stock;
	
	public Product(int productId, String productName, String productDesc, double productPrice, boolean stock) {
		super();
		this.productId = productId;
		this.productName = productName;
		this.productDesc = productDesc;
		this.productPrice = productPrice;
		this.stock = stock;
	}

	public Product() {
		super();
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductDesc() {
		return productDesc;
	}

	public void setProductDesc(String productDesc) {
		this.productDesc = productDesc;
	}

	public double getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(double productPrice) {
		this.productPrice = productPrice;
	}

	public boolean isStock() {
		return stock;
	}

	public void setStock(boolean stock) {
		this.stock = stock;
	}
	
	
	
	
	
	
	
}
