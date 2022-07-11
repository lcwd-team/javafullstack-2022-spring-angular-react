package com.ecom.exception;

public class ResourceNotFoundException extends RuntimeException {

	public ResourceNotFoundException() {
		super("Resource you are looking not found on server !!");
	}

	public ResourceNotFoundException(String message) {
		super(message);
	}

}
