package com.ecom.exception;

public class BadUserLoginDetailException extends  RuntimeException{

    public BadUserLoginDetailException() {
        super("Invalid Username or Password !!");
    }

    public BadUserLoginDetailException(String message) {
        super(message);
    }
}
