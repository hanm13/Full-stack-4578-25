import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeadComponent } from './head/head.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { MembersListComponent } from './members-list/members-list.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './shared/services/user-service.services';
import { AccountComponent } from './account/account.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


const appRoutes: Routes = [

    { path: 'home', component: HomeComponent },
    { path: 'members', component: MembersListComponent },
    { path: 'account', component: AccountComponent },
    // default path - will redirect the current path to 'home'
    { path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },

  ];

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    FooterComponent,
    MainComponent,
    MembersListComponent,
    HomeComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
