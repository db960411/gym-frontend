import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['../../../modal.component.scss']
})
export class PasswordComponent {
  deActivated = false;
  newPassword = ''; 
  newMatchingPassword = ''; 
  success = false;
  error = false;
  errorMessage = "";
  passwordForm: FormGroup; 

  constructor(
    private settingsService: SettingsService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.passwordForm = this.formBuilder.group({
      newPassword: [
        '',
        [Validators.required, this.minLengthValidator(6)],
      ],
      newMatchingPassword: [
        '',
        [Validators.required],
      ],
    }, {
      validator: this.passwordMatchValidator
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
      const newPassword = control.get('newPassword')?.value;
      const newMatchingPassword = control.get('newMatchingPassword')?.value;

      if (newPassword !== newMatchingPassword) {
        return { 'passwordMismatch': true };
      }
  
      return null;
    }


  closeModal() {
    this.settingsService.closeModal();
  }

  submitForm() {
    
    if (this.passwordForm.invalid) return;
  
    const newPassword = this.passwordForm.value.newPassword;
  
    this.settingsService.updatePassword(newPassword).subscribe({
      next: (response: any) => {
          this.success = true;
          this.toastr.success(`Updated the password successfully`);
          this.closeModal();
      },
      error: (response: any) => {
        console.log("Couldn't update password", response);
        this.error = true;
        this.toastr.error('Error message', 'Error');
      },
    });
  }

  

}
