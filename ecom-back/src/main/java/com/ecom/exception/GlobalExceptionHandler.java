package com.ecom.exception;

import java.sql.SQLIntegrityConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ecom.payload.ApiResonse;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResonse> handleResourceNotFoundException(ResourceNotFoundException ex) {
		ApiResonse apiResonse = new ApiResonse(ex.getMessage(), false);
		return new ResponseEntity<ApiResonse>(apiResonse, HttpStatus.NOT_FOUND);

	}
	

	@ExceptionHandler(SQLIntegrityConstraintViolationException.class)
	public ResponseEntity<ApiResonse> handleSQLIntegrityException(SQLIntegrityConstraintViolationException ex) {
		ApiResonse apiResonse = new ApiResonse(ex.getMessage(), false);
		return new ResponseEntity<ApiResonse>(apiResonse, HttpStatus.BAD_REQUEST);

	}
	
	
	

}
