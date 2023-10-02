import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LoginForm } from 'src/app/dataTypes/login-form';
import { SignupForm } from 'src/app/dataTypes/sign-up-form';
import { User } from 'src/app/dataTypes/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginForm = false;
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  loginError: string = '';
  signupError: string = '';

  validationMessages: { [key: string]: { [key: string]: string } } = {
    email: {
      required: 'Email is required',
      email: 'Invalid email address'
    },
    firstName: {
      required: 'First name is required'
    },
    lastName: {
      required: 'Last name is required'
    },
    password: {
      required: 'Password is required',
      minlength: 'Password should be at least 8 characters long',
      maxlength: 'Password should not exceed 16 characters',
      pattern: 'Password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
    },
    confirmPassword: {
      required: 'Confirm password is required',
      passwordMismatch: 'Confirm password does not match'
    }
  };
  
  constructor(private formBuilder: FormBuilder, private userService:UserService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), this.validatePassword]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }


  validatePassword(control: AbstractControl): ValidationErrors | null {
    const password: string = control.value;
  
    // Validate password length
    if (password.length < 8) {
      return { minlength: true, message: 'Password should be at least 8 characters long' };
    }
    if(password.length > 16) {
      return { maxlength: true, message: 'Password should be at max 16 characters long' };
    }
  
    // Validate password pattern
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/.test(password)) {
      return { pattern: true, message: 'Password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character.' };
    }
    return null;
  }
  

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
  
    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }    
  }
  

  login() {
    // Implement login logic here
    const formData: LoginForm = this.loginForm.value;
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      const user: User = {
        email, password,
        firstName: '',
        lastName: '',
        userType: ''
      };

      this.userService.login(user).subscribe({
        next: (response: User) => {
          console.log('Logged in:', response);
          this.userService.currentUser = response;
          if(response.userType.toLowerCase() === 'regular') {
            this.router.navigate(['/user-dashboard']);
          }
          else {
            this.router.navigate(['/admin-dashboard']);
          }
        },
        error: (error: any) => {
          alert(error.error);
          this.loginError = 'Invalid email or password';
        }
      });
      
    }
  }

  signup() {
    // Implement signup logic here
    const formData: SignupForm = this.signupForm.value;
    if (this.signupForm.valid) {
      const email = this.signupForm.get('email')?.value;
      const firstName = this.signupForm.get('firstName')?.value;
      const lastName = this.signupForm.get('lastName')?.value;
      const password = this.signupForm.get('password')?.value;

      const user: User = {
        email, firstName, lastName, password,
        userType: 'Regular'
      };
      this.userService.addUser(user).subscribe({
        next: (response) => {
          // Signup successful
          console.log('Signed up:', response);
          this.userService.currentUser = response;
          alert("Signed Up Successfull, Go to Login Page");

          this.isLoginForm = true;

          // this.router.navigate(['/user-dashboard']);
        },
        error: (error) => {          
          this.signupError = 'User already exists';
        }
      });
    }
  }

  openSignUp() {
    this.isLoginForm = false;
  }

  openLogin() {
    this.isLoginForm = true;
  }

  getErrorMessage(formControlName: string, errorKey: string): string {
    const formControl = this.signupForm.get(formControlName);
    if (formControl && formControl.touched && formControl.errors) {
      const errors = formControl.errors;
      if (errors.hasOwnProperty(errorKey)) {
        return this.validationMessages[formControlName][errorKey];
      }
    }
    return '';
  }
  
}






