package com.ecom.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.exception.ResourceNotFoundException;
import com.ecom.models.Category;
import com.ecom.payload.CategoryDto;
import com.ecom.repositries.CategoryRepository;
import com.ecom.services.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private ModelMapper mapper;

	@Override
	public CategoryDto create(CategoryDto dto) {
		Category cat = this.mapper.map(dto, Category.class);
		Category savedCategory = this.categoryRepository.save(cat);
		return this.mapper.map(savedCategory, CategoryDto.class);
	}

	@Override
	public CategoryDto update(CategoryDto dto, int categoryId) {
		Category category = this.categoryRepository.findById(categoryId).orElseThrow(
				() -> new ResourceNotFoundException("Category with " + categoryId + " not found on server !!"));
		category.setTitle(dto.getTitle());
		Category updatedCat = this.categoryRepository.save(category);
		return this.mapper.map(updatedCat, CategoryDto.class);
	}

	@Override
	public void delete(int categoryId) {
		Category category = this.categoryRepository.findById(categoryId).orElseThrow(
				() -> new ResourceNotFoundException("Category with " + categoryId + " not found on server !!"));
		this.categoryRepository.delete(category);
	}

	@Override
	public CategoryDto get(int categoryId) {
		Category category = this.categoryRepository.findById(categoryId).orElseThrow(
				() -> new ResourceNotFoundException("Category with " + categoryId + " not found on server !!"));
		return this.mapper.map(category, CategoryDto.class);
	}

	@Override
	public List<CategoryDto> get() {
		List<Category> all = this.categoryRepository.findAll();
		List<CategoryDto> dtos = all.stream().map((cat) -> this.mapper.map(cat, CategoryDto.class))
				.collect(Collectors.toList());
		return dtos;
	}

}
