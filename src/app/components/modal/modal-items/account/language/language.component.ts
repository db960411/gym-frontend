import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from 'src/app/services/settings/settings.service';



@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['../../../modal.component.scss']
})
export class LanguageModal {
  deActivated = false;
  selectedLanguage = '';
  success = false;
  error = false;
  errorMessage = 'Could not update the email address';
  languages = [
    {value: 'English', viewValue: 'English'},
    {value: 'Swedish', viewValue: 'Swedish'},
    {value: 'Portuguese', viewValue: 'Portuguese'},
  ];
  formData: FormGroup; 

  constructor(private settingsService: SettingsService, private toastr: ToastrService, private formBuilder: FormBuilder){
    this.formData = this.formBuilder.group({
      selectedLanguage: ['', [Validators.required]],
    });
  }

  closeModal() {
    this.settingsService.closeModal();
  }

  submitForm() {
    if (this.formData.invalid) return;

    const selectedLanguage = this.formData.value.selectedLanguage;

    this.settingsService.updateLanguage(selectedLanguage).subscribe({
      next: () => {
        this.success = true;
        this.formData.reset();
        this.toastr.success("Language updated successfully");
        this.closeModal();
      },
      error: () => {
        this.error = true;
        this.toastr.error("Could not set the language to " + selectedLanguage);
      }
    });

    console.log('Form submitted', this.selectedLanguage);
  }
}
