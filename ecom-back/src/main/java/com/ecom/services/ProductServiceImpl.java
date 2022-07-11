package com.ecom.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.models.Product;
import com.ecom.repositries.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Override
	public Product createProduct(Product product) {
		Product saved = productRepository.save(product);
		return saved;
	}

	@Override
	public Product updateProduct(Product newProduct, int productId) {

		Product product = productRepository.findById(productId).get();
		product.setProductName(newProduct.getProductName());
		product.setProductDesc(newProduct.getProductDesc());
		product.setProductPrice(newProduct.getProductPrice());
		product.setStock(newProduct.isStock());
		Product updated = productRepository.save(product);
		return updated;
	}

	@Override
	public void deleteProduct(int productId) {
		Product product = productRepository.findById(productId).get();
		productRepository.delete(product);

	}

	@Override
	public Product getProduct(int productId) {
		Product product = productRepository.findById(productId).get();
		return product;
	}

	@Override
	public List<Product> getAllProducts() {
		List<Product> all = productRepository.findAll();
		return all;
	}

}
