import { Component, Signal, computed } from '@angular/core';
import { IProduct } from '../product.model';
import { CartService } from '../cart.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';

interface CartGroup {
  product: IProduct;
  quantity: number;
}

@Component({
  selector: 'bot-cart',
  imports: [ProductDetailsComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: Signal<IProduct[]>;
  groupedCartItems = computed<CartGroup[]>(() => {
    const grouped = new Map<number, CartGroup>();

    for (const product of this.cartItems()) {
      const existingGroup = grouped.get(product.id);

      if (existingGroup) {
        existingGroup.quantity += 1;
        continue;
      }

      grouped.set(product.id, { product, quantity: 1 });
    }

    return Array.from(grouped.values());
  });

  removeFromCart(product: IProduct) {
    this.cartService.removeFromCart(product);
  }

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.cart;
  }

}
