import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formData: FormGroup;
  loading = false;
  submitted = false;
  loginMessage = "";
  isBeforeNoon = false;
  predefinedUserInfo: any | null = null;


  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private usersService: UserService) {
    this.predefinedUserInfo = localStorage.getItem('userInfo');
    const jsonParsed = JSON.parse(this.predefinedUserInfo || '{}');
    this.predefinedUserInfo = jsonParsed;

    console.log(localStorage.getItem('userInfo'))

    this.formData = this.formBuilder.group({
        email: [this.predefinedUserInfo.email, [Validators.required, Validators.minLength(2), Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });

    const currentTime = new Date();
    const hours = currentTime.getHours();
    this.isBeforeNoon = hours < 12;
  }


  loginUser(): void {
    if (this.formData.invalid) return;

    this.loading = true;

    const plainFormData = this.formData.getRawValue();

    this.authService.logIn(plainFormData).subscribe({
      next: (res: any) => {
        if (res.errorMessage) {
          this.loginMessage = res.errorMessage;
          return;
        }
          this.router.navigate(['/']);
      },
      error: (err) => console.log(err),
      complete: () => {
        this.loading = false;
      } 
    });
    
  }

}




