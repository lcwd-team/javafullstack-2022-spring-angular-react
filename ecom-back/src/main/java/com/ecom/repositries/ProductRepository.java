package com.ecom.repositries;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.models.Category;
import com.ecom.models.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

	Page<Product> findByCategory(Category category,Pageable pageable);
	
}
