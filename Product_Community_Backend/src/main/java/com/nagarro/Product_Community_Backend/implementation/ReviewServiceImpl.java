package com.nagarro.Product_Community_Backend.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.Product_Community_Backend.entities.Review;
import com.nagarro.Product_Community_Backend.repository.ReviewRepo;
import com.nagarro.Product_Community_Backend.service.ReviewService;

@Service
public class ReviewServiceImpl implements ReviewService {

	@Autowired
	public ReviewRepo reviewRepository;

	public Review addReview(Review review) {
		return reviewRepository.save(review);
	}

	public Review updateReview(Review review) {
		return reviewRepository.save(review);
	}
	
	
	public List<Review> getAllReviews() {
        return (List<Review>) reviewRepository.findAll();
    }

	public List<Review> getListOfReviewsByProductCode(String productCode) {
		return reviewRepository.findByProduct_ProductCode(productCode);
	}

	public List<Review> getListOfReviewsByUserEmail(String userEmail) {
		return reviewRepository.findByUser_Email(userEmail);
	}
	public boolean deleteReview(int reviewId) {
	        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
	        if (optionalReview.isPresent()) {
	            Review review = optionalReview.get();
	            reviewRepository.delete(review);
	            return true;
	        } else {
	            return false;
	        }
	    }
}
