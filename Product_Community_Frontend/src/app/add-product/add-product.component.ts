import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { ActiveToast, Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  errorMessages: { [key: string]: string } = {};
  successMessage: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      productCode: ['', Validators.required],
      productName: ['', Validators.required],
      productBrand: ['', Validators.required],
      productPrice: ['', [Validators.required, Validators.min(1)]],
      productDescription: ['', [Validators.required, Validators.maxLength(300), this.wordCountValidator]]
    });
  }

  get formControls() {
    return this.productForm.controls;
  }

  wordCountValidator(control: FormControl): { [key: string]: any } | null {
    const value: string = control.value;
    const words: string[] = value ? value.trim().split(/\s+/) : [];
    if (words.length > 300) {
      return { maxlength: true };
    }

    return null;
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    this.productService.getProductByCode(this.formControls['productCode'].value)
      .subscribe(
        () => {
          const code = this.formControls['productCode'].value;
          this.toastr.warning('Redirecting to Product Details', 'Product already exists.')

          setTimeout(() => {
            this.router.navigate(['/product-details', code]);
          }, 5000);

        },
        () => {
          this.errorMessages['productCode'] = '';

          const product = {
            productCode: this.formControls['productCode'].value,
            productName: this.formControls['productName'].value,
            productBrand: this.formControls['productBrand'].value,
            productPrice: this.formControls['productPrice'].value,
            productDescription: this.formControls['productDescription'].value
          };

          this.productService.addProduct(product)
            .subscribe(
              () => {
                this.toastr.success('', 'Product Added Successfully', {
                  timeOut: 3000,
                })
                this.productForm.reset();
              },
              error => {
                console.log(error.error)
                this.errorMessages['genericError'] = error.error;
              }
            );
        }
      );
  }

  clearForm() {
    this.productForm.reset();
    this.errorMessages = {};
    this.successMessage = '';
  }

  redirectToDashboard() {
    this.router.navigate(['/user-dashboard']);
  }
}

