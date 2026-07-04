import { Injectable, signal } from '@angular/core';
import { IProduct } from './product.model';
import { InventoryService } from './inventory.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = signal<IProduct[]>([]);

  constructor(private inventoryService: InventoryService) { }

  addToCart(product: IProduct) {
    this.cart.update(cart => [...cart, product]);
    this.inventoryService.decrement(product.id);
  }

  removeFromCart(product: IProduct) {
    this.cart.update(cart => {
      const itemIndex = cart.findIndex(item => item.id === product.id);

      if (itemIndex === -1) {
        return cart;
      }

      return [...cart.slice(0, itemIndex), ...cart.slice(itemIndex + 1)];
    });
    this.inventoryService.increment(product.id);
  }
}
