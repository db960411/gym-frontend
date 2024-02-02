export interface Friends {
    errorMessage: string | null;
    planProgressionDto: {
        day: number;
        plan: {
          category: string;
          description: string;
          id: number;
          name: string;
          subscription_type: string;
        } | null;
      }[] | null;
      profileDto: {
        dateOfBirth: string;
        displayName: string;
        fitnessGoals: string;
        gender: string;
        height: number; 
        language: string;
        nationality: string;
        weight: number; 
      } | null;
    userInfo: {
        email: string;
        level: string; 
        role: string;
        socialId: number;
        profileImageUrl: string;
    };
    userSocialId: number;
}


