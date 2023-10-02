import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.userService.isLoggedIn();
    const currentUser = this.userService.getCurrentUser();
  
    if (!isLoggedIn) {
      this.router.navigate(['/auth']);
      return false;
    }
  
    if ((route.url[0].path === 'admin-dashboard' || route.url[0].path === 'pending-reviews') && currentUser?.userType.toLowerCase() !== 'admin') {
      this.router.navigate(['/user-dashboard']);
      return false;
    }
    
    if (route.url[0].path === 'user-dashboard'  && currentUser?.userType.toLowerCase() === 'admin') {
      this.router.navigate(['/admin-dashboard']);
      return false;
    }
    return true;
  }
  
}
