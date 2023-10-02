import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn = false; // Set to true if a user is logged in
  isAdmin = false; // Set to true if the logged-in user is an admin
  username:string='Loading';
  menuOpen = false;
  isSmallScreen = false;
  isMenuOpen = false;
  constructor(public userService: UserService, private router: Router, private breakpointObserver: BreakpointObserver) { 
  }


  ngOnInit() {
    this.userService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      const currentUser = this.userService.getCurrentUser();
      this.username = currentUser?.firstName || '';
      if(currentUser?.userType.toLowerCase() === 'admin') {
        this.isAdmin = true;
      }
    });
    this.breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape
    ]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.userService.logout();
    this.isLoggedIn = false; // Set to true if a user is logged in
    this.isAdmin = false;
    this.router.navigate(['']);
  }
}
function admin() {
  throw new Error('Function not implemented.');
}

