import { AuthData } from "../auth/auth-data.model";
import { OrderItem } from "../mandje/orderitem.model";

export interface Bestelling {
  _id: string,
  user: AuthData;
  orderItems: OrderItem[];
  totaalPrijs: number;
}
