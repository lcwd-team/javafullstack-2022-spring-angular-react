package com.ecom.services;

import java.util.List;

import com.ecom.models.Product;
import com.ecom.payload.ProductDto;

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
	public ProductDto createProduct(ProductDto product);	
	public ProductDto updateProduct(ProductDto newProduct, int productId);
	public void deleteProduct(int productId);
	public ProductDto getProduct(int productId) ;
	public List<ProductDto> getAllProducts();
}
