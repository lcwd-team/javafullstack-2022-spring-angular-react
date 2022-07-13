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
import com.ecom.payload.CategoryDto;
import com.ecom.services.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	// create

	@PostMapping("/")
	public ResponseEntity<CategoryDto> createCat(@RequestBody CategoryDto caDto) {
		CategoryDto create = this.categoryService.create(caDto);
		return new ResponseEntity<CategoryDto>(create, HttpStatus.CREATED);
	}

	// update
	@PutMapping("/{catId}")
	public ResponseEntity<CategoryDto> updateCat(@RequestBody CategoryDto caDto, @PathVariable int catId) {
		CategoryDto update = this.categoryService.update(caDto, catId);
		return new ResponseEntity<CategoryDto>(update, HttpStatus.OK);
	}

	// delete
	@DeleteMapping("/{catId}")
	public ResponseEntity<ApiResonse> deleleCat(@PathVariable int catId) {
		this.categoryService.delete(catId);
		return new ResponseEntity<ApiResonse>(new ApiResonse("Category Deleted Successfully", true), HttpStatus.OK);
	}

	// get

	@GetMapping("/{catId}")
	public ResponseEntity<CategoryDto> getCat(@PathVariable int catId) {
		CategoryDto categoryDto = this.categoryService.get(catId);
		return new ResponseEntity<CategoryDto>(categoryDto, HttpStatus.OK);
	}

	// getall

	@GetMapping("/")
	public ResponseEntity<List<CategoryDto>> get() {
		List<CategoryDto> list = this.categoryService.get();
		return new ResponseEntity<List<CategoryDto>>(list, HttpStatus.OK);
	}
}
