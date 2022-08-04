package com.ecom.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import com.ecom.models.Role;
import com.ecom.repositries.RoleRepository;
import org.modelmapper.ModelMapper;
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


    @Autowired
    private RoleRepository roleRepository;


    @Override
    public UserDto create(UserDto userDto) {
//		Dto to Entity
        User user = this.toEntity(userDto);


        //get the normal user role
        Role role = this.roleRepository.findById(7412).get();
        user.getRoles().add(role);
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
        User user = this.userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException(" User with email not found in database"));
        return this.toDto(user);
    }

    @Autowired
    private ModelMapper mapperl;

    public UserDto toDto(User user) {
        return this.mapperl.map(user, UserDto.class);
    }

    public User toEntity(UserDto t) {

        return this.mapperl.map(t, User.class);
    }

}
