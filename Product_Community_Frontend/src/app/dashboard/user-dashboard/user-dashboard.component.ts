import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/dataTypes/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  productForm!: FormGroup;
  products!: Product[];
  searchError: string = '';
  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      productCode: new FormControl(''),
      productName: new FormControl(''),
      productBrand: new FormControl('')
    });
  }

  searchProducts(): void {
    const { productCode, productName, productBrand } = this.productForm.value;
    this.products = [];
    this.searchError = '';
    this.productService
      .searchProducts(productCode, productName, productBrand)
      .subscribe({
        next: (response: Product[]) => {
          this.products = response;
        },
        error: (error) => {
          // console.error('Error occurred while searching products:', error);
          // this.searchError = 'Error occurred while searching products.';
          this.searchError = 'Product not found.';
        }
      });
  }

  viewProductDetails(product: Product): void {
    const code = product.productCode;
    this.router.navigate(['/product-details', code]);
  }

  addReview(product: Product): void {
    // Implement the logic to add a review for the product
  }
}
