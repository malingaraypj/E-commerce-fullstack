// Base rating scale (e.g., 1-5 stars)
export type Rating = 1 | 2 | 3 | 4 | 5;

// The review as it exists in the database, with all metadata
export interface Review {
  _id: string;
  productId: string;
  userId: string;
  user: {
    id: string;
    firstName: string;
    lastName?: string;
    profileImage?: string;
    email?: string;
  };
  createdAt: string;
  updatedAt?: string;
  comment: string;
  rating?: number;
}

// Summary of reviews for a product
export interface ReviewSummary {
  productId: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    // Count of reviews for each star rating
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

// Type for query parameters when fetching reviews
export interface ReviewFilters {
  page?: number;
  limit?: number;
  sortBy?: "newest" | "oldest" | "highest" | "lowest" | "most_helpful";
  rating?: Rating;
}
