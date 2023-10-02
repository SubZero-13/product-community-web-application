package com.nagarro.Product_Community_Backend.service;

import java.util.List;

import com.nagarro.Product_Community_Backend.entities.Review;


public interface ReviewService {

	public Review addReview(Review review);

	public Review updateReview(Review review);

	public List<Review> getListOfReviewsByProductCode(String productCode);

	public List<Review> getListOfReviewsByUserEmail(String userEmail);

}
