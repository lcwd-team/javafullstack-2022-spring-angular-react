package com.ecom.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.payload.ApiResonse;
import com.ecom.payload.ProductDto;
import com.ecom.payload.ProductResponse;
import com.ecom.services.ProductService;

@RestController
@RequestMapping("/")
public class ProductController {

	@Autowired
	private ProductService productService;

	// localhost:8081/products

	// For creating new Product
	@PostMapping("/categories/{categoryId}/products")
	public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto product, @PathVariable int categoryId) {
		ProductDto createdProduct = productService.createProduct(product, categoryId);
		System.out.println("product created");
		return new ResponseEntity<ProductDto>(createdProduct, HttpStatus.CREATED);

	}

	// update
	@PutMapping("/products/{productId}")
	public ProductDto updateProduct(@PathVariable("productId") int pid, @RequestBody ProductDto newProduct) {
		ProductDto updatedProduct = productService.updateProduct(newProduct, pid);
		return updatedProduct;

	}

	// delete
	@DeleteMapping("/products/{productId}")
	public ResponseEntity<ApiResonse> deleteProduct(@PathVariable int productId) {
		productService.deleteProduct(productId);
		return new ResponseEntity<ApiResonse>(new ApiResonse("Product Delete successfully !!", false), HttpStatus.OK);
	}

	// get
	@GetMapping("/products/{productId}")
	public ProductDto getProduct(@PathVariable int productId) {
		ProductDto product = productService.getProduct(productId);
		return product;
	}

	// category wise get product
	@GetMapping("/categories/{categoryId}/products")
	public ResponseEntity<ProductResponse> getProductsOfCategory(@PathVariable int categoryId,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize) {
		ProductResponse listOfProducts = productService.getProductsByCategory(categoryId, pageNumber, pageSize);
		return new ResponseEntity<ProductResponse>(listOfProducts, HttpStatus.CREATED);

	}

	/**
	 * 
	 * @author DurgeshPC
	 * @since 1.0
	 * @param Noting
	 * @return List of product
	 */
	// getting all products
	@GetMapping("/products")
	public ProductResponse listAllProducts(
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize) {
		ProductResponse response = productService.getAllProducts(pageNumber, pageSize);
		return response;
	}

}
