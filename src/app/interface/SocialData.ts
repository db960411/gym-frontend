import { FriendRequests } from "./FriendRequests";
import { Friends } from "./Friends";

export interface SocialData {
    friends: Friends[];
    userSocialId: number;
    userInfo: {
      email: string;
      level: string; 
      role: string;
      socialId: number;
      profileImageUrl: string;
    };
    profileInfo: {
      dateOfBirth: string;
      displayName: string;
      fitnessGoals: string; 
      gender: string;
      height: number; 
      language: string;
      nationality: string;
      weight: number;
    } | null;
    errorMessage: string | null;
    friendRequests: FriendRequests;
  }
  