package com.ecom.services;

import java.util.List;

import com.ecom.payload.UserDto;

public interface UserService {

	//create
	UserDto create(UserDto userDto);
	
	//update
	UserDto update(UserDto userDto , int userId);
	
	//delete
	void delete(int userId);
	
	//get all users
	List<UserDto> getAll();
	
	//get by id
	UserDto getByUserId(int userId);
	
	//get by email
	UserDto getByEmail(String email);
	
	
}
