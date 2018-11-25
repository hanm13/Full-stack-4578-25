import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ProductsService } from '../shared/services/products-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Category } from '../shared/models/category.model';
import { Product } from '../shared/models/product.model';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit, AfterContentChecked {

  productForEdit: any = { product: undefined };
  editAddForm: FormGroup;
  editAddFormErrors: any = { errors: []};
  categories: any = {categories: []};
  addMode = false;


  constructor(private myProductsService: ProductsService) {

    this.productForEdit = myProductsService.productForEdit;
    this.categories = myProductsService.categoriesList;

    const editAddFormConfig = {

      name: this.getFormControl(2, 15, 'Name'),
      price: this.getFormControl(1, 999999, 'Price'),
      imageAddress: this.getFormControl(18, 999999, 'Image Address(/assets/images/name.png)'),
      category: this.getFormControl(1, 99, 'Category'),

    };

    this.editAddForm = new FormGroup(editAddFormConfig);

   }

  ngOnInit() {

    this.myProductsService.initCategoriesList();

  }

  getFormControl(min, max, label, defaultVal= '') {
    return new FormControl(defaultVal, [
      f => (!f.value ?  { err: `` } : null),
      f => (!f.value && !f.pristine ? { err: `${label} is required` } : null),
      f => f.value && f.value.length > max ? { err: `${label} is max ${max} chars` } : null,
      f => f.value && f.value.length < min ? { err: `${label} is min ${min} chars` } : null
    ]);
  }

  // Respond after Angular checks the content projected into the component.
  // Called after the ngAfterContentInit() and every subsequent ngDoCheck().
  // A component-only hook.
  ngAfterContentChecked(): void {

    // tslint:disable-next-line:max-line-length
    if ( this.productForEdit.product && this.editAddForm.controls.category && this.editAddForm.controls.category.value !== this.productForEdit.product.categoryId) {

      this.editAddForm.controls.category.setValue(this.productForEdit.product.categoryId || '');
      this.editAddForm.controls.name.setValue(this.productForEdit.product.name || '');
      this.editAddForm.controls.price.setValue(this.productForEdit.product.price || 0);
      this.editAddForm.controls.imageAddress.setValue(this.productForEdit.product.imageAddress || '');
      this.addMode = false;

    }

  }

  editAddProduct() {

    this.editAddFormErrors.errors = [];

    const formProduct = {

      categoryId: this.editAddForm.controls.category.value,
      name: this.editAddForm.controls.name.value,
      price: this.editAddForm.controls.price.value,
      imageAddress: this.editAddForm.controls.imageAddress.value,

    };

    if (this.productForEdit.product) {

      this.myProductsService.editProduct(formProduct);

    } else {

      this.myProductsService.addProduct(formProduct);

    }

    this.editAddFormErrors.errors.push('Saved! - ' + new Date().toUTCString());

  }

  updateAddMode() {

    this.addMode = !this.addMode;
    if (this.addMode === true && this.productForEdit.product) {

      this.productForEdit.product = undefined;
      this.editAddForm.reset();
    }

}


}
