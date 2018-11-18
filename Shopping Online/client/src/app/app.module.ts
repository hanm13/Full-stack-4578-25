import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeadComponent } from './head/head.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { BookListComponent } from './book-list/book-list.component';
import { SelectedBookComponent } from './selected-book/selected-book.component';
import { HomeComponent } from './home/home.component';
import { BookService } from './shared/services/book-service.services';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserService } from './shared/services/user-service.services';
import { AccountComponent } from './account/account.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';


const appRoutes: Routes = [
 
    { path: 'home', component: HomeComponent },
    { path: 'book', component: SelectedBookComponent },
    { path: 'books', component: BookListComponent },
    { path: 'account', component: AccountComponent },
    { path: 'cart', component: CartComponent },
    //default path - will redirect the current path to 'home'
    { path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
   // ** is an angular placeholder for any path that does not exist
   { path: '**', component: PageNotFoundComponent }
    
  ];

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    FooterComponent,
    MainComponent,
    BookListComponent,
    SelectedBookComponent,
    HomeComponent,
    PageNotFoundComponent,
    AccountComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BookService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
