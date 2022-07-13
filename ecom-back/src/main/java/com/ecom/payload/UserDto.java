package com.ecom.payload;

import java.util.Date;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class UserDto {
	
	private int userId;

	@NotEmpty
	@Size(min = 4,max = 20,message = "name must be min of 4 characters and max of 20 character !!")
	@Pattern(regexp = "^[A-Za-z][A-Za-z0-9_]{7,29}$",message = "Invalid username !!")
	private String name;

	@Email(message = "Valid Email Id is required !!")
	private String email;

	@NotEmpty
	@Size(min = 4,message = "Password must be of 4 digits !!")
	private String password;

	private String address;

	@NotEmpty
	private String about;

	private String gender;

	private Date createAt;

	@NotBlank
	private String phone;

	// at according to you

	private boolean active;

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
	
	

}
