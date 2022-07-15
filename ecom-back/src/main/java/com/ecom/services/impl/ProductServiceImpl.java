package com.ecom.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecom.exception.ResourceNotFoundException;
import com.ecom.models.Category;
import com.ecom.models.Product;
import com.ecom.payload.CategoryDto;
import com.ecom.payload.ProductDto;
import com.ecom.payload.ProductResponse;
import com.ecom.repositries.CategoryRepository;
import com.ecom.repositries.ProductRepository;
import com.ecom.services.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private CategoryRepository catRepo;

	@Autowired
	private ModelMapper mapper;

	@Override
	public ProductDto createProduct(ProductDto productDto, int categoryId) {
		Category cat = this.catRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Given category is not found"));
		Product product = this.mapper.map(productDto, Product.class);
		product.setCategory(cat);
		Product savedProduct = this.productRepository.save(product);
		return this.mapper.map(savedProduct, ProductDto.class);
	}

	@Override
	public ProductDto updateProduct(ProductDto newProduct, int productId) {

		Product product = this.productRepository.findById(productId).orElseThrow(
				() -> new ResourceNotFoundException("Product with " + productId + " not found on server !!"));
		product.setProductName(newProduct.getProductName());
		product.setProductDesc(newProduct.getProductDesc());
		product.setProductPrice(newProduct.getProductPrice());
		product.setLive(newProduct.isLive());
		product.setStock(newProduct.isStock());
		product.setImageName(newProduct.getImageName());
		Product updatedProduct = this.productRepository.save(product);
		return this.mapper.map(updatedProduct, ProductDto.class);
	}

	@Override
	public void deleteProduct(int productId) {

		Product product = this.productRepository.findById(productId).orElseThrow(
				() -> new ResourceNotFoundException("Product with " + productId + " not found on server !!"));
		this.productRepository.delete(product);

	}

	@Override
	public ProductDto getProduct(int productId) {

		Product product = this.productRepository.findById(productId).orElseThrow(
				() -> new ResourceNotFoundException("Product with " + productId + " not found on server !!"));
		return this.mapper.map(product, ProductDto.class);
	}

	@Override
	public ProductResponse getAllProducts(int pageNumber, int pageSize) {
		Pageable pageable = PageRequest.of(pageNumber, pageSize);

		Page<Product> page = this.productRepository.findAll(pageable);

		List<Product> all = page.getContent();

		List<ProductDto> dtos = all.stream().map(product -> this.mapper.map(product, ProductDto.class))
				.collect(Collectors.toList());
		
		
		

		
		ProductResponse response=new ProductResponse();
		response.setContent(dtos);
		response.setPageNumber(page.getNumber());
		response.setPageSize(page.getSize());
		response.setTotalElements(page.getTotalElements());
		response.setTotalPages(page.getTotalPages());
		response.setLastPage(page.isLast());
		
		
		
		return response;
	}

	@Override
	public ProductResponse getProductsByCategory(int categoryId, int pageNumber, int pageSize) {
		Category cat = this.catRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Given category is not found"));

		Pageable pageable = PageRequest.of(pageNumber, pageSize);

		Page<Product> page = this.productRepository.findByCategory(cat, pageable);

		List<Product> categories = page.getContent();

		List<ProductDto> dtos = categories.stream().map((product) -> this.mapper.map(product, ProductDto.class))
				.collect(Collectors.toList());
		
		ProductResponse response=new ProductResponse();
		response.setContent(dtos);
		response.setPageNumber(page.getNumber());
		response.setPageSize(page.getSize());
		response.setTotalElements(page.getTotalElements());
		response.setTotalPages(page.getTotalPages());
		response.setLastPage(page.isLast());
		
	
	
		
		return response;
		
	}

}
