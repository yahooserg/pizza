import { Injectable } from '@angular/core';
import { InventoryService } from './inventory.service';

interface CartItem {
  itemId: string,
  qty: number,
  price: number
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: CartItem[] = [];

  constructor(
    private inventoryService: InventoryService,
  ) { }

  public getCart () {
    return this.cart;
  }

  public addToCart (item) {
    if(this.cart.length) {
      let found = false;
      for(let i = 0; i < this.cart.length; i += 1) {
        if(this.cart[i].itemId === item.id) {
          this.cart[i].qty +=1;
          this.cart[i].price = item.price;
          found = true;
        }
      }
      if (!found) {
        this.cart[this.cart.length] = {itemId: (item.id), qty: 1, price: parseFloat(item.price)};
      }
    } else {
      this.cart[this.cart.length] = {itemId: (item.id), qty: 1, price: parseFloat(item.price)};
    }
    console.log(this.cart);
  }

  public getCartLength() {
    return this.cart.length;
  }

  public getCartQty() {
    let qty = 0;
    for(let i = 0; i < this.cart.length; i += 1) {
      qty += (this.cart[i].qty);
    }
    return qty;
  }

  public getCartShipping() {
    let flatRate = 5;
    let shippingCostOnePizza = 0.5;
    let qty = this.getCartQty();
    return qty ? qty * shippingCostOnePizza + flatRate : 0;
  }

  public getCartSum() {
    let sum = 0;
    for(let i = 0; i < this.cart.length; i += 1) {
      sum += ((this.cart[i].price)*(this.cart[i].qty));
    }
    return (sum>=30) ? sum : sum + this.getCartShipping();
  }


}
