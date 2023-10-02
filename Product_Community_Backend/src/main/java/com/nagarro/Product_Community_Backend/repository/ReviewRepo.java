package com.nagarro.Product_Community_Backend.repository;



import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.nagarro.Product_Community_Backend.entities.Review;


@Repository
public interface ReviewRepo extends CrudRepository<Review, Integer> {

	List<Review> findByProduct_ProductCode(String productCode);
    List<Review> findByUser_Email(String email);
}
