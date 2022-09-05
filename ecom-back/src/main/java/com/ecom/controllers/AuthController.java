package com.ecom.controllers;

import com.ecom.exception.BadUserLoginDetailException;
import com.ecom.payload.JwtRequest;
import com.ecom.payload.JwtResponse;
import com.ecom.payload.UserDto;
import com.ecom.security.JwtHelper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtHelper helper;
    @Autowired
    private ModelMapper mapper;
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(
            @RequestBody JwtRequest request
    ) throws Exception {

        //authenticate
        this.authenticateUser(request.getUsername(), request.getPassword());
        ///age ka kam
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(request.getUsername());

        String token = this.helper.generateToken(userDetails);

        JwtResponse response = new JwtResponse();
        response.setToken(token);
        response.setUser(this.mapper.map(userDetails, UserDto.class));
        return new ResponseEntity<>(response, HttpStatus.OK);


    }


    private void authenticateUser(String username, String password) throws Exception {


        try {
            //authenticate
            manager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (BadCredentialsException e) {

            throw new BadUserLoginDetailException("Invalid username or Password !!");

        } catch (DisabledException e) {
            throw new BadUserLoginDetailException("User is not active !!");
        }


    }
}
