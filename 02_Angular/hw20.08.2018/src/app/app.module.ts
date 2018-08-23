import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MultiplicationTableComponent } from './multiplication-table/multiplication-table.component';
import { PeopleInfoComponent } from './people-info/people-info.component';

@NgModule({
  declarations: [
    AppComponent,
    MultiplicationTableComponent,
    PeopleInfoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
