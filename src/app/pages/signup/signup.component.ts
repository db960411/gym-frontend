import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  formData: FormGroup;
  loading = false;
  error = false;
  submitted = false;
  errorMessage = "";

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.formData = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(2), Validators.email]],
      password: ['', [Validators.required, this.minLengthValidator(6)]],
      matchingPassword: ['', [Validators.required, this.minLengthValidator(6)]],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  minLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.length < minLength) {
        return { 'minlength': true };
      }
      return null;
    };
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const matchingPassword = control.get('matchingPassword')?.value;

    if (password !== matchingPassword) {
      control.get('matchingPassword')?.setErrors({ 'passwordMismatch': true });
    } else {
      control.get('matchingPassword')?.setErrors(null);
    }
    return null;
  }

  reOpenSignup(): void {
    this.loading = false;
    this.submitted = false;
    this.error = false;
  }

  signupUser(): void {
    if (this.formData.invalid) return;
    
    this.loading = true;

    const plainFormData = this.formData.getRawValue();

    this.authService.signUp(plainFormData).subscribe({
      next: (response: any) => {
        if (response.successMessage) {
          this.loading = false;
          this.error = false;
          this.submitted = true;
          this.formData.disable()
          localStorage.setItem("userInfo", JSON.stringify(({ email: response.email })));
        } else if (response.emailError) {
          this.error = true;
          this.loading = false;
          this.errorMessage = response.emailError;
          this.formData.get('email')?.setErrors({ 'existingEmail': true });
        }
      },
      error: (e) => {
        this.error = true;
        this.errorMessage = e.error.message;
        this.submitted = true;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
