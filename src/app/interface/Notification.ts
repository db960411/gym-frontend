export interface Notification {
    title: string;
    text: string;
    category: string;
    createdAt: Date;
    seen: boolean;
    friendImageUrl: string;
    friendDisplayName: string;
    friendEmail: string;
}