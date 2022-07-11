package com.ecom.services;

import java.util.List;

import com.ecom.models.Product;

public interface ProductService {
	
	/**
	 * 
	 * 
	 * This method create a new product
	 * 
	 * @since 1.0
	 * @see com.example.ProductController
	 * 
	 * @param product
	 * @return Product
	 */
	public Product createProduct(Product product);	
	public Product updateProduct(Product newProduct, int productId);
	public void deleteProduct(int productId);
	public Product getProduct(int productId) ;
	public List<Product> getAllProducts();
}
