package com.ecom.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.models.Product;
import com.ecom.services.ProductService;
import com.ecom.services.ProductServiceImpl;

@RestController
@RequestMapping("/products")
public class ProductController {

	@Autowired
	private ProductService productService;

	// localhost:8081/products
	
	
	//For creating new Product
	@PostMapping("/")
	public Product createProduct(@RequestBody Product product) {
		Product createdProduct = productService.createProduct(product);
		System.out.println("product created");
		return createdProduct;

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
	public List<Product> listAllProducts() {
		List<Product> allProducts = productService.getAllProducts();
		return allProducts;
	}

	// update
	@PutMapping("/{productId}")
	public Product updateProduct(@PathVariable("productId") int pid, @RequestBody Product newProduct) {
		Product updatedProduct = productService.updateProduct(newProduct, pid);
		return updatedProduct;

	}

	// delete
	@DeleteMapping("/{productId}")
	public String deleteProduct(@PathVariable int productId) {
		productService.deleteProduct(productId);
		return "Product Delete successfully !!";
	}

	// get
	@GetMapping("/{productId}")
	public Product getProduct(@PathVariable int productId) {
		Product product = productService.getProduct(productId);
		return product;
	}
}
