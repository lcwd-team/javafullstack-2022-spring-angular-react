package com.ecom.controllers;

import java.util.*;

import javax.validation.Valid;

import com.ecom.models.Role;
import com.ecom.payload.RoleDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.util.ParallelSorter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.payload.ApiResonse;
import com.ecom.payload.UserDto;
import com.ecom.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper mapper;
    // create

    // 201- created
    @PostMapping("/")
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto) {
        userDto.setCreateAt(new Date());
        userDto.setActive(true);
        userDto.setPassword(this.passwordEncoder.encode(userDto.getPassword()));
        UserDto createdUser = this.userService.create(userDto);
        return new ResponseEntity<UserDto>(createdUser, HttpStatus.CREATED);

    }

    // update
    @PutMapping("/{userId}")
    public ResponseEntity<UserDto> updateUser(@Valid @RequestBody UserDto userDto, @PathVariable int userId) {
        UserDto updatedUser = this.userService.update(userDto, userId);
        return new ResponseEntity<UserDto>(updatedUser, HttpStatus.OK);
    }

    // delete

    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResonse> deleteUser(@PathVariable int userId) {
        this.userService.delete(userId);
        return new ResponseEntity<ApiResonse>(new ApiResonse("User is deleted successfully !!", true), HttpStatus.OK);
    }

    // get

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getById(@PathVariable int userId) {
        UserDto userDto = this.userService.getByUserId(userId);
        return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);
    }

    // get all

    @GetMapping("/")
    public ResponseEntity<List<UserDto>> getAll() {
        List<UserDto> all = this.userService.getAll();
        return new ResponseEntity<List<UserDto>>(all, HttpStatus.OK);
    }

    // get by email
    @GetMapping("/email/{userEmail}")
    public ResponseEntity<UserDto> getByUserEmail(@PathVariable String userEmail) {
        UserDto userDto = this.userService.getByEmail(userEmail);
        return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);
    }

}
