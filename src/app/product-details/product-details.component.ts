import { Component, signal, input } from '@angular/core';
import { IProduct } from '../product.model';
import { CommonModule, I18nPluralPipe} from '@angular/common';
import { CartService } from '../cart.service';
import { CategoryToPartTypePipe } from '../../category-to-part-type-pipe';

@Component({
  selector: 'bot-product-details',
  imports: [CommonModule, CategoryToPartTypePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product = input<any>();
  availableInventory = signal(5);
  inventoryMap = {
    '=0': 'Out of stock!',
    '=1': 'Only 1 item left',
    '=2': 'Only few items left',
    '=3': 'Only few items left',
    '=4': 'Only few items left',
    'other': 'Get yours today!'
  };

  constructor(private cartService: CartService) { }

  getImageUrl(product: IProduct) {
    return '/images/robot-parts/' + product.imageName;
  }

  addToCart() {
    this.availableInventory.update((p) => p - 1);
    this.cartService.addToCart(this.product());
  }

  getPriceClasses() {
    return { strikethrough: this.product().discount > 0 }
  }
}
