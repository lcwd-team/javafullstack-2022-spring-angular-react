package com.ecom.payload;

public class JwtResponse {

    private String token;
    private UserDto user;

    public JwtResponse(String token, UserDto user) {
        this.token = token;
        this.user = user;
    }

    public JwtResponse() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }
}
