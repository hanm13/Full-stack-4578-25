import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user-service.services';
import { User } from '../shared/models/user.model';
import { OrdersService } from '../shared/services/orders-service.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  user: User;
  currentCreatedOrder: any = { order: undefined };
  cartItemSearch: any = { cartItems: [] };

  constructor(private myUserService: UserService, private myOrderService: OrdersService) {

    this.user = myUserService.currentUser;
    this.currentCreatedOrder = this.myOrderService.currentCreatedOrder;
    this.cartItemSearch = this.myOrderService.cartItemSearch;

  }

  resetCurrentUserOrder() {
    this.currentCreatedOrder.order = undefined;
  }

  searchCartItems(searchVal) {

    this.cartItemSearch.cartItems = [];

    if ( searchVal !== '') {

      for (let index = 0; index < this.user.cartItems.length; index++) {

        const element = this.user.cartItems[index];

        if ( element.name.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1 ) {

          this.cartItemSearch.cartItems.push(element.name);

        }

      }

    }

    console.log('Found order cart item search match: ', this.cartItemSearch.cartItems);

  }

  ngOnInit() {

    this.user.state = 'order';

  }

}
