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
import org.springframework.web.bind.annotation.RestController;

import com.ecom.payload.ApiResonse;
import com.ecom.payload.ProductDto;
import com.ecom.services.ProductService;


@RestController
@RequestMapping("/products")
public class ProductController {

	@Autowired
	private ProductService productService;

	// localhost:8081/products
	
	
	//For creating new Product
	@PostMapping("/")
	public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto product) {
		ProductDto createdProduct = productService.createProduct(product);
		System.out.println("product created");
		return new ResponseEntity<ProductDto>(createdProduct,HttpStatus.CREATED);

	}

	// localhost:8081/product/
	/**
	 * 
	 * @author DurgeshPC
	 * @since 1.0
	 * @param Noting
	 * @return List of product
	 */
	//getting all products
	@GetMapping("/")
	public List<ProductDto> listAllProducts() {
		List<ProductDto> allProducts = productService.getAllProducts();
		return allProducts;
	}

	// update
	@PutMapping("/{productId}")
	public ProductDto updateProduct(@PathVariable("productId") int pid, @RequestBody ProductDto newProduct) {
		ProductDto updatedProduct = productService.updateProduct(newProduct, pid);
		return updatedProduct;

	}

	// delete
	@DeleteMapping("/{productId}")
	public ResponseEntity<ApiResonse> deleteProduct(@PathVariable int productId) {
		productService.deleteProduct(productId);
		return new ResponseEntity<ApiResonse>(new ApiResonse("Product Delete successfully !!", false),HttpStatus.OK);
	}

	// get
	@GetMapping("/{productId}")
	public ProductDto getProduct(@PathVariable int productId) {
		ProductDto product = productService.getProduct(productId);
		return product;
	}
}
