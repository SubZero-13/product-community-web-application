package com.nagarro.Product_Community_Backend.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.nagarro.Product_Community_Backend.constants.Constant;

@Entity
public class Review {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int reviewId;
	private String description;
	private double rating;
	@ManyToOne
	@JoinColumn(name="product_code")
	private Product product;

	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;

	private String status = Constant.PENDING;

	public Review() {
	}

	public Review(int reviewId, String description, double rating, Product product, User user, String status) {
		super();
		this.reviewId = reviewId;
		this.description = description;
		this.rating = rating;
		this.product = product;
		this.user = user;
		this.status = status;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getReviewId() {
		return reviewId;
	}

	public void setReviewId(int reviewId) {
		this.reviewId = reviewId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
