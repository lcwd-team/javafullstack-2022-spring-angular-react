package com.ecom.services.impl;

import com.ecom.exception.ResourceNotFoundException;
import com.ecom.models.User;
import com.ecom.repositries.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //load the user from database by username
        System.out.println("loading user from database");
        User user = this.userRepository.findByEmail(username).orElseThrow(() -> new ResourceNotFoundException("User not found with given username !!"));
        return user;
    }
}
