package com.nagarro.Product_Community_Backend.service;

import java.util.List;

import com.nagarro.Product_Community_Backend.entities.Product;

public interface ProductService {
	public Product addProduct(Product product);

	public List<Product> getAllProducts();

	public Product getProductByCode(String code);

}
