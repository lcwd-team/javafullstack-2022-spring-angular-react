package com.ecom.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.exception.ResourceNotFoundException;
import com.ecom.models.User;
import com.ecom.payload.UserDto;
import com.ecom.repositries.UserRepository;
import com.ecom.services.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDto create(UserDto userDto) {
//		Dto to Entity
		User user = this.toEntity(userDto);
		User createdUser = this.userRepository.save(user);
//		Entity to DTO
		return this.toDto(createdUser);
	}

	@Override
	public UserDto update(UserDto t, int userId) {

		User u = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with userId " + userId));

		u.setName(t.getName());
		u.setEmail(t.getEmail());
		u.setPassword(t.getPassword());
		u.setAbout(t.getAbout());
		u.setAddress(t.getAddress());
		u.setActive(t.isActive());
		u.setGender(t.getGender());
		u.setCreateAt(t.getCreateAt());
		u.setPhone(t.getPhone());

		User updatedUser = this.userRepository.save(u);

		return this.toDto(updatedUser);
	}

	@Override
	public void delete(int userId) {
		User u = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with userid " + userId));
		this.userRepository.delete(u);
	}

	@Override
	public List<UserDto> getAll() {

		List<User> allUser = this.userRepository.findAll();
		List<UserDto> allDtos = allUser.stream().map(user -> this.toDto(user)).collect(Collectors.toList());
		return allDtos;
	}

	@Override
	public UserDto getByUserId(int userId) {
		User u = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with user id  " + userId));
	
		return this.toDto(u);
	}

	@Override
	public UserDto getByEmail(String email) {	
		User user = this.userRepository.findByEmail(email).orElseThrow(()-> new ResourceNotFoundException(" User with email not found in database"));
		return this.toDto(user);
	}

	public UserDto toDto(User user) {
		UserDto dto = new UserDto();
		dto.setUserId(user.getUserId());
		dto.setName(user.getName());
		dto.setEmail(user.getEmail());
		dto.setPassword(user.getPassword());
		dto.setAbout(user.getAbout());
		dto.setAddress(user.getAddress());
		dto.setActive(user.isActive());
		dto.setGender(user.getGender());
		dto.setCreateAt(user.getCreateAt());
		dto.setPhone(user.getPhone());

		return dto;
	}

	public User toEntity(UserDto t) {
		User u = new User();
		u.setUserId(t.getUserId());
		u.setName(t.getName());
		u.setEmail(t.getEmail());
		u.setPassword(t.getPassword());
		u.setAbout(t.getAbout());
		u.setAddress(t.getAddress());
		u.setActive(t.isActive());
		u.setGender(t.getGender());
		u.setCreateAt(t.getCreateAt());
		u.setPhone(t.getPhone());

		return u;
	}

}
