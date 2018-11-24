import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user-service.services';
import { User } from '../shared/models/user.model';
import { OrdersService } from '../shared/services/orders-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  user: User;
  currentCreatedOrder: any = { order: undefined };

  constructor(private myUserService: UserService, private myOrderService: OrdersService) {

    this.user = myUserService.currentUser;
    this.currentCreatedOrder = this.myOrderService.currentCreatedOrder;

  }

  resetCurrentUserOrder() {
    this.currentCreatedOrder.order = undefined;
  }

  ngOnInit() {

    this.user.state = 'order';

  }

}
