import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { SocialService } from 'src/app/services/social.service';
import { ToastrService } from 'ngx-toastr';
import { SocialData } from 'src/app/interface/SocialData';
import { ProgressData } from 'src/app/interface/ProgressData';
import { Friends } from 'src/app/interface/Friends';
import { ProgressService } from 'src/app/services/progress.service';
import { Progression } from 'src/app/interface/Progression';
import { Level } from 'src/app/interface/Level';


@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  socialData!: SocialData;
  userProgress: Progression[] = [];
  errorMessage!: string;
  socialForm: FormGroup;
  toggledUserProgress = false;
  hasFetchedUserProgress = false;
  friendProgressionModal = false;
  selectedFriendId!: number;
  userProgressLoading!: boolean;
  loading = false;
  friendProgressionData: { [key: string]: ProgressData[] } = {};
  friendProfileModals: { [key: string]: boolean } = {};
  friendsDataLoading: { [key: string]: boolean } = {};

  constructor(
    private socialService: SocialService,
    private progressService: ProgressService,
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) {

    this.socialForm = this.fb.group({
      socialId: ['', [Validators.required, this.validateSocialId]],
    });
  }

   ngOnInit(): void {
    this.loading = true;
    this.socialService.getOrCreateSocialForUser().subscribe(data => {
      this.socialData = data;
      this.loading = false;
    });
  }


  validateSocialId(control: AbstractControl): { [key: string]: boolean } | null {
    const socialId = control.value;

    if (socialId && !/^\d{4}$/.test(socialId)) {
      return { invalidSocialId: true };
    }

    return null;
  }

 
  onSocialIdInput(event: any) {
  const input = event.target as HTMLInputElement;
  const value = input.value;
  
  const numericValue = value.replace(/[^0-9]/g, '');

  const truncatedValue = numericValue.substring(0, 4);

  input.value = truncatedValue;

  this.socialForm.get('socialId')?.setValue(truncatedValue);
}


  onSubmit() {
    if (this.socialForm.valid) {
      const friendSocialId = this.socialForm.get('socialId')?.value;
      this.socialService.addFriendForUser(friendSocialId).subscribe((response) => {
        if (response.errorMessage) {
          console.log(this.errorMessage)
            this.toastrService.error(response.errorMessage)
            this.socialForm.get('socialId')?.setErrors({ errorMessage: this.errorMessage });
        } else {
          this.toastrService.success("Friend request sent!")
          this.socialForm.reset();
        }
       });
    } else {
      console.log('Form is invalid');
    }
  }

  acceptFriendRequest(friendSocialId: number) {
    this.socialService.acceptFriendForUser(friendSocialId).subscribe((response) => {
      if (response.errorMessage) {
        this.errorMessage = response.errorMessage;
        this.toastrService.error(response.errorMessage);
      } else {
        this.errorMessage = "";
        this.toastrService.success("Accepted friend request");

        const friendsUserInfo = response.friends.
        filter((friend: Friends) => friend.userSocialId === friendSocialId)
        .map((item: Friends) => item);

        const newFriend: Friends = {
          errorMessage: null,
          planProgressionDto: friendsUserInfo.planProgressionDto,
            profileDto: friendsUserInfo.profileDto,
          userInfo: {
            email: friendsUserInfo[0].userInfo.email,
            role: friendsUserInfo[0].userInfo.role,
            level: friendsUserInfo[0].userInfo.level,
            socialId: friendSocialId,
            profileImageUrl: friendsUserInfo[0].userInfo.profileImageUrl
          },
          userSocialId: friendsUserInfo[0].userSocialId,
        };

        const existingFriendIndex = this.socialData.friends.findIndex(
          (friend) => friend.userInfo.socialId === friendSocialId
        );
        
        if (existingFriendIndex === -1) {
          const friendRequestsIndex = this.socialData.friendRequests?.userInfo.findIndex(
            (friend) => friend.socialId === friendSocialId
          );
        
          if (friendRequestsIndex !== -1) {
            this.socialData.friendRequests?.userInfo.splice(friendRequestsIndex, 1);
          }
        
          this.socialData.friends.push(newFriend);
        }
        
      }
    });
  }

  removeFriend(friendSocialId: number) {
    this.socialService.removeFriendForUser(friendSocialId).subscribe((response) => {
      if (response.errorMessage) {
        this.errorMessage = response.errorMessage;
        this.toastrService.error(response.errorMessage);
      } else {
        this.errorMessage = "";
        this.toastrService.success("Accepted friend request")
      }
    });
  }

  toggleUserProgress(): void {
      this.toggledUserProgress = !this.toggledUserProgress;

      if (!this.hasFetchedUserProgress) {
          this.getUserProgress();
          this.hasFetchedUserProgress = true;
      }
  }
 
  getUserProgress(): void {
    this.userProgressLoading = true;
    this.progressService.getProgress().subscribe((progress) => {
      this.userProgress = progress;
      this.userProgressLoading = false;
    })
  }

  toggleFriendProfile(friendSocialId: number): void {
    this.friendProfileModals[friendSocialId] = !this.friendProfileModals[friendSocialId];
    this.friendsDataLoading[friendSocialId] = true;
  
      this.socialService.getProgressOfFriend(friendSocialId).subscribe({
        next: (response) => {
          this.friendProgressionData = {
            ...this.friendProgressionData,
            [friendSocialId]: response
          };
        this.friendsDataLoading[friendSocialId] = false;
        },
        error: (error) => {
        console.log(error);
        this.friendsDataLoading[friendSocialId] = false;
        }
      });
  }

  openFriendProgressModal(data: ProgressData[]) {
    this.friendProgressionModal = !this.friendProgressionModal;
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
