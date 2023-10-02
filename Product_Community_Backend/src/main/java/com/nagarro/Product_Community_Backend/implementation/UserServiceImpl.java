package com.nagarro.Product_Community_Backend.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.Product_Community_Backend.entities.User;
import com.nagarro.Product_Community_Backend.repository.UserRepo;
import com.nagarro.Product_Community_Backend.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepo repo;

	public User addUser(User user) {
		return repo.save(user);
	}

	public List<User> getAllUsers() {
		return (List<User>) repo.findAll();
	}
	

	public User getUserByEmail(String email) {
		return repo.findByEmail(email);
	}

	public User updateUser(User user) {
		return repo.save(user);
	}

	public void deleteUser(User user) {
		repo.delete(user);
	}

}
