import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-plan-progression',
  templateUrl: './plan-progression.component.html',
  styleUrls: ['../../../modal.component.scss']

})
export class PlanProgressionComponent {
  deActivated = false;
  error = false;
  success = false;
  errorMessage = "";
  planProgressionForm: FormGroup; 
  cancelPlanSelected: boolean;

  constructor(private settingsService: SettingsService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder){
      this.cancelPlanSelected = false;
      this.planProgressionForm = this.formBuilder.group({
        cancelPlan: [
          '',
          [Validators.required],
        ],
      })
    }

    closeModal() {
      this.planProgressionForm.reset();
      this.settingsService.closeModal();
    }

    submitForm() {
      if (this.planProgressionForm.invalid) return;
    
      this.settingsService.cancelPlanProgression().subscribe({
        next: () => {
            this.success = true;
            this.toastr.success(`Cancelled plan succesfully!`);
            this.deActivated = true
            this.closeModal();
        },
        error: () => {
          this.error = true;
          this.toastr.error('Could not cancel plan');
        },
      });
    }
}
