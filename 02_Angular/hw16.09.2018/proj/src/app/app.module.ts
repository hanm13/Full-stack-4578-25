import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IdInputComponent } from './id-input/id-input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {PersonService} from "./shared/services/person.service";
import { PeopleTableComponent } from './people-table/people-table.component';

@NgModule({
  declarations: [
    AppComponent,
    IdInputComponent,
    PeopleTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
