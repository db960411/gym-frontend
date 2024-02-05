import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['../../../modal.component.scss']
})
export class EmailComponent {
  deActivated = false;
  newEmail = ''; 
  success = false;
  error = false;
  errorMessage!: string;
  formData: FormGroup; 

  constructor(private authService: AuthService,private settingsService: SettingsService, private toastr: ToastrService, private formBuilder: FormBuilder){
    this.formData = this.formBuilder.group({
      newEmail: ['', [Validators.required, Validators.minLength(2), Validators.email]],
    });
  }

  closeModal() {
    this.settingsService.closeModal();
    this.formData.reset();
    }

  submitForm() {
    if (this.formData.invalid) return;

    const newEmail = this.formData.value.newEmail;

  
    this.settingsService.updateEmail(newEmail).subscribe({
      next: (response: any) => {
        if (response.successMessage) {
          this.success = true;
          this.formData.reset();
          const existingUserInfo = localStorage.getItem('userInfo');
          const userInfo = existingUserInfo ? JSON.parse(existingUserInfo) : {};
          console.log(userInfo)
          localStorage.setItem("userInfo", JSON.stringify(({email: newEmail, displayName: userInfo.displayName})));
          this.authService.userInfo$.value.email = newEmail;
          this.authService.storeTokenInCookie(response.jwtToken);
          
          this.toastr.success("Email updated successfully");
          this.closeModal();
        } else if (response.errorMessage) {
          this.errorMessage = response.errorMessage;
          this.toastr.error(response.errorMessage);
        } else {
          this.error = true;
        }
      },
      error: () => {
        this.toastr.error("Could not update the email address");
      }
    });

    console.log('Form submitted', this.newEmail);
  }
}
