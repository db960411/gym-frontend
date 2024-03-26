export interface User {
    displayName?: string;
    email?: string;
    level?: string;
    role?: string;
    profileImageUrl?: string;
    profileDto?:
        {
            dateOfBirth: string;
            displayName: string;
            fitnessGoals: string;
            gender: string;
            height: string;
            language: string;
            nationality: string;
            weight: string;
        }
}