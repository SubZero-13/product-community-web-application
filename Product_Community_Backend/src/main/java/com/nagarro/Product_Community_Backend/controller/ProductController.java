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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.Product_Community_Backend.entities.Product;
import com.nagarro.Product_Community_Backend.implementation.ProductServiceImpl;

@RestController
@RequestMapping("products")
@CrossOrigin("*")
public class ProductController {

	@Autowired
	ProductServiceImpl prodService;
	
	
	@GetMapping("/test") 
	public String test() {
		return "Welcome to backend Api of Product Community";
	}

	@PostMapping("/addProduct")
	public ResponseEntity<?> addProduct(@RequestBody Product product) {
		try {
			Product local = prodService.getProductByCode(product.getProductCode());
			if (local != null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Product already exists");
			}
			Product addedProduct = prodService.addProduct(product);
			return ResponseEntity.status(HttpStatus.CREATED).body(addedProduct);
		} catch (Exception exception) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
		}
	}
	
	
	@GetMapping("/getAllProducts")
	public ResponseEntity<?> getAllProducts() {
	    try {
	        List<Product> products = prodService.getAllProducts();
	        if (!products.isEmpty()) {
	            return ResponseEntity.ok(products);
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No products found");
	        }
	    } catch (Exception exception) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
	    }
	}
	
	
	 @GetMapping("/searchProduct")
	    public ResponseEntity<?> searchProducts(@RequestParam(required = false) String productCode,
	                                            @RequestParam(required = false) String productName,
	                                            @RequestParam(required = false) String productBrand) {

	        List<Product> searchResults = prodService.searchProducts(productCode, productName, productBrand);

	        if (searchResults.isEmpty()) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
	        }

	        return ResponseEntity.ok(searchResults);
	 }
	
	
	


	@GetMapping("/getProduct/{prodCode}")
	public ResponseEntity<?> getProductByCode(@PathVariable String prodCode) {
		try {
			Product product = prodService.getProductByCode(prodCode);
			if (product != null) {
				return ResponseEntity.ok(product);
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
			}
		} catch (Exception exception) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
		}
	}
	
	@PutMapping("/updateProduct")
    public ResponseEntity<?> updateProduct(@RequestBody Product product) {
        try {
        	String prodCode = product.getProductCode();
            Product existingProduct = prodService.getProductByCode(prodCode);
            if (existingProduct == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
            }
            // Update the product details
            existingProduct.setProductName(product.getProductName());
            existingProduct.setProductDescription(product.getProductDescription());
            existingProduct.setProductBrand(product.getProductBrand());
            existingProduct.setProductPrice(product.getProductPrice());
            // Call the service to update the product
            Product updatedProduct = prodService.updateProduct(product);
            return ResponseEntity.ok(updatedProduct);
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }
    }

    @DeleteMapping("/deleteProduct/{prodCode}")
    public ResponseEntity<?> deleteProduct(@PathVariable String prodCode) {
        try {
            Product existingProduct = prodService.getProductByCode(prodCode);
            if (existingProduct == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
            }
            // Call the service to delete the product
            prodService.deleteProduct(existingProduct);
            return ResponseEntity.ok("Product deleted successfully");
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }
    }

}
