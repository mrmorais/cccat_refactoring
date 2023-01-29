import { Coupon } from "./coupon.model";
import { Product } from "./product.model";

interface OrderItem {
  product: Product;
  quantity: number;
}

export class Order {
  private orderItems: OrderItem[] = [];
  private coupon?: Coupon;

  addProduct(product: Product, quantity: number = 1) {
    this.orderItems.push({
      product,
      quantity,
    });
  }

  calculateTotal(): number {
    const totalAmount = this.orderItems.reduce((totalAmount, { product, quantity }) => {
      return totalAmount + (product.price * quantity);
    }, 0);

    return this.coupon
      ? (totalAmount - (this.coupon.discountPercentage / 100) * totalAmount )
      : totalAmount;
  }

  applyCoupon(coupon: Coupon) {
    this.coupon = coupon;
  }
}
