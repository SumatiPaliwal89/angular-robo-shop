import { Component, signal, input, output, computed} from '@angular/core';
import { IProduct } from '../product.model';
import { CommonModule} from '@angular/common';
import { CategoryToPartTypePipe } from '../../category-to-part-type-pipe';
import { SliderComponent } from '../slider/slider.component';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'bot-product-details',
  imports: [CommonModule, CategoryToPartTypePipe, SliderComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product = input.required<IProduct, IProduct>({transform: this.normaliseDiscount});
  mode = input<'shop'|'cart'>('shop');
  addToCart = output<IProduct>();
  removeFromCart = output<IProduct>();
  favourite=signal(0);

  availableInventory = computed(() => this.inventoryService.get(this.product().id));
  inventoryMap = {
    '=0': 'Out of stock!',
    '=1': 'Only 1 item left',
    '=2': 'Only few items left',
    '=3': 'Only few items left',
    '=4': 'Only few items left',
    'other': 'Get yours today!'
  };

  constructor(private inventoryService: InventoryService) { }
  normaliseDiscount(product: IProduct) {
    if (product.discount < 1){
      return product;
    }
    return { ...product, discount: product.discount / 100 };
  }

  add(){
    this.addToCart.emit(this.product());
  }
  remove(){
    this.removeFromCart.emit(this.product());
  }
  getImageUrl(product: IProduct) {
    return '/images/robot-parts/' + product.imageName;
  }

  getPriceClasses() {
    return { strikethrough: this.product().discount > 0 }
  }
}
