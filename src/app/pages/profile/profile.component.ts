import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Level } from 'src/app/interface/Level';
import { User } from 'src/app/interface/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-app-modal-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  profileImageForm: FormGroup;
  profileCreated$!: Observable<boolean>;
  loading$!:  Observable<boolean>;
  activeModal = false;
  profileData$!: Observable<User | any>;
  createProfileError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  createProfileErrorMessage!: string;
  userDisplayName!: string;
  submitted!: boolean;
  fitnessGoals!: string; 
  userInformation!: any
  toggleOpenProfileImageForm!: boolean;


  constructor(private authService: AuthService, private usersService: UserService, private formBuilder: FormBuilder) {
     this.profileForm = this.formBuilder.group({
      displayName: ['', [Validators.required, Validators.minLength(3)]],
      weight: [''],
      height: ['', [Validators.required, Validators.minLength(3)]],
      language: ['ENG'],
      nationality: [''],
      gender: [''],
      dateOfBirth: ['', [Validators.required, Validators.minLength(6)]],
      fitnessGoals: [''],
      });

      this.profileImageForm = this.formBuilder.group({
      profileImageUrl: ['', [this.validateImageUrl]],
      });
  }

  ngOnInit(): void {
    this.getProfileInformation();
  }

  createProfile(): void {
    if (this.profileForm.invalid) return;

    const plainFormData = this.profileForm.getRawValue();

    this.usersService.createProfile(plainFormData).subscribe(resp => {
      if (resp.errorMessage) {
        this.createProfileError$.next(true);
        this.createProfileErrorMessage = resp.errorMessage
      } else {
        this.activeModal = false;
        this.usersService.userHasCreatedProfile$.next(true);
        this.submitted = true;
        this.fitnessGoals = resp.profileDto.fitnessGoals;
        console.log(resp.profileDto.fitnessGoals);
        const existingUserInfo = localStorage.getItem('userInfo');
        const userInfo = existingUserInfo ? JSON.parse(existingUserInfo) : {};
        localStorage.setItem("userInfo", JSON.stringify(({email: userInfo.email, displayName: resp.profileDto.displayName})));
      }
    });
  }

  onProfileSetup(): void {
    this.activeModal = true;
  }

  calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  validateImageUrl(control: AbstractControl) {
    if (control.value) {
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
      const url = new RegExp(urlPattern);
      if (!url.test(control.value)) {
        return { invalidUrl: true };
      }
    }
    return null;
  }
  
  toggleSubmitted() {
    this.getProfileInformation();
    this.submitted = false;
  }

  getProfileInformation() {
    this.usersService.checkUserProfileStatus();
    this.profileData$ = this.usersService.profileData$;
    this.userDisplayName = this.authService.userInfo$.value.displayName;
    this.profileCreated$ = this.usersService.userHasCreatedProfile$;
    this.usersService.getUserInformation().subscribe({
      next: (response) => {
        this.userInformation = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
    this.loading$ = this.usersService.loading$;
  }

  openProfileImageForm(): void {
    this.toggleOpenProfileImageForm = !this.toggleOpenProfileImageForm;
  }

  onSubmitImageForm() {
    if (this.profileImageForm.valid) {
      const imageUrl = this.profileImageForm.value.profileImageUrl;
      console.log(imageUrl);
      this.usersService.updateUserProfileImage(imageUrl).subscribe({
        next: (response) => {
          console.log(response)
          this.userInformation.profileImageUrl = imageUrl;
          this.toggleOpenProfileImageForm = !this.toggleOpenProfileImageForm;
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  getColorBasedOnLevel(level: string): string{
    if (level === Level.BRONZE) {
      return 'lightblue'; // Low-level users
    } else if (level === Level.SILVER) {
      return 'silver'; // Medium-level users
    } else if (level === Level.GOLD) {
      return 'gold'; // High-level users
    } else if (level === Level.PLATINUM) {
      return 'plum'; // High-level users
    } else if (level === Level.DIAMOND) {
      return 'lightcyan'; // High-level users
    } else {
      return 'white'; // Default color for unknown levels
    }
    }
}
