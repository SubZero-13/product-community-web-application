import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../dataTypes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://172.190.217.126:8080';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  public currentUser: User | null = null;
  isAdmin:boolean = false;

  constructor(private http: HttpClient) {
    this.initializeCurrentUser();
  }


  private initializeCurrentUser() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.isLoggedInSubject.next(true);
    }
  }

  addUser(user: User): Observable<User> {
    const url = `${this.baseUrl}/users/addUser`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<User>(url, user, httpOptions);
  }

  getAllUsers(): Observable<User[]> {
    const url = `${this.baseUrl}/users/getAllUsers`;
    return this.http.get<User[]>(url);
  }

  getUserByEmail(email: string): Observable<User> {
    const url = `${this.baseUrl}/users/getUser/${email}`;
    return this.http.get<User>(url);
  }

  login(user: User): Observable<User> {
    const url = `${this.baseUrl}/users/login`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<User>(url, user, httpOptions).pipe(
      tap((response: User) => {
        this.currentUser = response;
        this.isLoggedInSubject.next(true);
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.isAdmin = response.userType === 'Admin' ? true : false;
        localStorage.setItem('admin', response.userType === 'Admin' ? 'true' : 'false');
      })
    );
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.baseUrl}/users/updateUser`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<User>(url, user, httpOptions);
  }

  deleteUser(email: string): Observable<any> {
    const url = `${this.baseUrl}/users/deleteUser/${email}`;
    return this.http.delete(url);
  }

  logout() {
    this.currentUser = null;
    this.isAdmin = false;
    this.isLoggedInSubject.next(false);
    localStorage.setItem('admin', 'false');
    localStorage.removeItem('currentUser');
  }
  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  getCurrentUser(): User | null {
    const currentUserString = localStorage.getItem('currentUser');
    return currentUserString ? JSON.parse(currentUserString) : null;
  }

}
