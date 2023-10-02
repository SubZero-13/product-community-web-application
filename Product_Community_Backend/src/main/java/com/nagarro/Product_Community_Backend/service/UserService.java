package com.nagarro.Product_Community_Backend.service;

import java.util.List;

import com.nagarro.Product_Community_Backend.entities.User;

public interface UserService {

	public User addUser(User user);

	public List<User> getAllUsers();

	public User getUserByEmail(String email);
}
