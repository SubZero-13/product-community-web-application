package com.nagarro.Product_Community_Backend.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.Product_Community_Backend.entities.Product;
import com.nagarro.Product_Community_Backend.repository.ProductRepo;
import com.nagarro.Product_Community_Backend.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	ProductRepo repo;

	public Product addProduct(Product product) {
		return repo.save(product);
	}

	public List<Product> getAllProducts() {
		return (List<Product>) repo.findAll();
	}

	public Product getProductByCode(String code) {
		return repo.findById(code).orElse(null);
	}

	public Product updateProduct(Product product) {
		return repo.save(product);
	}

	public void deleteProduct(Product product) {
		repo.delete(product);
	}
	
	
	public List<Product> searchProducts(String productCode, String productName, String productBrand) {
        return repo.findByProductCodeContainingAndProductNameContainingAndProductBrandContaining(
                productCode != null ? productCode : "",
                productName != null ? productName : "",
                productBrand != null ? productBrand : ""
        );
    }

}
