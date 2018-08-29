import { Component, OnInit } from '@angular/core';
import { ArticlesService } from "../shared/services/articles.service";

@Component({
  selector: 'app-article-info',
  templateUrl: './article-info.component.html',
  styleUrls: ['./article-info.component.css']
})
export class ArticleInfoComponent implements OnInit {

  chosenArticleArr:any;
  articlesInfoArr:any;

  constructor(private articlesService: ArticlesService) {

    this.chosenArticleArr = articlesService.chosenArticle;
    this.articlesInfoArr = articlesService.articlesArr;

   }

   getChosenArticleInfo():any {

     return this.articlesInfoArr[this.chosenArticleArr.chosen];

   }

  ngOnInit() {
  }

}
