import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Review } from '../dataTypes/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'http://172.190.217.126:8080/reviews';

  constructor(private http: HttpClient) {}

  getListOfReviewsByProductCode(productCode: string): Observable<Review[]> {
    const url = `${this.baseUrl}/getReview/product/${productCode}`;
    return this.http.get<Review[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  updateReview(review: Review): Observable<Review> {
    const url = `${this.baseUrl}/updateReview`;
    return this.http.put<Review>(url, review).pipe(
      catchError(this.handleError)
    );
  }

  deleteReview(reviewId: number): Observable<void> {
    const url = `${this.baseUrl}/deleteReview/${reviewId}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  getReviewsByProductCode(productCode: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/getReview/product/${productCode}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/addReview`, review)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  getAllReviews(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAllReviews`);
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Client-side error occurred
      // console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`
      // );
    }
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
