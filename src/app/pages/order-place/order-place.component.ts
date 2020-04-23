import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../services/user.service';
import { CartService } from './../../../services/cart.service';

@Component({
  selector: 'app-order-place',
  templateUrl: './order-place.component.html',
  styleUrls: ['./order-place.component.css']
})
export class OrderPlaceComponent implements OnInit {

  constructor(
    private userService: UserService,
    private cartService: CartService
  ) { }

  user = {
    address: "",
    phone: ""
  };


  ngOnInit(): void {
    this.getUser();
  }

  getCartLength () {
    return this.cartService.getCartLength();
  }

  getUser() {
    this.user = this.userService.getUser();
  }

  public testNumber () {
    let pattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
    return pattern.test(this.user.phone);
  }

}
