package com.ecom.repositries;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecom.models.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	// custom finder methods
	public Optional<User> findByEmail(String email);
	
	public List<User> findByName(String name);
	
	public User findByEmailAndPassword(String email ,String password);
	
	public List<User> findByActiveTrue();
	
	public List<User> findByAboutIsNotNull();
	
	public List<User> findByNameStartingWith(String prefix);
	
	public List<User> findByNameContaining(String infix);
	
//	patter "a%"
	public List<User> findByNameLike(String likePattern);
	
	public List<User> findByNameOrderByNameDesc(String name);
	
	public List<User> findTop4ByUserId(int userId);
	
//	creating query methods
	
	@Query("select u from User u")
	public List<User> getAllUser();
	
	@Query("select u from User u where u.userId = :userId and u.email = :email ")
	public User getUserByEmail(@Param("userId") int abcId,String email);
	
	
}
