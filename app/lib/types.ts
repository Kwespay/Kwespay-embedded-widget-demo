export type Category = "clothing" | "gadgets";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: Category;
  tag?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
