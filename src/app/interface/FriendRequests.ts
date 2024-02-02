export interface FriendRequests {
      userInfo: {
        email: string;
        role: string;
        level: number;
        socialId: number;
        displayName: string;
        profileImageUrl: string;
      }[];
    errorMessage: string | null;
  }
  