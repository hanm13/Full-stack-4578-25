import { Component, OnInit } from '@angular/core';
import { ArticlesService } from "../shared/services/articles.service";

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  articlesList;

  constructor(private articlesService: ArticlesService) {

    this.articlesList = articlesService.articlesArr;

   }

   updateChosenArticle(index){

     this.articlesService.chosenArticle.chosen = index;

   }

  ngOnInit() {
  }

}
