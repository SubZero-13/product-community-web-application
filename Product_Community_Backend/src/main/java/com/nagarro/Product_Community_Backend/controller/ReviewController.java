package com.nagarro.Product_Community_Backend.controller;

import com.nagarro.Product_Community_Backend.entities.Review;
import com.nagarro.Product_Community_Backend.implementation.ReviewServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin("*")
public class ReviewController {

	@Autowired
    private ReviewServiceImpl reviewService;

    @PostMapping("/addReview")
    public ResponseEntity<?> addReview(@RequestBody Review review) {
        try {
            Review addedReview = reviewService.addReview(review);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedReview);
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }
    }
    
    
    @GetMapping(("/getAllReviews"))
    public ResponseEntity<?> getAllReviews() {
        try {
            List<Review> reviews = reviewService.getAllReviews();

            if (reviews.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No reviews found.");
            }

            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching reviews.");
        }
    }
    

    @PutMapping("/updateReview")
    public ResponseEntity<?> updateReview(@RequestBody Review review) {
        try {
            Review updatedReview = reviewService.updateReview(review);
            return ResponseEntity.ok(updatedReview);
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }
    }

    @GetMapping("/getReview/product/{productCode}")
    public ResponseEntity<?> getListOfReviewsByProductCode(@PathVariable String productCode) {
        try {
            List<Review> reviews = reviewService.getListOfReviewsByProductCode(productCode);
            if (!reviews.isEmpty()) {
                return ResponseEntity.ok(reviews);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No reviews found for the product");
            }
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }
    }

    @GetMapping("/getReview/user/{userEmail}")
    public ResponseEntity<?> getListOfReviewsByUserId(@PathVariable String userEmail) {
        try {
            List<Review> reviews = reviewService.getListOfReviewsByUserEmail(userEmail);
            if (!reviews.isEmpty()) {
                return ResponseEntity.ok(reviews);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No reviews found for the user");
            }
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }
    }
    
    @DeleteMapping("/deleteReview/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable int reviewId) {
        try {
            boolean deleted = reviewService.deleteReview(reviewId);
            if (deleted) {
                return ResponseEntity.ok("Review deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found");
            }
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }
    }
}
