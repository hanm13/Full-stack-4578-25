import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { UserService } from './user-service.services';
import { User } from '../models/user.model';

// מאפשר לשירות הנוכחי להשתמש בתוכו בשירותים אחרים
@Injectable()
export class OrdersService {

    ordersCounterAPI = 'http://localhost:6200/api/count/orders';
    ordersCounter: any = { count: 0};
    user: User;
    currentCreatedOrder: any = { order: undefined};

    constructor(private myUserService: UserService, private myHttpClient: HttpClient) {

        this.user = this.myUserService.currentUser;

    }

    initOrdersCounter() {

        this.myHttpClient.get(this.ordersCounterAPI)
        .subscribe((resp: any) => {

            this.ordersCounter.count = resp.counter;

        });

    }

    createNewOrder(newOrderInfo, userID, userToken) {

        this.myHttpClient.post(`http://localhost:6200/api/orders/${userID}`, newOrderInfo, {
            headers: {
                'xx-auth': `${userToken}` // authentication for request!
            }

        })
        .subscribe((resp: any) => {

            console.log(resp);

            this.user.cart = undefined;
            this.user.cartItems = undefined;
            this.currentCreatedOrder.order = newOrderInfo;
            console.log("bfore:", this.user.orders);
            this.user.orders = <Order[]>resp.orders;
            console.log("after:", this.user.orders);

        });

    }

}
