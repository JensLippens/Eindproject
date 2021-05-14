import { Product } from "../producten/product.model";

export interface OrderItem {
  product: Product,
  aantal: number
}
