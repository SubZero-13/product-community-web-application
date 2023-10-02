package com.nagarro.Product_Community_Backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.Product_Community_Backend.entities.User;
import com.nagarro.Product_Community_Backend.implementation.UserServiceImpl;

@RestController
@RequestMapping("users")
@CrossOrigin("*")
public class UserController {
	@Autowired
	private UserServiceImpl userService;

	@PostMapping("/addUser")
	public ResponseEntity<?> addUser(@RequestBody User user) {
		try {
			User existingUser = userService.getUserByEmail(user.getEmail());
			if (existingUser != null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists");
			}
			User addedUser = userService.addUser(user);
			return ResponseEntity.status(HttpStatus.CREATED).body(addedUser);
		} catch (Exception exception) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
		}
	}
	
	@GetMapping("/getAllUsers")
	public ResponseEntity<?> getAllUsers() {
		try {
			List<User> users = userService.getAllUsers();
			return ResponseEntity.ok(users);
		} catch (Exception exception) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
		}
	}
	

	@GetMapping("/getUser/{userEmail}")
	public ResponseEntity<?> getUserByEmail(@PathVariable String userEmail) {
		try {
			User user = userService.getUserByEmail(userEmail);
			if (user != null) {
				return ResponseEntity.ok(user);
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
			}
		} catch (Exception exception) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
		}
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {
	    try {
	        String userEmail = user.getEmail();
	        String password = user.getPassword();

	        // Retrieve the user from the database based on the email
	        User existinguser = userService.getUserByEmail(userEmail);

	        if (existinguser != null) {
	            // Check if the provided password matches the encoded password
	            if (password.equals(existinguser.getPassword())) {
	                // Password is correct, return the user
	                return ResponseEntity.ok(existinguser);
	            } else {
	                // Password is incorrect
	                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	            }
	        } else {
	            // User not found
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
	        }
	    } catch (Exception exception) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
	    }
	}



	@PutMapping("/updateUser")
	public ResponseEntity<?> updateUser(@RequestBody User user) {
		try {
			String userEmail = user.getEmail();
			User existingUser = userService.getUserByEmail(userEmail);
			if (existingUser == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
			}
			// Update the user details
			existingUser.setFirstName(user.getFirstName());
			existingUser.setLastName(user.getLastName());
			existingUser.setUserType(user.getUserType());
			existingUser.setPassword(user.getPassword());
			// Call the service to update the user
			User updatedUser = userService.updateUser(existingUser);
			return ResponseEntity.ok(updatedUser);
		} catch (Exception exception) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
		}
	}

	@DeleteMapping("/deleteUser/{userEmail}")
	public ResponseEntity<?> deleteUser(@PathVariable String userEmail) {
		try {
			User existingUser = userService.getUserByEmail(userEmail);
			if (existingUser == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
			}
			// Call the service to delete the user
			userService.deleteUser(existingUser);
			return ResponseEntity.ok("User deleted successfully");
		} catch (Exception exception) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
		}
	}

}

