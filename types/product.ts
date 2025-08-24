export interface Product {
  id?: number;
  name: string;
  description: string;
  price: string;
  title?: string;
  images?: string[];
  color?: string[];
  isHighlighted?: boolean;
  sizes?: string[];
  image: string | string[];
  category: string;
}

export interface Category {
  id?: number;
  name: string;
}
export interface ProductsResponse {
  products: Product[];
}
