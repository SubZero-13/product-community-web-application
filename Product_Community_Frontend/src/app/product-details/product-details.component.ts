import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../dataTypes/review';
import { ProductService } from '../services/product.service';
import { ReviewService } from '../services/review.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  approvedReviews: Review[] = [];
  description: string = '';
  rating: number = 0;
  userType: string = '';
  isAdmin:boolean = false;
  avgRating:number = 0;
  
  descriptionTouched: boolean = false;
  descriptionInvalid: boolean= false;
  ratingTouched: boolean = false;
  ratingInvalid: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private reviewService: ReviewService,
    public userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('admin') === 'true' ? true: false;
    const productCode = this.route.snapshot.paramMap.get('code')!;
    const user = this.userService.getCurrentUser();
    if (user && user.userType.toLowerCase() === 'admin') {
      this.userType = 'admin';
    }
    this.getProductDetails(productCode);
    this.getApprovedReviews(productCode);
  }

  validateDescription() {
    this.descriptionTouched = true;
    this.description = this.description.trim(); // Remove leading and trailing spaces
    const descriptionLength = this.description.length;
    if (descriptionLength < 20 || descriptionLength > 400) {
      this.descriptionInvalid = true;
    } else {
      this.descriptionInvalid = false;
    }
  }  

  getProductDetails(productCode: string): void {
    this.productService.getProductByCode(productCode).subscribe(product => {
      this.product = product;
    });
  }

  getApprovedReviews(productCode: string): void {
    this.reviewService.getReviewsByProductCode(productCode).subscribe(
      (reviews) => {
        this.approvedReviews = reviews.filter((review) => review.status === 'Approved');
        this.calculateAverageRating();
      },
      (error) => {
        // Handle the error and display an error message to the user
      }
    );
  }

  calculateAverageRating(): void {
    const totalReviews = this.approvedReviews.length;
    if (totalReviews > 0) {
      const sum = this.approvedReviews.reduce((accumulator, review) => accumulator + review.rating, 0);
      this.avgRating = sum / totalReviews;
    }
  }

  setRating(value: number) {
    this.rating = value;
    this.ratingTouched = true;
    this.validateRating();
  }

  validateRating() {
    this.ratingInvalid = this.rating < 1 || this.rating > 5;
  }

  addReview(): void {
    const user = this.userService.getCurrentUser();
    const newReview = {
      description: this.description,
      rating: this.rating,
      product: this.product,
      user: user!,
      status: 'Pending'
    };
    this.reviewService.addReview(newReview).subscribe(
      (_addedReview: any) => {
        // Handle the success case
      this.toastr.success('Wait for Approval', 'Review Added Successfull', {
        timeOut: 3000,
      })
      this.description = '';
      this.rating = 0;
      this.descriptionTouched = false;
      this.ratingTouched = false;
      this.ratingInvalid = false;
      },
      (error: any) => {
        // Handle the error case
      }
    );
  }

  goBack() {
    window.history.back();
  }
  
}


