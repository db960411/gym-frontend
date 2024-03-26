import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interface/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  profileForm: FormGroup;
  submittedForm = false;
  error = false;
  @Output() submittedFormEvent = new EventEmitter<User | any>();
  @Input() profileData: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastService: ToastrService) {
    console.log(this.profileData)
    this.profileForm = this.formBuilder.group({
      weight: this.profileData?.profileDto.weight,
      height: this.profileData?.profileDto.height,
      language: this.profileData?.profileDto.language,
      nationality: this.profileData?.profileDto.nationality,
      fitnessGoals: this.profileData?.profileDto.fitnessGoals,
      });
  }

  updateProfileInformation(): void {
    this.userService.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        this.submittedForm = true;
        this.error = false;
        this.toastService.success("Updated profile information");
        this.submittedFormEvent.emit();
      },
      error: () => {
        this.error = true;
        this.submittedForm = false;
        console.log("error!");
      }
    });
  }


}
