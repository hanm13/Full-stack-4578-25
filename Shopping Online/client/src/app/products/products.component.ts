import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/services/products-service.service';
import { UserService } from '../shared/services/user-service.services';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  selectedProductsByCategory: any = {products: []};
  selectedProductForCart: any = {product: undefined};
  user: User;

  constructor( private myProductsService: ProductsService, private myUserService: UserService) {

    this.selectedProductsByCategory = myProductsService.selectedProductsByCategory;
    this.selectedProductForCart = myProductsService.selectedProductForCart;
    this.user = this.myUserService.currentUser;

  }

  updateSelectedProductForCart(product) {

    this.selectedProductForCart.product = product;

  }

  addItemToCartItems(product, amount) {

    this.selectedProductForCart.product = null;

    const shouldUpdate = {should: false, cartItemID: undefined};

    // we check if we already have the item inside our cart items and then if we have we need to update the cart item with the ammount.
    for (const key in this.user.cartItems) {
      if (this.user.cartItems.hasOwnProperty(key)) {
        const element = this.user.cartItems[key];
        if ( element.productID === product._id) {

          shouldUpdate.should = true;
          shouldUpdate.cartItemID = element._id;

        }

      }
    }

    if (shouldUpdate.should) {

      this.myUserService.updateCartItem(shouldUpdate.cartItemID, amount);

    } else {

      this.myUserService.addCartItem(product, amount);

    }


  }

  editProduct(product) {

    this.myProductsService.updateProductForEdit(product);

  }

  ngOnInit() {

  }

}
