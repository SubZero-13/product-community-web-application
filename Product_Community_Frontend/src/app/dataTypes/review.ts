import { Product } from "./product";
import { User } from "./user";

export interface Review {
  reviewId?: number;
  description: string;
  rating: number;
  product: Product;
  user: User;
  status: string;
}


