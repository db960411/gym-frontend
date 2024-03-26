import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  userEmail!: string | any;
  formData!: FormGroup;
  subcribedToNewsLetter!: boolean;

  constructor(private formBuilder: FormBuilder,private authService: AuthService, private newsService: NewsService, private toastService: ToastrService) {
  
  }

  ngOnInit(): void {
    this.userEmail = this.authService.userInfo$.value.email;
    this.formData = this.formBuilder.group({
      email: new FormControl({value: this.userEmail, disabled: true}, Validators.required),
    });
  }

  signUpToNewsLetter(): void {
    if (this.formData.invalid) return;
    const email = this.formData.controls['email'].value;
    this.newsService.subscribeToNewsLetter(email).subscribe((resp: any) => {
      if (resp.statusCodeValue === 201) {
        this.toastService.success("You have successfully signed up to our newsletter!")
        this.subcribedToNewsLetter = true;
      } else if (resp.statusCodeValue === 403) {
        this.toastService.error("You have already signed up to our newsletter!")
      } else {
        this.toastService.error("There was a problem signing up to our newsletter")
      }
    })
  }


}
