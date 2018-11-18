import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/models/book.model';
import { BookService } from '../shared/services/book-service.services';

@Component({
  selector: 'app-selected-book',
  templateUrl: './selected-book.component.html',
  styleUrls: []
})
export class SelectedBookComponent implements OnInit {
  selectedBook:any;
  constructor(private myBookService:BookService) {
      this.selectedBook=this.myBookService.selectedBook;
   }

  ngOnInit() {
  }

}
