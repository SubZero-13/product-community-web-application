import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../dataTypes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private BASE_URL = "http://172.190.217.126:8080/products";
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      // console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`
      // );
    }
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }


  addProduct(product: Product): Observable<Product | string> {
    return this.http.post<Product>(`${this.BASE_URL}/addProduct`, product, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllProducts(): Observable<Product[] | string> {
    return this.http.get<Product[]>(`${this.BASE_URL}/getAllProducts`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProductByCode(productCode: string): Observable<Product | string> {
    return this.http.get<Product>(`${this.BASE_URL}/getProduct/${productCode}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  searchProducts(
    productCode: string,
    productName: string,
    productBrand: string
  ): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}/searchProduct`, {
      params: {
        productCode: productCode || '',
        productName: productName || '',
        productBrand: productBrand || ''
      }
    }).pipe(
      catchError((error: any) => {
        // Handle the error here
        // console.error('An error occurred:', error);
        // You can also throw a custom error or return an empty array as per your requirement
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  updateProduct(product: Product): Observable<Product | string> {
    return this.http.put<Product>(`${this.BASE_URL}/updateProduct`, product, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProduct(productCode: string): Observable<string> {
    return this.http.delete<string>(`${this.BASE_URL}/deleteProduct/${productCode}`)
      .pipe(
        catchError(this.handleError)
      );
  }
}

