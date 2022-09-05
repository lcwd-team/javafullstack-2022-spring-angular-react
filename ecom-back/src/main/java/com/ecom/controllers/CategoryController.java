package com.ecom.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.ecom.payload.ApiResonse;
import com.ecom.payload.CategoryDto;
import com.ecom.services.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	// create

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/")
	public ResponseEntity<CategoryDto> createCat(@RequestBody CategoryDto caDto) {
		CategoryDto create = this.categoryService.create(caDto);
		return new ResponseEntity<CategoryDto>(create, HttpStatus.CREATED);
	}

	// update
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{catId}")
	public ResponseEntity<CategoryDto> updateCat(@RequestBody CategoryDto caDto, @PathVariable int catId) {
		CategoryDto update = this.categoryService.update(caDto, catId);
		return new ResponseEntity<CategoryDto>(update, HttpStatus.OK);
	}

	// delete
	@PreAuthorize("hasRole('ADMIN')")
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
