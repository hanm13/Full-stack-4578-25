import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user-service.services';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OrdersService } from '../shared/services/orders-service.service';

@Component({
  selector: 'app-order-creation',
  templateUrl: './order-creation.component.html',
  styleUrls: ['./order-creation.component.css']
})
export class OrderCreationComponent implements OnInit {

  user: User;
  orderForm: FormGroup;
  orderAvailableCities: any = {cities: []};


  constructor(private myUserService: UserService, private myOrderService: OrdersService, private myHttpClient: HttpClient) {

    this.user = this.myUserService.currentUser;

    const orderFormConfig = {

      city: this.getFormControl(2, 15, 'City'),
      street: this.getFormControl(2, 15, 'Street'),
      shippingDate: new FormControl(''),
      visaDigits: this.getFormControl(4, 4, 'Visa Digits'),

    };

    this.orderForm = new FormGroup(orderFormConfig);
  }

  initOrderCities() {

    this.myHttpClient.get('http://localhost:6200/api/cities')
    .subscribe((resp) => {
        this.orderAvailableCities.cities = resp;
    }, (err) => {

        console.log(err);

    });

  }

  createNewOrder() {


        // {\"city\":\"batYam\",\"street\":\"Balfur\",\"shippingDate\":\"21/11/2018\",\"visaDigits\":\"4567\"}

        const newOrderInfo = {

          city: this.orderForm.value.city,
          street: this.orderForm.value.street,
          shippingDate: this.orderForm.value.shippingDate,
          visaDigits: this.orderForm.value.visaDigits,

        };

      this.myOrderService.createNewOrder( newOrderInfo , this.user._id , this.user.token);

  }

  getFormControl(min, max, label) {
    return new FormControl('', [
      f => (!f.value ?  { err: `` } : null),
      f => (!f.value && !f.pristine ? { err: `${label} is required` } : null),
      f => f.value && f.value.length > max ? { err: `${label} is max ${max} chars` } : null,
      f => f.value && f.value.length < min ? { err: `${label} is min ${min} chars` } : null
    ]);
}

  ngOnInit() {

    this.initOrderCities();

  }

}
