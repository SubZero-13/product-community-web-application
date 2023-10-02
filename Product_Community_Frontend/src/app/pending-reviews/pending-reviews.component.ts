import { Component } from '@angular/core';
import { Review } from '../dataTypes/review';
import { ReviewService } from '../services/review.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pending-reviews',
  templateUrl: './pending-reviews.component.html',
  styleUrls: ['./pending-reviews.component.css']
})
export class PendingReviewsComponent {
  reviews: Review[] = [];
  productCode!: string | null;
  displayedColumns: string[] = ['productCode', 'productName', 'productBrand', 'description', 'userEmail', 'actions'];
  constructor(private reviewService: ReviewService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productCode = params['productCode'];
      if (this.productCode) {
        this.getReviews(this.productCode);
      }
    });
  }

  getReviews(productCode:string) {
    this.reviewService.getListOfReviewsByProductCode(productCode)
      .subscribe({
        next: (response: Review[]) => {
          this.reviews = response.filter(review => review.status === 'Pending');
        },
        error: (error) => {
          // console.error('Error fetching reviews:', error);
          // Handle the error here, show an error message, etc.
        }
      });
  }

  approveReview(review: Review) {
    review.status = 'Approved'; // Update the review status
    if (review.reviewId !== undefined) {
      this.reviewService.updateReview(review).subscribe(
        (response: Review) => {
          // console.log('Review approved successfully:', response);
          this.reviews = this.reviews.filter(r => r.reviewId !== review.reviewId);
        },
        (error: string) => {
          // console.error('Error approving review:', error);
        }
      );
    } else {
      console.error('Error: reviewId is undefined');
    }
  }
  
  deleteReview(review: Review) {
    if (review.reviewId !== undefined) {
      this.reviewService.deleteReview(review.reviewId).subscribe(
        () => {
          // console.log('Review deleted successfully');
          // Remove the deleted review from the reviews list
        },
        (error: string) => {
          // console.error('Error deleting review:', error);
        }
      );
      this.reviews = this.reviews.filter(r => r.reviewId !== review.reviewId);
    } else {
      // console.error('Error: reviewId is undefined');
    }
  }
  
}
