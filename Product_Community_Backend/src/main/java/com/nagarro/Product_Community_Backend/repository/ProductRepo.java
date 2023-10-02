package com.nagarro.Product_Community_Backend.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.nagarro.Product_Community_Backend.entities.Product;



@Repository
public interface ProductRepo extends CrudRepository<Product, String> {
	List<Product> findByProductCodeContainingAndProductNameContainingAndProductBrandContaining(
            String productCode, String productName, String productBrand);

}
