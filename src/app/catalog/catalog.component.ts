import { Component } from '@angular/core';
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { IProduct } from '../product.model';
import allProducts from '../products.json';
import { CartService } from '../cart.service';

@Component({
  selector: 'bot-catalog',
  imports: [ProductDetailsComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  products: IProduct[] = allProducts;

  constructor(private cartService: CartService) { }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }
}
