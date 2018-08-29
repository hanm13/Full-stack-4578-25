import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleInfoComponent } from './article-info/article-info.component';
import { ArticlesService } from './shared/services/articles.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    ArticlesListComponent,
    ArticleInfoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ArticlesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
