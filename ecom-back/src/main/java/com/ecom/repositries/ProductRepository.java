package com.ecom.repositries;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.models.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}
