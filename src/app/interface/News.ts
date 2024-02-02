export interface News {
  id: number;
  title: string;
  body?: string;
  imageUrl?: string;
  author?: string;
  category?: string;
  createdAt: Date;
  totalNews?: number;
}
