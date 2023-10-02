package com.nagarro.Product_Community_Backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.nagarro.Product_Community_Backend.entities.User;



@Repository
public interface UserRepo extends CrudRepository<User, String> {
	User findByEmail(String email);
}
