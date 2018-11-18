import { Component } from '@angular/core';

import { RootObject } from "./../shared/models/book-root-object.model";
import { BookService } from '../shared/services/book-service.services';
import { Book } from '../shared/models/book.model';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user-service.services';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
    public localBookData: RootObject;
    public user: User;
    public setSelectedBook(book:Book): void {
        this.myBookService.selectedBook.selected = book;      
    }

    public shortTitle(title:string):string{
        if(title.length>13){
            return title.substring(0,13)+"...";
        }
        return title;
    }

    public searchBooks(str:string) {
        this.myBookService.initBooks(str);
    }

    public addToCart(bookId:string){
        this.myUserService.editUserCart(bookId,true);
    }

    public constructor(private myBookService: BookService,private myUserService: UserService) {

        this.user = this.myUserService.currentUser;

        this.localBookData = this.myBookService.bookInfo;

        for (let i = 0; i < this.localBookData.items.length; i++) {
            let temp: string = this.localBookData.items[i].volumeInfo.title;
            this.localBookData.items[i].volumeInfo.title = temp.substring(0, 16);
        }
    }

}
